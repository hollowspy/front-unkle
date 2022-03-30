import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from '../models/user'
import {ContractUser} from "../models/contract_user";
import {Contract} from "../models/contract";
import {Observable} from "rxjs";
import {ContractOption} from "../models/contract_options";

export interface Success {
  success:boolean
};

export interface Login {
  access_token:string;
  user: User
}


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
  
  
  public register(user:User):Observable<Success> {
    const url = `${this.apiUrl}/users`;
    return this.httpClient.post<Success>(url, user);
  }
  
  
  public login(user:User):Observable<Login> {
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post<Login>(url, user);
  }
  
  
  // About users
  public listUsers():Observable<User[]> {
    const url = `${this.apiUrl}/users`;
    return this.httpClient.get<User[]>(url);
  }
  
  public getUser(id:string):Observable<User> {
    const url = `${this.apiUrl}/users/${id}`;
    return this.httpClient.get<User>(url);
  }
  
  public deleteUser(id:number) :Observable<Success> {
    const url = `${this.apiUrl}/users/${id}`;
    return this.httpClient.delete<Success>(url);
  }
  
  // About contracts
  public listContracts():Observable<Contract[]> {
    const url = `${this.apiUrl}/contracts`;
    return this.httpClient.get<Contract[]>(url);
  }
  
  
  // About options
  public listOptions():Observable<ContractOption[]> {
    const url = `${this.apiUrl}/options`;
    return this.httpClient.get<ContractOption[]>(url);
  }
  
  
  // About Contract Users
  public createContractUser(contractUser:ContractUser):Observable<ContractUser> {
    const url = `${this.apiUrl}/contract_users`;
    return this.httpClient.post<ContractUser>(url, contractUser);
  }
  
  public listContractUsers(idUser?:number | null, full:boolean = false):Observable<ContractUser[]> {
    const url = `${this.apiUrl}/contract_users`;
    let params = new HttpParams();
    if (idUser) {
      params = params.append('id_user', idUser.toString())
    }
    if (full) {
      params = params.append('full', 'true')
    }
    return this.httpClient.get<ContractUser[]>(url, { params: params });
  }
  
  public updateContractUser(contract:ContractUser):Observable<ContractUser> {
    const url = `${this.apiUrl}/contract_users/${contract.id}`;
    return this.httpClient.put<ContractUser>(url, contract);
  }
  
  // About Contract Options
  public createContractOption(contractOption:ContractOption):Observable<ContractOption> {
    const url = `${this.apiUrl}/contract_options`;
    return this.httpClient.post<ContractOption>(url, contractOption);
  }
  
  
  
}
