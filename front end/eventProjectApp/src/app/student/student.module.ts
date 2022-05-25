import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { RegisteredEventsComponent } from './registered-events/registered-events.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { OtherspeakersPipe } from './otherspeakers.pipe'

@NgModule({
  declarations: [
    WelcomeComponent,
    StudentProfileComponent,
    RegisteredEventsComponent,
    OtherspeakersPipe
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RouterModule,
    FormsModule,
    PasswordModule
  ],
  exports:[
    WelcomeComponent,
    StudentProfileComponent,
    RegisteredEventsComponent,
    OtherspeakersPipe
  ]
})
export class StudentModule { }
