import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {RequestService, Success} from '../../../providers/request.service'
import {User} from "../../../models/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GlobalDataService} from "../../../providers/global-data.service";
import {Observer} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public user:User | null = null;
  public displayContracts:boolean = false;

  constructor(private route: ActivatedRoute,
              private requestService: RequestService,
              public globalDataService:GlobalDataService,
              private router:Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('id');
    if (idUser) {
      this.requestService.getUser(idUser).subscribe((user:User) => {
        if (user) {
          this.user = user;
        }
      })
    }
  }
  
  
  public deleteUser():void {
    if (this.user && this.user.id) {
      this.requestService.deleteUser(this.user.id).subscribe((data:Success) => {
        if (data.success) {
          this.snackBar.open('Utilisateur supprimé', '', {
            duration: 2000
          })
          this.router.navigate(['home'])
        }
      })
      
    }
  }
  
  public onUpdateContract(e:boolean):void {
    if (e) {
      this.displayContracts = false;
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }
  

}
