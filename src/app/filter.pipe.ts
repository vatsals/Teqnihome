import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(myArr: any, term: any): any {
    if(term === undefined) return;
    return myArr.filter(function(myArr) {
    	return myArr.name.toLowerCase().includes(term.toLowerCase());
    })
  }

}
