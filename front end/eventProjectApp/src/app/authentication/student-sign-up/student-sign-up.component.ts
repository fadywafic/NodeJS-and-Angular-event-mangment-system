import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Student } from 'src/app/_models/student';

@Component({
  selector: 'app-student-sign-up',
  templateUrl: './student-sign-up.component.html',
  styleUrls: ['./student-sign-up.component.css']
})
export class StudentSignUpComponent implements OnInit,OnDestroy {


  constructor(public authSrv:AuthService, public router:Router) { }

  student = new Student(0,"","","",[])
  subscriber : Subscription|null = null
  signUpFailed = false
  errorMessage =""
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  onSubmit(myForm:NgForm): void {
    if(!myForm.form.invalid){
      let user = {
        role: "student",
        email: this.student.email,
        password: this.student.password,
        userName: this.student.userName,
      }
      //console.log(user,"form validity", !myForm.form.invalid)
      this.subscriber = this.authSrv.signUp(user).subscribe({
        next: (data) => {
          //console.log(data);
          window.sessionStorage.setItem("count", this.student.password.length.toString());
          this.router.navigateByUrl("login")
        },
        error: (err) => {
         // console.log(err)
          this.signUpFailed = true;
          this.errorMessage = err.error.message.split(':')[1];
        }
      })
    }else{
      myForm.form.reset
    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscriber?.unsubscribe()
  }

}
