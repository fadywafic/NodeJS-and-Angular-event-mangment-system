import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';
import { Student } from 'src/app/_models/student';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit,OnDestroy {

  subscriber1 : Subscription|null = null
  subscriber2 : Subscription|null = null
  subscriber3 : Subscription|null = null
  subscriber4 : Subscription|null = null
      
  event = new Event(0,"",new Date,new Speaker("","","","",{city:'',street:'',building:''},[]),[],[]);
  students : Student[] = []
  // student = new Student(0,"","","",[])
      
  constructor(public activeRoute:ActivatedRoute, public adminServ:AdminServiceService, public router:Router) { }


  ngOnInit(): void {
    this.subscriber1 = this.activeRoute.params.subscribe(a=>{
      this.subscriber2 = this.adminServ.getEventById(a['id']).subscribe({
        next: dbData=>{
          this.event = dbData.data
        },
        error: err=>{console.log(err)}
      })
      this.subscriber3 = this.adminServ.getStudents().subscribe({
         next: dbData=>{
          this.students = dbData.data
        },
        error: err=>{console.log(err)}
      })
    })
  }

  ngOnDestroy(): void {
      this.subscriber1?.unsubscribe()
      this.subscriber2?.unsubscribe()
      this.subscriber3?.unsubscribe()
  }

  editStudentsInEvent(stds:Student[]){
    //console.log(stds)
    this.subscriber4 = this.adminServ.eventStudents({students: stds},this.event._id).subscribe({
      next: (data) =>{console.log(data)},
      error: (err)=>{console.log(err)}
    })
    this.router.navigateByUrl("/admin/events")
  }

}
