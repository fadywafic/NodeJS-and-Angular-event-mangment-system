import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-speaker-details',
  templateUrl: './speaker-details.component.html',
  styleUrls: ['./speaker-details.component.css']
})
export class SpeakerDetailsComponent implements OnInit {

  subscriber1 : Subscription|null = null
  subscriber2 : Subscription|null = null
      
  speaker = new Speaker("","","","",{city:"",street:"",building:""},[]);
      
  constructor(public activeRoute:ActivatedRoute, public adminServ:AdminServiceService, public router:Router) { }


  ngOnInit(): void {
    this.subscriber1 = this.activeRoute.params.subscribe(a=>{
      this.subscriber2 = this.adminServ.getSpeakerById(a['id']).subscribe({
        next: dbData=>{
          this.speaker = dbData.data
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
