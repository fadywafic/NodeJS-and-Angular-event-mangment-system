import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { SpeakerServiceService } from 'src/app/speaker.service';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit,OnDestroy {

  constructor(public authSrv:AuthService, public speakerSrv: SpeakerServiceService) { }
   
  subscriber : Subscription|null = null
  speaker = new Speaker("","","","",{city:"",street:"",building:""},[])

  clearToken(){
    this.authSrv.signOut()
  }
  ngOnInit(): void {
    this.subscriber = this.speakerSrv.getProfileData().subscribe({
      next: dbData =>{
        this.speaker = dbData.data1
        console.log(this.speaker)
      },
      error: err =>{console.log(err)}
    })
  }

  ngOnDestroy(): void {
      this.subscriber?.unsubscribe()
  }

}
