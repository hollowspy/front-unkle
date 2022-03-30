import { Component } from '@angular/core';
import {GlobalDataService} from "../../providers/global-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public globalDataService:GlobalDataService,
              private router:Router) { }
              
  
  public onLogOut():void {
    localStorage.clear();
    this.globalDataService.userConnected = null;
    this.router.navigate(['/']);
  }
}
