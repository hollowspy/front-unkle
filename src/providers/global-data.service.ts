import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Contract} from "../models/contract";
import {Option} from "../models/option";

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  
  public userConnected:User | null = null;
  public contracts: Contract[] | null = null;
  public options:Option[] = [];

  constructor() { }
  
  public onSetUser(user:User) {
    this.userConnected = user;
  }
}
