import { Pipe, PipeTransform } from '@angular/core';
import { Speaker } from 'src/app/_models/speaker';

@Pipe({
  name: 'filteredSpeakers'
})
export class FilteredSpeakersPipe implements PipeTransform {

  transform(allSpeakers: Speaker[], speakersInEvent: Speaker[]): Speaker[] {
    let speakersOutEvent: Speaker[] =[]

    speakersOutEvent = allSpeakers.filter(speaker =>{ return !speakersInEvent.find(inSpeaker => { return inSpeaker._id == speaker._id})})
    console.log("all",allSpeakers, "         in",speakersInEvent, "         out" ,speakersOutEvent)

    return speakersOutEvent;
  }

}
