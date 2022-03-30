import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../../../models/user";
import {RequestService} from "../../../providers/request.service";
import {ContractUser} from "../../../models/contract_user";
import {Contract} from "../../../models/contract";
import {ContractOption} from "../../../models/contract_options";
import {Option} from "../../../models/option";
import {GlobalDataService} from "../../../providers/global-data.service";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from "rxjs";

export interface fullContractOption extends ContractOption {
  _option: Option
}

export interface fullContractUsers extends ContractUser {
  _contract: Contract
  _contract_options: fullContractOption[]
}

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  @Input('user') public user: User | undefined;
  @ViewChild('dateResiliation') public dateResiliation: TemplateRef<any> | undefined;
  public contractUsers:fullContractUsers[] = [];
  public isLoaded:boolean = false;


  constructor(private requestService:RequestService,
              public globalDataService:GlobalDataService,
              public dialog: MatDialog,) { }

  ngOnInit(): void {
    console.log('users', this.user);
    this.fetchContractUser();
    
  }
  
  private fetchContractUser():void {
    if (this.user) {
      this.requestService.listContractUsers(this.user.id, true).subscribe((contracts:any) => {
        this.contractUsers = contracts.contract_users;
        this.isLoaded = true
        console.log('contractUsers', this.contractUsers);
      })
    }
  }
  
  
  public onCloseConfirmDelete(event:boolean, displayDelete:any):void {
    displayDelete.appValueVar = false;
    if (event) {
      this.fetchContractUser()
    }
  }
  
  public getStatus(status:string | undefined):string {
    let result = '';
    switch (status) {
      case 'pending':
        result = 'En attente';
        break;
      case 'active':
        result = 'En cours';
        break;
      case 'finished':
        result = 'Terminé';
        break;
    }
    return result;
  }

}
