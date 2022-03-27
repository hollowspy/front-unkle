import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  
  public userConnected:User | null = null;

  constructor() { }
  
  public onSetUser(user:User) {
    this.userConnected = user;
  }
}
