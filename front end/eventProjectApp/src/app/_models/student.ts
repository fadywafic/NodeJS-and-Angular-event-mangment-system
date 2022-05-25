import { Event } from "./event";

export class Student {
    constructor(
        public _id: Number,
    public userName:  String,
    public email: String,
    public password: String,
    public events: Array<Event> 
    ){}
}
