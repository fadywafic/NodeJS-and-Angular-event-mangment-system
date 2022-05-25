import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SpeakerSignUpComponent } from './authentication/speaker-sign-up/speaker-sign-up.component';
import { StudentSignUpComponent } from './authentication/student-sign-up/student-sign-up.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"studentSignUp",component: StudentSignUpComponent},
  {path:"speakerSignUp",component: SpeakerSignUpComponent},
  {path:"student",loadChildren:()=>import('./student/student.module').then(m=>m.StudentModule)},
  {path:"speaker",loadChildren:()=>import("./speaker/speaker.module").then(m=>m.SpeakerModule)},
  {path:"admin",loadChildren:()=>import("./admin/admin.module").then(m=>m.AdminModule)},
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"**",component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
