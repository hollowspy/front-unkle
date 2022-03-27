import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../providers/request.service";
import {GlobalDataService} from "../../../providers/global-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private requestService: RequestService,
              public globalDataService:GlobalDataService,
              private router:Router) { }

  ngOnInit(): void {
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
