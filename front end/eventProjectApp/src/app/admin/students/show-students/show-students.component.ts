import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminServiceService } from 'src/app/admin.service';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';
import { Student } from 'src/app/_models/student';

@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
 styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class ShowStudentsComponent implements OnInit {

    studentDialogEdit: boolean = false;
    
    flagEdit = true;
    flagDelete = true
    students: Student[] = [];

    student = new Student(0,"","","",[]);

    subscriber1 : Subscription|null = null
    subscriber2 : Subscription|null = null
    subscriber3 : Subscription|null = null
    subscriber4 : Subscription|null = null
    subscriber5 : Subscription|null = null

    constructor(public adminServ: AdminServiceService, public messageService: MessageService, public confirmationService: ConfirmationService, public router:Router) { }

    ngOnInit() {
        this.subscriber1= this.adminServ.getStudents().subscribe({
          next: dbData =>{
            this.students = dbData.data
            // this.events.forEach(a=>a.eventDate.toString().substring(0,10))
            console.log(this.students) ///problemaaaaaaaaaaaaaaaaaaaaaa want to change date format
          },
          error: err => {console.log(err)}
        });

    }

        onEditing(myForm:NgForm):void{
      //console.log(!myForm.form)
        if(!myForm.form.invalid){
          if (this.student?.userName.trim()) {
            //edit
            let user = {
              userName: this.student.userName,
              email: this.student.email,
            }
            //console.log("user:",user,"       student:", this.student)
            this.subscriber4 = this.adminServ.editStudent(user, this.student._id).subscribe({
              next: dbData=>{ this.flagEdit = true},
              error: err=>{
                console.log(err)
                this.flagEdit = false
              }
            })
            if(this.flagEdit){
            this.students[this.findIndexById(this.student._id)] = this.student;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Updated', life: 3000});
            this.students = [...this.students];
            this.studentDialogEdit = false;
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


    editProduct(std: Student) {
        this.student = {...std};
        this.studentDialogEdit = true;
    }

    deleteProduct(std: Student) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + std.userName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

            this.subscriber5 = this.adminServ.deleteStudent(std._id).subscribe({
              next: dbData=>{
                this.flagDelete = true 
              },
              error: err=>{
                console.log(err)
                this.flagDelete = false
              }
            })
            if(this.flagDelete){
                this.students = this.students.filter(val => val._id !== std._id);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Deleted', life: 3000});
            }
          }
        });
    }
      
    hideDialogEdit(myForm:NgForm) {
      this.studentDialogEdit = false;
      myForm.form.setErrors({notUnique: true})
      this.flagEdit = false
    }

    findIndexById(id: Number): number {
        let index = -1;
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i]._id === id) {
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
