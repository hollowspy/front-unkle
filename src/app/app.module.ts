import { NgModule,  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule,} from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";


// Components
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './dashbaord/home/home.component';
import { ProfileComponent } from './dashbaord/profile/profile.component'
import { UsersComponent } from './dashbaord/users/users.component';
import { ContractComponent } from './dashbaord/contract/contract.component';
import { ContractsComponent } from './dashbaord/contracts/contracts.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { ValueVarDirective } from './Directives/value-var.directive';


// JWT
import { JwtModule } from "@auth0/angular-jwt";






export function tokenGetter() {
  return localStorage.getItem("access_token");
}



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UsersComponent,
    ContractComponent,
    ContractsComponent,
    CustomTooltipComponent,
    ValueVarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/login'],
      },
    }),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
