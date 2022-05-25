import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSpeakersComponent } from './events/add-speakers/add-speakers.component';
import { AddStudentsComponent } from './events/add-students/add-students.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { ShowEventsComponent } from './events/show-events/show-events.component';
import { ShowSpeakersComponent } from './speakers/show-speakers/show-speakers.component';
import { SpeakerDetailsComponent } from './speakers/speaker-details/speaker-details.component';
import { ShowStudentsComponent } from './students/show-students/show-students.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:"",component: WelcomeComponent,children:[

    {path:"events",component: ShowEventsComponent},
    {path:"events/details/:id",component: EventDetailsComponent},
    {path:"events/addStudents/:id",component: AddStudentsComponent},
    {path:"events/addSpeakers/:id",component: AddSpeakersComponent},
    {path:"students",component: ShowStudentsComponent},
    {path:"students/details/:id",component: StudentDetailsComponent},
    {path:"speakers",component: ShowSpeakersComponent},
    {path:"speakers/details/:id",component: SpeakerDetailsComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
