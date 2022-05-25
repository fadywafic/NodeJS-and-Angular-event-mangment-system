import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerRoutingModule } from './speaker-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SpeakerProfileComponent } from './speaker-profile/speaker-profile.component';
import { RegisteredEventsComponent } from './registered-events/registered-events.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { OtherspeakersPipe } from './otherspeakers.pipe';


@NgModule({
  declarations: [
    WelcomeComponent,
    SpeakerProfileComponent,
    RegisteredEventsComponent,
    OtherspeakersPipe
  ],
  imports: [
    CommonModule,
    SpeakerRoutingModule,
    RouterModule,
    FormsModule,
    PasswordModule
  ],
  exports:[
    WelcomeComponent,
    SpeakerProfileComponent,
    RegisteredEventsComponent,
    OtherspeakersPipe
  ]
})
export class SpeakerModule { }
