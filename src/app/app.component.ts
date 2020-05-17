import { Component, Inject, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  name = 'My Sample Class';
  employeeListing: EmployeeListing | null;
  employeeData: IEmployee[] = [];

  constructor(private _httpClient: HttpClient, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.employeeListing = new EmployeeListing(this._httpClient);
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          console.log('switchMap()');
          return this.employeeListing!.getEmployees();
        }),
        map(data => {
          console.log('map(data): ' + data);
          return data;
        }),
        catchError(()=> {
          return observableOf([]);
        })
      ).subscribe((data) => this.employeeData = data);
  }

    openDialog(event: any): void {
      console.log('openDialog(' + event.target.id +')');
      const empId = event.target.id;
      let employee: IEmployee;
      for(let emp of this.employeeData) {
        if(emp.id == empId) {
          employee = emp;
          console.log(employee);
        }
      }
      const dialogRef = this.dialog.open(EmployeeDetailDialog, 
      { width: '500px', height: '500px', data: employee });
    }
}



export interface IEmployeeDepartment {
  id: number;
  name: string;
}

export interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  annual_salary: number;
  hire_date: string;
  image_filename: string;
  department: IEmployeeDepartment;
}

export class EmployeeListing {
  constructor(private _httpClient: HttpClient) { console.log('EmployeeListing() '); }

  getEmployees() : Observable<IEmployee[]> {
    const requestUrl = 'https://www.mccinfo.net/epsample/employees';
    console.log('getEmployees()');
    return this._httpClient.get<IEmployee[]>(requestUrl, {responseType: 'json'});
  }
}

@Component({
  selector:'employee-detail',
  templateUrl:'employee-detail.html',
})
export class EmployeeDetailDialog{
  constructor(public dialogRef: MatDialogRef<EmployeeDetailDialog>,
  @Inject(MAT_DIALOG_DATA) public data: IEmployee) {}

  onNoClick() : void {
    this.dialogRef.close();
  }
}