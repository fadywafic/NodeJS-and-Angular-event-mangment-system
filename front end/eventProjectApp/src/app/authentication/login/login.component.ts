import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  constructor(public authSrv:AuthService, public router:Router) { }

  subscriber : Subscription|null = null
  loginFailed = false
  errorMessage =""
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  // passwordPattern= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"

  user={
    email: "",
    password:"",
    role:""
  }

  onSubmit(myForm:NgForm): void{    
    if(!myForm.form.invalid/*!myForm.form.controls[0].errors && !myForm.form.controls[1].errors && !myForm.form.controls[2].errors*/){
          let role;
      this.subscriber = this.authSrv.login(this.user).subscribe({
        next: (data) =>{
          //console.log(data)
          this.authSrv.saveToken(data.token)
          role = data.message.split(" ",1)[0]
          //console.log(role)
          if(role == "Admin"){
            this.router.navigateByUrl("admin")
          }else if(role == "Student"){
            this.router.navigateByUrl("student")
          }else if(role =="Speaker"){
            this.router.navigateByUrl("speaker")
          }else{
            this.router.navigateByUrl('errorPage')
          }
        },
        error: (error) => {
          //console.log(error)
          this.loginFailed = true;
          this.errorMessage = error.error.message.split(':')[1];
        }
      })
  }else{
    //console.log(myForm.form.controls)
    myForm.form.reset();
  }
}


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscriber?.unsubscribe();
  }

}
