import { Pipe, PipeTransform } from '@angular/core';
import { Speaker } from '../_models/speaker';

@Pipe({
  name: 'otherspeakers'
})
export class OtherspeakersPipe implements PipeTransform {

 transform(value: Speaker[]): string {
    // let otherSpeakers = value.reduce((c,f)=> c+f.userName+", ","")
    let userNames = value.map(a=>a.userName)
    let otherSpeakers = userNames.join(", ")
    return otherSpeakers;
  }

}
