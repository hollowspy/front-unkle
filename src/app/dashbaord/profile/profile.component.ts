import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {RequestService} from '../../../providers/request.service'
import {User} from "../../../models/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GlobalDataService} from "../../../providers/global-data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public user:User | null = null;

  constructor(private route: ActivatedRoute,
              private requestService: RequestService,
              public globalDataService:GlobalDataService,
              private router:Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('id');
    this.requestService.getUser(idUser).subscribe((data:any) => {
      if (data) {
        this.user = data;
        console.log('user', this.user);
      }
    })
  }
  
  
  public deleteUser() {
    if (this.user) {
      this.requestService.deleteUser(this.user.id).subscribe((data:any) => {
        if (data.success) {
          this.snackBar.open('Utilisateur supprimé', '', {
            duration: 2000
          })
          this.router.navigate(['home'])
        }
      })
      
    }
  }

}
