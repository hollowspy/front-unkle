import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from "../../providers/global-data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public globalDataService:GlobalDataService) { }

  ngOnInit(): void {
  }

}
