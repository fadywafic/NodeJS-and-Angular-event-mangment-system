import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './_models/event';
import { Student } from './_models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  baseUrl = "http://localhost:5500/student"

  constructor(public http : HttpClient) { }

getProfileData(){
  return this.http.get<{message:string, data1:Student, data2: Event[]}>(this.baseUrl)
}

editProfile(std:Object){
  return this.http.put<{message:string, data:Student}>(this.baseUrl+"/edit",std)
}





}
