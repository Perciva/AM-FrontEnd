import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { HolidayData } from 'src/app/common/holiday-model';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { HolidayServicesService } from 'src/app/service/holiday-services.service';
import { PeriodService } from 'src/app/service/period-services.service';
import { ReportAttendanceService } from 'src/app/service/report-attendance-services.service';
import { ReportData } from '../../common/report-model';

var moment = require('moment');
moment().format(); 

@Component({
  selector: 'app-report-attendance',
  templateUrl: './report-attendance.component.html',
  styleUrls: ['./report-attendance.component.scss']
})
export class ReportAttendanceComponent {
  errors = false;
  opened = false;
  minDate;
  maxDate;
  startDate;
  endDate;
  astId;
  ast_data : AssistantData;
  ast_initial;
  assistants: AssistantData[] = [];
  displayedColumns: string[] = ['date', 'day', 'description', 'working_hour', 'in', 'in_permission', 'out', 'out_permission', 'other', 'action'];

  report: ReportData[] = [];
  dataSource = new MatTableDataSource<ReportData>(this.report);

  holidays: HolidayData[] = [];

  constructor(
    private periodService: PeriodService,
    private assistantService: AssistantService,
    private holidayService: HolidayServicesService,
    private reportAttendanceService : ReportAttendanceService,
  ) { 
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    this.periodService.GetPeriodById(period_id).subscribe(async data => {
      await this.insertDate(data);
    })

    this.assistantService.GetAllAssistant(period_id).subscribe(async data => {
      await this.insertAssistantData(data);
    });

  }
  
  insertDate(data){
    if(data.data.GetPeriodById != null){
      this.startDate = this.minDate = data.data.GetPeriodById.start;
      this.endDate = this.maxDate = data.data.GetPeriodById.end;
    }
  }
  
  insertAssistantData(data){
    console.log(data.data);
    if(data.data.GetAssistantByPeriodId != null){
      data.data.GetAssistantByPeriodId.forEach(element => {
        this.assistants.push(element)
      });
    }
  }
  
  viewData(){
    console.log("Test Masuk");
    if(this.astId == null){
      this.errors = true;
      return;
    }
    this.errors = false;
    this.assistantService.GetAssistantById(this.astId).subscribe(
      async data=>{
        await this.insertData(data);
      }
    );
      
    this.report = [];
    this.holidays = [];

    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    this.holidayService.GetAllHoliday(period_id)
    .subscribe(
      async data=>{
        await this.insertHoliday(data);
      }
    );
      
    // var startDate = moment(this.startDate).add(7, 'hours')._d;
    // var endDate = moment(this.endDate).add(7, 'hours')._d;
    this.reportAttendanceService.GetAllAttendanceByDate(this.startDate, this.endDate, this.astId)
    .subscribe(
      async data=>{
        await this.insertAttendanceData(data);
      }
    );
  }

  insertHoliday(data){
    if(data.data.GetHolidayByPeriodId != null){
      data.data.GetHolidayByPeriodId.forEach(element => {
        this.holidays.push(element);
      });
    }
  }
      
  insertData(data){
    this.ast_initial = data.data.GetAssistantById.initial;
    this.ast_data = data.data.GetAssistantById;
  }
  
  insertAttendanceData(data){
    if(data.data.GetAllAttendanceByDate != null){
      data.data.GetAllAttendanceByDate.forEach(element => {
        this.report.push(element);
      });

    }
    this.dataSource = new MatTableDataSource<ReportData>(this.report);
    this.opened = true;
  }

  isOpen(){
    return this.opened;
  }

  isError(){
    return this.errors;
  }

  getInPermissionWord(s){
    if(s == "IT")
      return "Izin Telat Masuk"
    if(s == "LM")
      return "Lupa Absen Masuk"
    if(s == "TM")
      return "Telat Absen Masuk"
    if(s == "TL")
      return "Toleransi Masuk"
    return "-";
  }

  getOutPermissionWord(s){
    if(s == "IP")
      return "Izin Pulang"
    if(s == "LP")
      return "Lupa Absen Pulang"
    if(s == "TL")
      return "Toleransi Pulang"
    return "-";
  }

  getSpecialPermissionWord(s){
    if(s == "CT")
      return "Cuti"
    if(s == "SK")
      return "Sakit"
    if(s == "AP")
      return "Alpha"
    if(s == "TL")
      return "Toleransi"
    return "-";
  }

  getDayOfTheWeek(s){
    return moment(s).day() == 0 ? 7 : moment(s).day();
  }

  getDescription(s){
    var day = this.getDayOfTheWeek(s);
    var msg = "";
    var flag = false;
    if(day == 7 && !flag){
      msg = "Holiday: Sunday";
      flag = true;
    }
    else{
      for(var i = 0; i < this.holidays.length; i++){
        if(s == this.holidays[i].date){
          msg = "Holiday: " + this.holidays[i].description;
          flag = true;
        }
      }
    }
    if(!flag){
      var special = this.report[0].special_shift;
      if(special != null){
        for(var i = 0; i < special.length; i++){
          // console.log(s + " >> " + special[i].date)
          // console.log(special[i])
          if(s == special[i].date)
          msg = "Special Shift: " + special[i].description;
        }
      }
    }
    return msg;
  }

  getLateIn(s, t){
    var desc = this.getDescription(s).split(":");
    if(desc[0] == "Holiday"){
      return false;
    }
    var shift = this.getWorkShift(s).split(" ");
    console.log( t + " > " + shift[0]);

    return t > shift[0];
  }

  getEarlyOut(s, t){
    var desc = this.getDescription(s).split(":");
    if(desc[0] == "Holiday"){
      return false;
    }
    var shift = this.getWorkShift(s).split(" ");
    console.log( t + " > " + shift[2]);

    return t < shift[2];
  }

  getWorkShift(s){
    var day = this.getDayOfTheWeek(s);
    var msg = "00:00:00 - 00:00:00";
    this.ast_data.shift.forEach(element => {
      if(element.day == day){
        msg = element._in + " - " + element._out;
      }
    });
    var special = this.report[0].special_shift;
    if(special != null){
      for(var i = 0; i < special.length; i++){
        if(s == special[i].date)
        msg = special[i]._in + " - " + special[i]._out;
      }
    }
    return msg;
  }

  doUpdate(){
    
  }
}
