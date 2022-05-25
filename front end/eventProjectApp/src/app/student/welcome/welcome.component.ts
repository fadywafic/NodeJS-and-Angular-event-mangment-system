import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { StudentServiceService } from 'src/app/student.service';
import { Student } from 'src/app/_models/student';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit,OnDestroy {

  constructor(public authSrv:AuthService, public stdSrv: StudentServiceService) { }
   
  subscriber : Subscription|null = null
  std = new Student(0,"","","",[])
  clearToken(){
    this.authSrv.signOut()
  }
  ngOnInit(): void {
    this.subscriber = this.stdSrv.getProfileData().subscribe({
      next: dbData =>{
        this.std = dbData.data1
        //console.log(this.std)
      },
      error: err =>{console.log(err)}
    })
  }

  ngOnDestroy(): void {
      this.subscriber?.unsubscribe()
  }
}
