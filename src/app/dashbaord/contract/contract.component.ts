import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user";
import {RequestService} from "../../../providers/request.service";
import {Contract} from "../../../models/contract";
import {Option} from "../../../models/option";
import { forkJoin } from 'rxjs';
import {FormControl} from "@angular/forms";
import * as moment from 'moment';
import {ContractUser} from "../../../models/contract_user";
import {GlobalDataService} from "../../../providers/global-data.service";

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
    
    @Input('user') public user: User | undefined;
    @Output('onClose') public onClose:EventEmitter<boolean> = new EventEmitter<boolean>()
    public isLoaded:boolean =false;
    // public contracts: Contract[] | null = null;
    // public options:Option[] = [];
    public contractSelected:Contract | null = null;
    public optionsSelected:Option[]  = [];
    public optionsForm = new FormControl();
    public dateStart:any;
    public dateEnd:any;
    
    constructor(private requestService: RequestService,
                public globalDataService:GlobalDataService) {
    }
    
    
    ngOnInit():void {
        console.log('global contract', this.globalDataService.contracts);
        console.log('global options', this.globalDataService.options)
    }
    
    public onSelectContract(e:any) {
        if (this.globalDataService.contracts) {
            const contractSelected = this.globalDataService.contracts.find(c => c.value === e)
            if (contractSelected) {
                this.contractSelected = contractSelected
            }
        }
    }
    
    public onSelectOptions(e:any) {
        this.optionsSelected = e;
    }
    
    
    public onValidContract() {
        if (this.contractSelected && this.user && this.optionsSelected) {
            const status = this.detectStatus();
            const contractUser:any = {
                id_contract: this.contractSelected.id,
                id_user: this.user.id,
                status,
                date_start: this.dateStart,
                date_end: this.dateEnd
            };
            console.log('contractUser', contractUser);
            this.requestService.createContractUser(contractUser).subscribe((contract:any) => {
                console.log('data', contract);
                console.log('this optionsSelected', this.optionsSelected);
                const subscribes = this.optionsSelected.map((o) => {
                    const contractOption = {
                        id_contract: contract.id,
                        id_option: o.id
                    };
                    return this.requestService.createContractOption(contractOption);
                })
                forkJoin(subscribes).subscribe(
                    (options:any) => {
                        this.onClose.emit(true)
                    }
                );
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
