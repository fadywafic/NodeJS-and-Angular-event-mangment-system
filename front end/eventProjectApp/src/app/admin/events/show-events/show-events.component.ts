import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class ShowEventsComponent implements OnInit,OnDestroy {

    eventDialogAdd: boolean = false;
    eventDialogEdit: boolean = false;
    
    flagDelete = true;
    flagEdit = true;
    flagAdd = true;

    events: Event[] = [];

    event = new Event(0,"",new Date,new Speaker("","","","",{city:'',street:'',building:''},[]),[],[]);


    speakers: Speaker[] = [];

    subscriber1 : Subscription|null = null
    subscriber2 : Subscription|null = null
    subscriber3 : Subscription|null = null
    subscriber4 : Subscription|null = null
    subscriber5 : Subscription|null = null

    constructor(public adminServ: AdminServiceService, public messageService: MessageService, public confirmationService: ConfirmationService, public router:Router) { }

    ngOnInit() {
        this.subscriber1= this.adminServ.getEvents().subscribe({
          next: dbData =>{
            this.events = dbData.data
            // this.events.forEach(a=>a.eventDate.toString().substring(0,10))
            console.log(this.events) ///problemaaaaaaaaaaaaaaaaaaaaaa want to change date format
          },
          error: err => {console.log(err)}
        });

       this.subscriber2 = this.adminServ.getSpeakers().subscribe({
         next: dbData =>{
           this.speakers = dbData.data
         },
         error: err =>{console.log(err)}
       })
    }

    onAdding(myForm:NgForm):void{
      if(myForm.form.controls["date"].touched == false||myForm.form.controls["mainSpeaker"].touched == false){
        myForm.form.setErrors({notUnique: true})
      }
      //console.log(!myForm.form)
        if(!myForm.form.invalid){
          if (this.event?.title.trim()) {
            let user = {
              mainSpeaker: this.event.mainSpeaker._id,
              title: this.event.title,
              date: this.event.eventDate
            }
            console.log(user)
            //add
            this.subscriber3 = this.adminServ.addEvent(user).subscribe({
              next: dbData=>{
                this.flagAdd = true
                window.location.reload()
                },
              error: err=>{
                console.log(err)
                this.flagAdd = false
              }
            })
            if(this.flagAdd){
              this.event._id = this.createId();
              // this.product.image = 'product-placeholder.svg';
              this.events.push(this.event);
              //console.log(this.event)
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Created', life: 3000});
              this.events = [...this.events];
              this.eventDialogAdd = false;
              
              // this.event = null; ////////////////////////////// kan {}
            }
          }
        }
    }

        onEditing(myForm:NgForm):void{
      //console.log(!myForm.form)
        if(!myForm.form.invalid){
          if (this.event?.title.trim()) {
            //edit
            let user = {
              mainSpeaker: this.event.mainSpeaker._id,
              title: this.event.title,
              date: this.event.eventDate
            }
            //console.log(user)
            this.subscriber4 = this.adminServ.editEvent(user,this.event._id).subscribe({
              next: dbData=>{ this.flagEdit = true},
              error: err=>{
                console.log(err)
                this.flagEdit = false
              }
            })
            if(this.flagEdit){
            this.events[this.findIndexById(this.event._id)] = this.event;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Updated', life: 3000});
            this.events = [...this.events];
            this.eventDialogEdit = false;
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


    openNew() {
        this.event = new Event(0,"",new Date,new Speaker("","","","",{city:'',street:'',building:''},[]),[],[]);
        this.eventDialogAdd = true;
    }

    editProduct(event: Event) {
        this.event = {...event};
        this.eventDialogEdit = true;
    }

    deleteProduct(event: Event) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + event.title + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            this.subscriber5 = this.adminServ.deleteEvent(event._id).subscribe({
              next: dbData=>{
                this.flagDelete = true 
              },
              error: err=>{
                console.log(err)
                this.flagDelete = false
              }
            })
            if(this.flagDelete){
                this.events = this.events.filter(val => val._id !== event._id);
                // this.event = null; /////////////////////////////////////////////// kan {}
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Deleted', life: 3000});
            }
          }
        });
    }

    hideDialogAdd(myForm:NgForm) {
        this.eventDialogAdd = false;
        myForm.form.setErrors({notUnique: true})
        this.flagAdd = false
    }
      
    hideDialogEdit(myForm:NgForm) {
      this.eventDialogEdit = false;
      myForm.form.setErrors({notUnique: true})
      this.flagEdit = false
    }

    findIndexById(id: Number): number {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i]._id === id) {
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

