import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { StudentSignUpComponent } from './student-sign-up/student-sign-up.component';
import { SpeakerSignUpComponent } from './speaker-sign-up/speaker-sign-up.component';
import {PasswordModule} from 'primeng/password';
import { FormsModule } from '@angular/forms';
import {DividerModule} from 'primeng/divider';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    StudentSignUpComponent,
    SpeakerSignUpComponent
  ],
  imports: [
    CommonModule,
    PasswordModule,
    FormsModule,
    DividerModule,
    RouterModule,
  ],
  exports:[
    LoginComponent,
    StudentSignUpComponent,
    SpeakerSignUpComponent,
  ]
})
export class AuthenticationModule { }
