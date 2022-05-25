import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { SpeakerServiceService } from 'src/app/speaker.service';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-registered-events',
  templateUrl: './registered-events.component.html',
  styleUrls: ['./registered-events.component.css']
})
export class RegisteredEventsComponent implements OnInit,OnDestroy {

  constructor(public authSrv:AuthService, public speakerSrv:SpeakerServiceService, public router:Router) { }

  speaker = new Speaker("","","","",{city:"",street:"",building:""},[])
  event : Event[] = []
  subscriber : Subscription|null = null
  subscriber2 : Subscription|null = null
  ngOnInit(): void {
    this.subscriber = this.speakerSrv.getProfileData().subscribe({
      next: dbData =>{
        this.speaker = dbData.data1
        this.event = dbData.data2
        console.log(this.speaker)
      },
      error: err =>{console.log(err)}
    })
  }

  ngOnDestroy(): void {
    this.subscriber2?.unsubscribe()
      this.subscriber?.unsubscribe()
  }

}
