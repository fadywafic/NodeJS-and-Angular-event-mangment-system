import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { AuthService } from 'src/app/auth.service';
import { StudentServiceService } from 'src/app/student.service';
import { Event } from 'src/app/_models/event';
import { Student } from 'src/app/_models/student';

@Component({
  selector: 'app-registered-events',
  templateUrl: './registered-events.component.html',
  styleUrls: ['./registered-events.component.css']
})
export class RegisteredEventsComponent implements OnInit,OnDestroy {

  constructor(public authSrv:AuthService, public stdSrv:StudentServiceService, public router:Router) { }

  student = new Student(0,"","","",[])
  event : Event[] = []
  subscriber : Subscription|null = null
  subscriber2 : Subscription|null = null
  ngOnInit(): void {
    this.subscriber = this.stdSrv.getProfileData().subscribe({
      next: dbData =>{
        this.student = dbData.data1
        this.event = dbData.data2
        console.log(this.student)
      },
      error: err =>{console.log(err)}
    })
  }

  ngOnDestroy(): void {
    this.subscriber2?.unsubscribe()
      this.subscriber?.unsubscribe()
  }
}
