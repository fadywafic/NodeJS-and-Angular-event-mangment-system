import { Pipe, PipeTransform } from '@angular/core';
import { Speaker } from '../_models/speaker';

@Pipe({
  name: 'speakers'
})
export class SpeakersPipe implements PipeTransform {

  transform(value: Speaker[]): String[] {
    let speakerNames = value.map(a=>a.userName)
    return speakerNames;
  }

}
