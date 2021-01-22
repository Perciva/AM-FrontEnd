import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { start } from 'repl';
import { from } from 'rxjs';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { HolidayData } from 'src/app/common/holiday-model';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { HolidayServicesService } from 'src/app/service/holiday-services.service';
import { PeriodService } from 'src/app/service/period-services.service';
import { ReportAttendanceService } from 'src/app/service/report-attendance-services.service';
import { ReportData } from '../../common/report-model';
import { UpdateReportAttendanceDialogComponent } from '../dialog/update-report-attendance-dialog/update-report-attendance-dialog.component';

var moment = require('moment');
moment().format(); 

export interface test{
  date: string,
  report: ReportData
}

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

  finalReport: test[] = [];
  report: ReportData[] = [];
  dataSource = new MatTableDataSource<ReportData>(this.report);

  holidays: HolidayData[] = [];

  constructor(
    private periodService: PeriodService,
    private assistantService: AssistantService,
    private holidayService: HolidayServicesService,
    private reportAttendanceService : ReportAttendanceService,
    public dialog: MatDialog,
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
    
    this.finalReport = [];
    this.report = [];
    this.holidays = [];

    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    this.holidayService.GetAllHoliday(period_id)
    .subscribe(
      async data=>{
        await this.insertHoliday(data);
      }
    );

    this.startDate = this.formatDate(this.startDate);
    this.endDate = this.formatDate(this.endDate);
    var tempDate = this.startDate;
    do{
      this.finalReport.push({date: tempDate, report: null});
      var temp = moment(tempDate).add(1, 'days')._d;
      tempDate = this.formatDate(temp);
    }while(tempDate <= this.endDate);
      
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
        this.finalReport.forEach(final => {
          if(final.date == element.attendance.date){
            final.report = element;
          }
        });
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

  getData(s){
    if(s == null)
      return "";
    return s;
  }

  getClockDataIn(s){
    if(s == null)
      return "00:00:00";
    return s.attendance._in;
  }

  getClockDataOut(s){
    if(s == null)
      return "00:00:00";
    return s.attendance._out;
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
    if(!flag && this.report[0] != null){
      var special = this.report[0].special_shift;
      if(special != null){
        for(var i = 0; i < special.length; i++){
          if(s == special[i].date)
          msg = "Special Shift: " + special[i].description;
        }
      }
    }
    return msg;
  }
  
  getLateIn(s, t){
    if(t != null){
      var desc = this.getDescription(s).split(":");
      if(desc[0] == "Holiday"){
        return false;
      }
      if( t.attendance.special_permission == "CT" || t.attendance.special_permission == "SK"){
        return false;
      }
      var shift = this.getWorkShift(s).split(" ");
      return t.attendance._in > shift[0];
    }
    return true;
  }
  
  getAnyInPermission(p1, p2){
    if(p1 == null && p2 == null){
      return false;
    }
    return p1.attendance.in_permission != "" || p2.attendance.special_permission != "";
  }
  
  getEarlyOut(s, t){
    if(t != null){
      var desc = this.getDescription(s).split(":");
      if(desc[0] == "Holiday"){
        return false;
      }
      if( t.attendance.special_permission == "CT" || t.attendance.special_permission == "SK"){
        return false;
      }

      var shift = this.getWorkShift(s).split(" ");
      return t.attendance._out < shift[2];
    }
    return true;
  }
  
  getAnyOutPermission(p1, p2){
    if(p1 == null && p2 == null){
      return false;
    }
    return p1.attendance.out_permission != "" || p2.attendance.special_permission != "";
  }
  
  getWorkShift(s){
    var day = this.getDayOfTheWeek(s);
    var msg = "00:00:00 - 00:00:00";
    if(this.ast_data!= null){
      this.ast_data.shift.forEach(element => {
        if(element.day == day){
          msg = element._in + " - " + element._out;
        }
      });
    }
    if(this.report[0] != null){
      var special = this.report[0].special_shift;
      if(special != null){
        for(var i = 0; i < special.length; i++){
          if(s == special[i].date)
          msg = special[i]._in + " - " + special[i]._out;
        }
      }

    }
    return msg;
  }

  doUpdate(element){
    if(element!=null){
      console.log(element.attendance);
      const dialogRef = this.dialog.open(UpdateReportAttendanceDialogComponent, {
        width: '500px',
        maxHeight: '600px',
        data: element.attendance 
      });

      dialogRef.afterClosed().subscribe(result => {
        location.reload();
        // console.log('The dialog was closed');
        // console.log(result)
      });
      
    }
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
}
