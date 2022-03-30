import {
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {User} from "../../../models/user";
import {RequestService} from "../../../providers/request.service";
import {Contract} from "../../../models/contract";
import {Option} from "../../../models/option";
import { forkJoin } from 'rxjs';
import {FormControl} from "@angular/forms";
import * as moment from 'moment';
import {ContractUser} from "../../../models/contract_user";
import {GlobalDataService} from "../../../providers/global-data.service";
import {MatDialog} from '@angular/material/dialog';
import {ContractOption} from "../../../models/contract_options";

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss']
})
export class ContractComponent {
    
    @Input() public user: User | undefined;
    @Output() public closeContract:EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('invalidDate') public invalidDate: TemplateRef<any> | undefined;
    public isLoaded:boolean =false;
    public contracts: Contract[] | null = null;
    public contractSelected:Contract | null = null;
    public optionsSelected:Option[]  = [];
    public optionsForm = new FormControl();
    public dateStart:Date | null = null;
    public dateEnd:Date | null = null;
    
    constructor(private requestService: RequestService,
                public dialog: MatDialog,
                public globalDataService:GlobalDataService) {
    }
    
    

    public onSelectContract(value:string):void {
        if (this.globalDataService.contracts) {
            const contractSelected = this.globalDataService.contracts.find(c => c.value === value)
            if (contractSelected) {
                this.contractSelected = contractSelected
            }
        }
    }
    
    public onSelectOptions(e:Option[]):void {
        this.optionsSelected = e;
    }
    
    
    
    public onValidContract():any {
        if (this.contractSelected
            && this.user
            && this.optionsSelected
            && this.dateStart
            && this.dateEnd) {
            
            const startDate = moment(new Date(this.dateStart));
            const endDate = moment(new Date(this.dateEnd));
            if (moment(endDate).isBefore(startDate)) {
                if (this.invalidDate) {
                    return this.dialog.open(this.invalidDate, {
                        width: '400px'
                    });
                    
                }
            }
            
            
            const status = this.detectStatus();
            const contractUser:ContractUser = {
                id_contract: this.contractSelected.id,
                id_user: this.user.id,
                status,
                date_start: this.dateStart,
                date_end: this.dateEnd
            };
            
            this.requestService.createContractUser(contractUser).subscribe((contract:ContractUser) => {
                if (contract) {
                    if (this.optionsSelected.length > 0) {
                        const subscribes = this.optionsSelected.map((o) => {
                            const contractOption:ContractOption = {
                                id_contract: contract.id,
                                id_option: o.id
                            };
                            return this.requestService.createContractOption(contractOption);
                        })
                        forkJoin(subscribes).subscribe(
                            (options) => {
                                this.closeContract.emit(true)
                            }
                        );
                    } else {
                        this.closeContract.emit(true)
                    }
                }
            })
        }
        
    }
    
    private detectStatus():string {
        const today = moment(new Date());
        const dateStart = moment(this.dateStart);
        if (dateStart.isAfter(today)) {
            return 'pending'
        }
        const dateEnd = moment(this.dateEnd);
        if (dateEnd.isBefore(today)) {
            return 'finished'
        }
        return 'active';
    }
    
    
    
}
