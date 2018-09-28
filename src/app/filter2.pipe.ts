import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(employees: any, term?: any): any {
  	employees.sort();
    if(term === undefined) return employees;
    return employees.filter(function(employee) {
    	return employee.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

}
