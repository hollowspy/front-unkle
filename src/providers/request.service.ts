import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from '../models/user'


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public apiUrl:string = 'http://localhost:3000';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  
  public register(user:User) {
    const url = `${this.apiUrl}/users`;
    return this.httpClient.post(url, user);
  }
  
  
  public login(user:User) {
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post(url, user);
  }
  
  
  public listUsers() {
    const url = `${this.apiUrl}/users`;
    return this.httpClient.get(url);
  }
  
  public getUser(id:any) {
    const url = `${this.apiUrl}/users/${id}`;
    return this.httpClient.get(url);
  }
  
  public deleteUser(id:any) {
    const url = `${this.apiUrl}/users/${id}`;
    return this.httpClient.delete(url);
  }
}
