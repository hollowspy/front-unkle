import {Component, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login, RequestService} from "../../providers/request.service";
import {Router} from "@angular/router";
import {GlobalDataService} from "../../providers/global-data.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
    
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }
    
    public loginForm: FormGroup
    
    constructor(private formBuilder: FormBuilder,
                private requestService: RequestService,
                private router: Router,
                private globalDataService:GlobalDataService) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }
    

    public login():void {
        const val = this.loginForm.value;
        this.requestService.login(val).subscribe((data: Login) => {
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token)
                this.globalDataService.onSetUser(data.user);
                this.router.navigate(['home'])
            }
        })
    }
    
}
