import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacenullwithtext'
})

export class ReplacenullwithtextPipe implements PipeTransform {

  transform(value: any, repleceText: string = '--'): any {
    if (typeof value === 'undefined' || value === null || value.trim() === "") {
        return repleceText;
    }
    return value;
  }
}
