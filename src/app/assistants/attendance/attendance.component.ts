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
  public ELEMENT_DATA: AttendanceData[] = [];
  mySub: any;
  str: string;
  formStr;

  assistant_intial: string;
  date: string;
  _in: string;
  _out: string;

  strArrayComma:any;
  strArrayEnter:any;

  err:any;

  loaded:Boolean = false;
  
  displayedColumns: string[] = ['initial', 'date', 'in', 'out'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private insertAttendanceService: InsertAttendanceServiceService) {
    this.formStr= new FormControl('', [Validators.required]);
  }

  previewData(data){
    this.loaded = true;
    console.log(data);
    this.strArrayEnter = data.split('\n');
    var temp= [];
    this.strArrayEnter.forEach(element => {
      this.strArrayComma = element.split(',');
      temp.push({
        assistant_initial: this.strArrayComma[0],
        date: this.strArrayComma[1],
        _in: this.strArrayComma[2],
        _out: this.strArrayComma[3]
      })
      
    });
    this.dataSource = new MatTableDataSource<AttendanceData>(temp);
    console.log(this.ELEMENT_DATA)
  }

  doAddAttendance(){
    this.str = this.formStr.value;

    console.log(this.str);

    if(this.str.includes('\n')){
      this.strArrayEnter = this.str.split('\n');
    }else{
      this.strArrayComma = this.str.split(',');
      this.err =null;
      this.insertAttendanceService.InsertAttendance(this.strArrayComma[0], this.strArrayComma[1], this.strArrayComma[2], this.strArrayComma[3])
      .subscribe(async data => {
        await this.afterAdd(data);

      });
    }

  }


  afterAdd(data){
    console.log(data)
    // alert(data.data.InsertAttendance? "Data Saved":"Failed to Save Data");
    this.err = data.data.InsertAttendance;

    // location.reload();
  }

  ngOnInit(): void {
  }

}
