import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit,OnDestroy {

  subscriber1 : Subscription|null = null
  subscriber2 : Subscription|null = null
      
  event = new Event(0,"",new Date,new Speaker("","","","",{city:'',street:'',building:''},[]),[],[]);
      
  descDialog = false
  desc = " A professional Event for ITI students and we hope during this event to cover the following topics ..."
  mydesc = ''


  constructor(public activeRoute:ActivatedRoute, public adminServ:AdminServiceService, public router:Router) { }


  ngOnInit(): void {
    this.subscriber1 = this.activeRoute.params.subscribe(a=>{
      this.subscriber2 = this.adminServ.getEventById(a['id']).subscribe({
        next: dbData=>{
          this.event = dbData.data
        },
        error: err=>{console.log(err)}
      })
    })
  }

  ngOnDestroy(): void {
      this.subscriber1?.unsubscribe()
      this.subscriber2?.unsubscribe()
  }

  openDescription(){
    this.descDialog = true
    this.mydesc = this.desc
  }

  hideDialogDesc(){
    this.descDialog = false
    this.mydesc=''
  }
  saveDialogDesc(eventDesc: string){
    this.descDialog = false
    this.desc = eventDesc

  }
}
