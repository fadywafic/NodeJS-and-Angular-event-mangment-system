import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-speaker-sign-up',
  templateUrl: './speaker-sign-up.component.html',
  styleUrls: ['./speaker-sign-up.component.css']
})
export class SpeakerSignUpComponent implements OnInit,OnDestroy {

  speaker = new Speaker("","","","",{city:"",street:"",building:""},[])
  subscriber : Subscription|null = null
  signUpFailed = false
  errorMessage =""
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  
  constructor(public authSrv:AuthService, public router:Router) { }

  onSubmit(myForm:NgForm): void {
    if(!myForm.form.invalid){
      let user = {
        role: "speaker",
        email: this.speaker.email,
        password: this.speaker.password,
        userName: this.speaker.userName,
        city: this.speaker.address.city,
        street: this.speaker.address.street,
        building: this.speaker.address.building,
      }
      console.log(user)
      this.subscriber = this.authSrv.signUp(user).subscribe({
        next: (data) => {
          //console.log(data);
          window.sessionStorage.setItem("count", this.speaker.password.length.toString());
          this.router.navigateByUrl("login")
        },
        error: (err) => {
          //console.log(err)
          this.signUpFailed = true;
          this.errorMessage = err.error.message.split(':')[1];
          //console.log(this.errorMessage)
        }
      })  
    }else{
      myForm.form.reset();
    }
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(){
    this.subscriber?.unsubscribe()
  }

}
