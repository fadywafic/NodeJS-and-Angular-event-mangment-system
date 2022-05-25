import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { Student } from 'src/app/_models/student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  subscriber1 : Subscription|null = null
  subscriber2 : Subscription|null = null
      
  student = new Student(0,"","","",[]);
      
  constructor(public activeRoute:ActivatedRoute, public adminServ:AdminServiceService, public router:Router) { }


  ngOnInit(): void {
    this.subscriber1 = this.activeRoute.params.subscribe(a=>{
      this.subscriber2 = this.adminServ.getStudentById(a['id']).subscribe({
        next: dbData=>{
          this.student = dbData.data
        },
        error: err=>{console.log(err)}
      })
    })
  }

  ngOnDestroy(): void {
      this.subscriber1?.unsubscribe()
      this.subscriber2?.unsubscribe()
  }

}
