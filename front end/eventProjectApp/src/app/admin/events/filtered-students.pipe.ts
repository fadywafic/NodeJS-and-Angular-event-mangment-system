import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/_models/student';

@Pipe({
  name: 'filteredStudents',
  // pure: false
})
export class FilteredStudentsPipe implements PipeTransform {

  transform(AllStudents: Student[], StudentsInEvent: Student[],): Student[] {
    let studentsOutEvent : Student[] = [];
    studentsOutEvent = AllStudents.filter(std => {
      return !StudentsInEvent.find(inStd => {
         return inStd._id === std._id;
      });
   });
    //console.log("all",AllStudents, "         in",StudentsInEvent, "         out" ,studentsOutEvent)
    return studentsOutEvent;
  }

}
