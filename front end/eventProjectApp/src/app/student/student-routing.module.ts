import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { RegisteredEventsComponent } from './registered-events/registered-events.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:"",component: WelcomeComponent,children:[
    
    {path:"profile",component: StudentProfileComponent},
    {path:"events",component: RegisteredEventsComponent},
    
  ]},
  //{path:"**",component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
