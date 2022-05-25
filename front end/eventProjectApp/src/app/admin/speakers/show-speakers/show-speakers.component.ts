import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-show-speakers',
  templateUrl: './show-speakers.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class ShowSpeakersComponent implements OnInit {

  
    speakerDialogEdit = false;
    
    flagEdit = true;
    flagDelete = true
    speakers: Speaker[] = [];

    speaker = new Speaker("","","","",{city:"",street:"",building:""},[]);

    subscriber1 : Subscription|null = null
    subscriber2 : Subscription|null = null
    subscriber3 : Subscription|null = null
    subscriber4 : Subscription|null = null
    subscriber5 : Subscription|null = null

    constructor(public adminServ: AdminServiceService, public messageService: MessageService, public confirmationService: ConfirmationService, public router:Router) { }

    ngOnInit() {
        this.subscriber1= this.adminServ.getSpeakers().subscribe({
          next: dbData =>{
            this.speakers = dbData.data
            // this.events.forEach(a=>a.eventDate.toString().substring(0,10))
            console.log(this.speakers) ///problemaaaaaaaaaaaaaaaaaaaaaa want to change date format
          },
          error: err => {console.log(err)}
        });

    }

        onEditing(myForm:NgForm):void{
      //console.log(!myForm.form)
        if(!myForm.form.invalid){
          if (this.speaker?.userName.trim()) {
            //edit
            let user = {
              userName: this.speaker.userName,
              email: this.speaker.email,
              city: this.speaker.address.city,
              street: this.speaker.address.street,
              building: this.speaker.address.building,
            }
            //console.log("user:",user,"       speaker:", this.speaker)
            this.subscriber4 = this.adminServ.editSpeaker(user, this.speaker._id).subscribe({
              next: dbData=>{ 
                console.log(dbData)
                this.flagEdit = true
              },
              error: err=>{
                console.log(err)
                this.flagEdit = false
              }
            })
            if(this.flagEdit){
            this.speakers[this.findIndexById(this.speaker._id)] = this.speaker;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Updated', life: 3000});
            this.speakers = [...this.speakers];
            this.speakerDialogEdit = false;
              // this.event = null; ////////////////////////////// kan {}
            }
          }
        }
      }
      
    ngOnDestroy(): void {
        this.subscriber1?.unsubscribe()
        this.subscriber2?.unsubscribe()
        this.subscriber3?.unsubscribe()
        this.subscriber4?.unsubscribe()
        this.subscriber5?.unsubscribe()

    }


    editProduct(speaker: Speaker) {
        this.speaker = {...speaker};
        this.speakerDialogEdit = true;
    }

    deleteProduct(speaker: Speaker) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + speaker.userName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            this.subscriber5 = this.adminServ.deleteSpeaker(speaker._id).subscribe({
              next: dbData=>{
                this.flagDelete = true 
              },
              error: err=>{
                console.log(err)
                this.flagDelete = false
              }
            })
            if(this.flagDelete){
                this.speakers = this.speakers.filter(val => val._id !== speaker._id);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Deleted', life: 3000});
            }
          }
        });
    }
      
    hideDialogEdit(myForm:NgForm) {
      this.speakerDialogEdit = false;
      myForm.form.setErrors({notUnique: true})
      this.flagEdit = false
    }

    findIndexById(id: String): number {
        let index = -1;
        for (let i = 0; i < this.speakers.length; i++) {
            if (this.speakers[i]._id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    createId(): Number {
        let id = '';
        var chars = '123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return +id;
    }
}
