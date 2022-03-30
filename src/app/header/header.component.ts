import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from "../../providers/global-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public globalDataService:GlobalDataService,
              private router:Router) { }

  ngOnInit(): void {
  }
  
  public onLogOut():void {
    localStorage.clear();
    this.globalDataService.userConnected = null;
    this.router.navigate(['/']);
  }
}
