import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './_models/student';
import { Speaker } from './_models/speaker';
import { Event } from './_models/event';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(public http: HttpClient) { }

  // students
baseStudentsUrl = "http://localhost:5500/students/"

getStudents(){
  return this.http.get<{message:String, data:Student[]}>(this.baseStudentsUrl)
}

getStudentById(id:Number){
  return this.http.get<{message:String, data:Student}>(this.baseStudentsUrl+id)
}

editStudent(std:Object, id:Number){
  return this.http.put(this.baseStudentsUrl+id+"/editStudent", std)
}

deleteStudent(stdId:Number){
  return this.http.delete<String>(this.baseStudentsUrl+stdId+"/deleteStudent")
}

  //speakers
baseSpeakersUrl = "http://localhost:5500/speakers/"

getSpeakers(){
  return this.http.get<{message:String, data:Speaker[]}>(this.baseSpeakersUrl)
}

getSpeakerById(id:number){
  return this.http.get<{message:String, data:Speaker}>(this.baseSpeakersUrl+id)
}

editSpeaker(speaker:Object, id:String){
  return this.http.put<String>(this.baseSpeakersUrl+id+"/editSpeaker", speaker)
}

deleteSpeaker(speakerId:String){
  return this.http.delete<String>(this.baseSpeakersUrl+speakerId+"/deleteSpeaker")
}

  //events
baseEventsUrl = "http://localhost:5500/events/"

getEvents(){
  return this.http.get<{message:String, data:Event[]}>(this.baseEventsUrl)
}

getEventById(id:number){
  return this.http.get<{message:String, data:Event}>(this.baseEventsUrl+id)
}

addEvent(event: Object){
  return this.http.post<{message:String, data:Event}>(this.baseEventsUrl+"addEvent", event)
}

editEvent(event: Object, id: Number){
  return this.http.put<String>(this.baseEventsUrl+"editEvent/"+id, event)
}

deleteEvent(eventId: Number){
  return this.http.delete<string>(this.baseEventsUrl+"deleteEvent/"+eventId)
}

  //add student/speaker to event
  // body --> event , params --> std/spkr
// addStudentToEvent(event: Event, stdId:number){
//   return this.http.post<{message:String, data:Event}>(this.baseEventsUrl+"addStudent/"+stdId, event)
// }

// addSpeakerToEvent(event: Event, speakerId:number){
//   return this.http.post<{message:String, data:Event}>(this.baseEventsUrl+"addSpeaker/"+speakerId, event)
// }
  

//   //remove student/speaker from event
// removeStudentFromEvent(event: Event, stdId:number){
//   return this.http.put<{message:String, data:Event}>(this.baseEventsUrl+"removeStudent/"+stdId, event)
// }

// removeSpeakerFromEvent(event: Event, speakerId:number){
//   return this.http.put<{message:String, data:Event}>(this.baseEventsUrl+"removeSpeaker/"+speakerId, event)
// }

  eventStudents(user: Object, id:Number){
    return this.http.put<String>(this.baseEventsUrl+id+'/students', user)
  }

  eventSpeakers(user: Object, id:Number){
    return this.http.put<String>(this.baseEventsUrl+id+'/speakers', user)
  }
}
