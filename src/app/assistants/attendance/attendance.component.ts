import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AttendanceData } from 'src/app/common/attendance-model';
import { GlobalConstants } from 'src/app/common/global-variable';
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

  previewData(){
    if(this.str == "" || this.str == null){
      this.loaded = false;
      return;
    }
    this.loaded = true;
    console.log(this.str);
    this.strArrayEnter = this.str.split('\n');
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
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    this.str = this.formStr.value;

    console.log(this.str);

    this.strArrayEnter = this.str.split('\n');
    this.strArrayEnter.forEach(element => {
      this.strArrayComma = element.split(',');
      var invalueArr = this.strArrayComma[2].split(':')
      var invalue = invalueArr[0]+invalueArr[1]+invalueArr[2]
      var outvalueArr = this.strArrayComma[3].split(':')
      var outvalue = outvalueArr[0]+outvalueArr[1]+outvalueArr[2]
      console.log(invalue + outvalue)
      if(invalue > outvalue){
        alert("In Time must be before Out Time")
        return;
      }else{
        this.insertAttendanceService.InsertAttendance(this.strArrayComma[0], period_id, this.strArrayComma[1], this.strArrayComma[2], this.strArrayComma[3])
        .subscribe(async data => {
          await this.afterAdd(data);
    
        });
      }
    });

  }


  afterAdd(data){
    console.log(data)
    this.err = data.data.InsertAttendance;
    this.loaded = false;
    this.str = "";
  }

  ngOnInit(): void {
  }

}
