import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../providers/request.service";
import {User} from "../../../models/user";
import {Router} from "@angular/router";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  public users:User[] = [];

  constructor(private requestService:RequestService,
              private router:Router) { }

  ngOnInit(): void {
    this.requestService.listUsers().subscribe((data:any) => {
      this.users = data.users
      console.log('users', this.users);
    })
  }
  
  public viewProfile(user:User):void {
    this.router.navigate(['profile', user.id])
  }
  
  public addUser():void {
    this.router.navigate(['register'])
  }

}
