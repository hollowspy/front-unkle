import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../providers/request.service";
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Roles {
  value: string;
  viewValue:string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public registerForm:FormGroup
  
  public roles: Roles[] = [
    {value: 'admin', viewValue: 'Administrateur'},
    {value: 'customer', viewValue: 'Client'},
  ];
  // public roleSelected:string | null = null;
  public roleSelected:any;
  
  constructor(private formBuilder: FormBuilder,
              private requestService: RequestService,
              private router:Router,
              private snackBar: MatSnackBar) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  
  public onSelect(role:string) {
    this.roleSelected = role;
  }
  
  public register() {
    const val = this.registerForm.value;
    console.log('val', val);
    console.log('roleSelected', this.roleSelected);
    this.requestService.register({
      email: val.email,
      password: val.password,
      role: this.roleSelected
    }).subscribe((data:any) => {
      console.log('daa', data);
      if (data.success) {
        this.snackBar.open('Nouvel utilisateur ajouté', '', {
          duration: 2000
        })
        this.router.navigate(['home'])
      } else {
        this.snackBar.open(`Erreur lors de l'ajout d'un nouvel utilisateur`, '', {
          duration: 2000
        })
      }
    })
    // console.log('new User', newUser);
  }
  
  
}
