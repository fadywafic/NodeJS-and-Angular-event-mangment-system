import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Speaker } from './_models/speaker';
import { Event } from './_models/event';

@Injectable({
  providedIn: 'root'
})
export class SpeakerServiceService {

  
  baseUrl = "http://localhost:5500/speaker"


  constructor(public http : HttpClient) { }
  
getProfileData(){
  return this.http.get<{message:string, data1:Speaker,  data2: Event[]}>(this.baseUrl)
}

editProfile(speaker:object){
  return this.http.put<{message:string, data:Speaker}>(this.baseUrl+"/edit", speaker)
}
}
