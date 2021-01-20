import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AttendanceData } from 'src/app/common/attendance-model';
import { InsertAttendanceServiceService } from 'src/app/service/insert-attendance-service.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  ELEMENT_DATA: AttendanceData[] = [];
  mySub: any;
  str: string;
  formStr;

  assistant_intial: string;
  date: string;
  _in: string;
  _out: string;
  
  displayedColumns: string[] = ['initial', 'date', 'in', 'out'];
  dataSource = new MatTableDataSource<AttendanceData>(this.ELEMENT_DATA);

  constructor(private insertAttendanceService: InsertAttendanceServiceService, private router: Router) {
    this.formStr= new FormControl('', [Validators.required]);
   }

  doAddAttendance(){
    var strArrayComma;
    var strArrayEnter;
    this.str = this.formStr.value;

    console.log(this.str);

    if(this.str.includes('\n')){
      strArrayEnter = this.str.split('n');
    }else{
      strArrayComma = this.str.split(',');

      this.insertAttendanceService.InsertAttendance(strArrayComma[0], strArrayComma[1], strArrayComma[2], strArrayComma[3])
      .subscribe(async data => {
        await this.router.navigate(["/home"]);
      });
    }

      

  }

  ngOnInit(): void {
  }

}
