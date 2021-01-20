import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { AssistantService } from 'src/app/service/assistant-services.service';
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
  ast_initial;
  assistants: AssistantData[] = [];
  displayedColumns: string[] = ['date', 'day', 'description', 'working_hour', 'in', 'in_permission', 'out', 'out_permission', 'other', 'action'];

  report: ReportData[] = [];
  dataSource = new MatTableDataSource<ReportData>(this.report);

  constructor(
    private periodService: PeriodService,
    private assistantService: AssistantService,
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
    )

    // var startDate = moment(this.startDate).add(7, 'hours')._d;
    // var endDate = moment(this.endDate).add(7, 'hours')._d;
    //Get Report by the astId
    this.reportAttendanceService.GetAllAttendanceByDate(this.startDate, this.endDate, this.astId)
    .subscribe(
      async data=>{
        await this.insertAttendanceData(data);
      }
    )
  }
  
  insertData(data){
    this.ast_initial = data.data.GetAssistantById.initial;
  }
  
  insertAttendanceData(data){
    data.data.GetAllAttendanceByDate.forEach(element => {
      this.report.push(element);
    });
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
      return "Toleransi"
    return "-";
  }

  getOutPermissionWord(s){
    if(s == "IP")
      return "Izin Pulang"
    if(s == "LP")
      return "Lupa Absen Pulang"
    if(s == "TL")
      return "Toleransi"
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
    console.log(s)
    console.log(moment(s).day());
    return moment(s).day() == 0 ? 7 : moment(s).day();

  }

  doUpdate(element){
    
  }
}
