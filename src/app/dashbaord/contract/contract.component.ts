import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList, TemplateRef,
    ViewChild,
    ViewChildren
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
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
    
    @Input('user') public user: User | undefined;
    @Output('onClose') public onClose:EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('invalidDate') public invalidDate: TemplateRef<any> | undefined;
    public isLoaded:boolean =false;
    public contracts: Contract[] | null = null;
    // public options:Option[] = [];
    public contractSelected:Contract | null = null;
    public optionsSelected:Option[]  = [];
    public optionsForm = new FormControl();
    public dateStart:any;
    public dateEnd:any;
    
    constructor(private requestService: RequestService,
                public dialog: MatDialog,
                public globalDataService:GlobalDataService) {
    }
    
    
    ngOnInit():void {
        // console.log('global contract', this.globalDataService.contracts);
        // console.log('global options', this.globalDataService.options)
        // console.log('template', this.template);
        
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
    
    public onValidContract():any {
        if (this.contractSelected && this.user && this.optionsSelected) {
            
            const startDate = moment(new Date(this.dateStart));
            const endDate = moment(new Date(this.dateEnd));
            if (moment(endDate).isBefore(startDate)) {
                console.log('date find avant date de début');
                if (this.invalidDate) {
                    return this.dialog.open(this.invalidDate, {
                        width: '400px'
                    });
                    
                }
            }
            
            
            const status = this.detectStatus();
            const contractUser:any = {
                id_contract: this.contractSelected.id,
                id_user: this.user.id,
                status,
                date_start: this.dateStart,
                date_end: this.dateEnd
            };
            console.log('contractUser', contractUser);
            return this.requestService.createContractUser(contractUser).subscribe((contract:any) => {
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
