import {Component, EventEmitter, Input,  Output, TemplateRef, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {MatDialog} from "@angular/material/dialog";
import {RequestService} from "../../../providers/request.service";
import {fullContractUsers} from "../contracts/contracts.component";
import {ContractUser} from "../../../models/contract_user";

@Component({
  selector: 'app-confirm-delete-contract',
  templateUrl: './confirm-delete-contract.component.html',
  styleUrls: ['./confirm-delete-contract.component.scss']
})
export class ConfirmDeleteContractComponent  {
  @Input() public contract: fullContractUsers | undefined
  @Output() public closeDelete:EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('invalidDate') public invalidDate: TemplateRef<any> | undefined;
  public dateResiliation:Date = new Date();
  
  constructor(public dialog:MatDialog,
              private requestService:RequestService) { }

    
  public cancelDelete():void {
    this.closeDelete.emit(false)
  }
  
  public confirmDelete():any {
    const dateResiliation = moment(new Date(this.dateResiliation), "YYYY MM DD");
    const today = moment(new Date(), "YYYY MM DD")
    
    if (moment(dateResiliation).isBefore(today)) {
      if (this.invalidDate) {
         return this.dialog.open(this.invalidDate, {
          width: '400px'
        });
      }
    }
    const updatedContract = {
      ...this.contract,
      date_resiliation: this.dateResiliation
    }
    delete updatedContract._contract;
    delete updatedContract._contract_options
    this.requestService.updateContractUser(updatedContract)
        .subscribe((contractUser:ContractUser) => {
          if (contractUser) {
            this.closeDelete.emit(true)
          }
        })
  }

}
