import { Event } from "./event";

export class Speaker {
    constructor(
        public _id: String,
    public userName:  String,
    public email: String,
    public password: String,
    public address: {
    city: String,
    street: String,
    building: String,
  },
    public events: Array<Event> 
    ){}
}
