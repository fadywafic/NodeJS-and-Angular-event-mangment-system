import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-add-speakers',
  templateUrl: './add-speakers.component.html',
  styleUrls: ['./add-speakers.component.css']
})
export class AddSpeakersComponent implements OnInit {

 subscriber1 : Subscription|null = null
  subscriber2 : Subscription|null = null
  subscriber3 : Subscription|null = null
  subscriber4 : Subscription|null = null
      
  event = new Event(0,"",new Date,new Speaker("","","","",{city:'',street:'',building:''},[]),[],[]);
  speakers : Speaker[] = []
  speaker = new Speaker("","","","",{city:'',street:'',building:''},[])
      
  constructor(public activeRoute:ActivatedRoute, public adminServ:AdminServiceService, public router:Router) { }


  ngOnInit(): void {
    this.subscriber1 = this.activeRoute.params.subscribe(a=>{
      this.subscriber2 = this.adminServ.getEventById(a['id']).subscribe({
        next: dbData=>{
          this.event = dbData.data
        },
        error: err=>{console.log(err)}
      })
      this.subscriber3 = this.adminServ.getSpeakers().subscribe({
         next: dbData=>{
          this.speakers = dbData.data
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

  editSpeakersInEvent(speakers:Speaker[]){
    //console.log(speakers)
    this.subscriber4 = this.adminServ.eventSpeakers({speakers: speakers},this.event._id).subscribe({
      next: (data) =>{console.log(data)},
      error: (err)=>{console.log(err)}
    })
    this.router.navigateByUrl("/admin/events")
  }
}
