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

  constructor(private requestService: RequestService,
              public globalDataService:GlobalDataService,
              private router:Router) { }

  ngOnInit(): void {
    const fetchContracts = this.requestService.listContracts();
    const fetchOptions = this.requestService.listOptions();
    forkJoin([fetchContracts, fetchOptions]).subscribe(([resContract, resOptions]:any) => {
      this.globalDataService.contracts = resContract.contracts;
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
