import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../providers/request.service";
import {GlobalDataService} from "../../../providers/global-data.service";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {Contract} from "../../../models/contract";
import {Option} from "../../../models/option";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public isLoaded:boolean =false;
  private tooltipsContracts:any = [
    {
      value: 'light',
      description: `<div>Votre abonnement <bold>1er prix</bold></div><div>Une assurance de base pour les petits budget</div><div>Idéal pour les jeunes locataire ou petits propriétaire</div>`
    },
    {
      value: 'premium',
      description: `<div>Assurance standart</div><ul><li>Locataire : nous nous portons garants pour vous. </li><li>Propriétaire : Soyez rassurez pour les loyers impayés</li></ul>`
    },
    {
      value: 'full',
      description: `<div>Le contrat pour vous les gros propriétaire.</div><div>Vous serez protégés contre tous les dommages. Ce contrat est fait pour vous</div> `
    }
  ]

  constructor(private requestService: RequestService,
              public globalDataService:GlobalDataService,
              private router:Router) { }

  ngOnInit(): void {
    const fetchContracts = this.requestService.listContracts();
    const fetchOptions = this.requestService.listOptions();
    forkJoin([fetchContracts, fetchOptions]).subscribe(([resContract, resOptions]:any) => {
      this.globalDataService.contracts = resContract.contracts.map((c:any) => {
        const tooltip = this.tooltipsContracts.find((t:any) => t.value === c.value);
        return {
          ...c,
          descriptionTooltip: tooltip.description
        }
      })
      this.globalDataService.options = resOptions.options
      this.isLoaded = true;
    });
  }
  
  public test() {
    this.requestService.listUsers().subscribe((data) => {
      console.log('data', data);
    })
  }
  
  
  public viewProfile() {
    console.log('globalData', this.globalDataService.userConnected);
    if (this.globalDataService.userConnected) {
      this.router.navigate(['/profile', `${this.globalDataService.userConnected.id}`])
    }
  }

}
