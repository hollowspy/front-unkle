import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {RequestService} from "../../../providers/request.service";
import {ContractUser} from "../../../models/contract_user";
import {Contract} from "../../../models/contract";
import {ContractOption} from "../../../models/contract_options";
import {Option} from "../../../models/option";
import {GlobalDataService} from "../../../providers/global-data.service";

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
  public contractUsers:fullContractUsers[] = [];
  public isLoaded:boolean = false;

  constructor(private requestService:RequestService,
              public globalDataService:GlobalDataService) { }

  ngOnInit(): void {
    console.log('users', this.user);
    this.fetchContractUser();
    
  }
  
  private fetchContractUser() {
    if (this.user) {
      this.requestService.listContractUsers(this.user.id, true).subscribe((contract:any) => {
        this.contractUsers = contract.contract_users;
        this.isLoaded = true
        console.log('contractUsers', this.contractUsers);
      })
    }
  }
  
  public cancelContract(contract:any) {
    this.requestService.updateContractUser(contract.id)
        .subscribe((res:any) => {
          if (res && res.success) {
            this.fetchContractUser()
          }
        })
    console.log('contract', contract);
    
    
  }

}
