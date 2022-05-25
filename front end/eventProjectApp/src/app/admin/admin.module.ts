import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShowEventsComponent } from './events/show-events/show-events.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ChipsModule} from 'primeng/chips';
import { ChipModule } from 'primeng/chip';
import { SpeakersPipe } from './speakers.pipe';
import { AddStudentsComponent } from './events/add-students/add-students.component';
import {PickListModule} from 'primeng/picklist';
import { AddSpeakersComponent } from './events/add-speakers/add-speakers.component';
import { FilteredStudentsPipe } from './events/filtered-students.pipe';
import { FilteredSpeakersPipe } from './events/filtered-speakers.pipe';
import { ShowStudentsComponent } from './students/show-students/show-students.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { ShowSpeakersComponent } from './speakers/show-speakers/show-speakers.component';
import { SpeakerDetailsComponent } from './speakers/speaker-details/speaker-details.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    ShowEventsComponent,
    EventDetailsComponent,
    SpeakersPipe,
    AddStudentsComponent,
    AddSpeakersComponent,
    FilteredStudentsPipe,
    FilteredSpeakersPipe,
    ShowStudentsComponent,
    StudentDetailsComponent,
    ShowSpeakersComponent,
    SpeakerDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DropdownModule,
    ConfirmDialogModule,
    InputTextModule,
    DialogModule,
    ChipsModule,
    ChipModule,
    PickListModule
  ]
})
export class AdminModule { }
