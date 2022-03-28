import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from '../models/user'
import {ContractUser} from "../models/contract_user";


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
  
  
  // About users
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
  
  // About contracts
  public listContracts() {
    const url = `${this.apiUrl}/contracts`;
    return this.httpClient.get(url);
  }
  
  
  // About options
  public listOptions() {
    const url = `${this.apiUrl}/options`;
    return this.httpClient.get(url);
  }
  
  
  // About Contract Users
  public createContractUser(contractUser:any) {
    const url = `${this.apiUrl}/contract_users`;
    return this.httpClient.post(url, contractUser);
  }
  
  public listContractUsers(idUser?:number | null, full:boolean = false) {
    const url = `${this.apiUrl}/contract_users`;
    let params = new HttpParams();
    if (idUser) {
      params = params.append('id_user', idUser.toString())
    }
    if (full) {
      params = params.append('full', 'true')
    }
    return this.httpClient.get(url, { params: params });
  }
  
  public updateContractUser(contratId:number) {
    const url = `${this.apiUrl}/contract_users/${contratId}`;
    return this.httpClient.put(url, null);
  }
  
  // About Contract Options
  public createContractOption(contractOption:any) {
    const url = `${this.apiUrl}/contract_options`;
    return this.httpClient.post(url, contractOption);
  }
  
  
  
}
