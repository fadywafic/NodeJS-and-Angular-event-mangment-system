import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { StudentServiceService } from 'src/app/student.service';
import { Student } from 'src/app/_models/student';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit,OnDestroy {

  constructor(public authSrv:AuthService, public stdSrv:StudentServiceService, public router:Router) { }

  student = new Student(0,"","","",[])
  subscriber : Subscription|null = null
  editFailed = false
  errorMessage =""
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  studentNewPassword = ""
  count =  window.sessionStorage.getItem("count")
  previousPassword :string|null = null 

  ngOnInit(): void {
    this.subscriber = this.stdSrv.getProfileData().subscribe({
      next: dbData =>{
        this.student = dbData.data1
        console.log(this.count)
        this.previousPassword= this.student.password.substring(0, this.count !=null? +this.count : 4 )
      },
      error: err =>{console.log(err)}
    })
  }
  
  onSubmit(myForm:NgForm): void {
    if(!myForm.form.invalid){
      let user = {
        email: this.student.email,
        password: this.studentNewPassword,
        userName: this.student.userName,
      }
      //console.log(user,"form validity", !myForm.form.invalid)
      this.subscriber = this.stdSrv.editProfile(user).subscribe({
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
