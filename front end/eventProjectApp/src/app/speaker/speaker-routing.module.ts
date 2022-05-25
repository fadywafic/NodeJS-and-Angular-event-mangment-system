import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteredEventsComponent } from './registered-events/registered-events.component';
import { SpeakerProfileComponent } from './speaker-profile/speaker-profile.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
   {path:"",component: WelcomeComponent ,children:[
    
    {path:"profile",component: SpeakerProfileComponent},
    {path:"events",component: RegisteredEventsComponent},
    
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakerRoutingModule { }
