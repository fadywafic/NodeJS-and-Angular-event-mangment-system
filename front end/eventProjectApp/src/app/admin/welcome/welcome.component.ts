import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public authSrv:AuthService, public adminServ: AdminServiceService) { }
   
  subscriber : Subscription|null = null
  clearToken(){
    this.authSrv.signOut()
  }
  ngOnInit(): void {
    // this.subscriber = this.adminServ.getProfileData().subscribe({
    //   next: dbData =>{
    //     this.std = dbData.data1
    //     //console.log(this.std)
    //   },
    //   error: err =>{console.log(err)}
    // })
  }

  ngOnDestroy(): void {
      this.subscriber?.unsubscribe()
  }
}
