import { Speaker } from "./speaker";
import { Student } from "./student";

export class Event {
    constructor(
     public _id: Number,
    public title: String,
    public eventDate: Date , 
    public mainSpeaker: Speaker ,
    public otherSpeakers: Array<Speaker>,
    public students: Array<Student> 
    ){}
}
 