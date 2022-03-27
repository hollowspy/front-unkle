import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestService} from "../../providers/request.service";
import {Router} from "@angular/router";
import {GlobalDataService} from "../../providers/global-data.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
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
    
    ngOnInit(): void {
    }
    
    
    public login() {
        const val = this.loginForm.value;
        console.log('val', val);
        this.requestService.login(val).subscribe((data: any) => {
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token)
                this.globalDataService.onSetUser(data.user);
                this.router.navigate(['home'])
            }
            console.log('data', data);
            
        })
    }
    
}
