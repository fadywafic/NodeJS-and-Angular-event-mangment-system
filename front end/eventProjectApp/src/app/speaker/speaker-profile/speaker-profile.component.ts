import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { SpeakerServiceService } from 'src/app/speaker.service';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-speaker-profile',
  templateUrl: './speaker-profile.component.html',
  styleUrls: ['./speaker-profile.component.css']
})
export class SpeakerProfileComponent implements OnInit,OnDestroy {

  constructor(public authSrv:AuthService, public speakerSrv:SpeakerServiceService, public router:Router) { }

  speaker = new Speaker("","","","",{city:"",street:"",building:""},[])
  subscriber : Subscription|null = null
  editFailed = false
  errorMessage =""
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  speakerNewPassword = ""
  count =  window.sessionStorage.getItem("count")
  previousPassword :string|null = null 

  ngOnInit(): void {
    this.subscriber = this.speakerSrv.getProfileData().subscribe({
      next: dbData =>{
        this.speaker = dbData.data1
        //console.log(this.speaker)
        this.previousPassword= this.speaker.password.substring(0, this.count !=null? +this.count : 4 )
      },
      error: err =>{console.log(err)}
    })
  }
  
  onSubmit(myForm:NgForm): void {
    if(!myForm.form.invalid){
      let user = {
        email: this.speaker.email,
        password: this.speakerNewPassword,
        userName: this.speaker.userName,
        city: this.speaker.address.city,
        street: this.speaker.address.street,
        building: this.speaker.address.building
      }
      //console.log(user,"form validity", !myForm.form.invalid)
      this.subscriber = this.speakerSrv.editProfile(user).subscribe({
        next: (data) => {
          //console.log(data);
          alert("you must re-login again")
          this.router.navigateByUrl("/login")
        },
        error: (err) => {
         // console.log(err)
          this.editFailed = true;
          this.errorMessage = err.error.message.split(':')[1];
        }
      })
    }else{
      myForm.form.reset
    }
  }

  ngOnDestroy(): void {
      this.subscriber?.unsubscribe()
  }

}
