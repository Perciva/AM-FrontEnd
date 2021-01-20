import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { PeriodService } from 'src/app/service/period-services.service';

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
  dataSource = new MatTableDataSource<AssistantData>(this.assistants);

  constructor(
    private periodService: PeriodService,
    private assistantService: AssistantService
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
      this.dataSource = new MatTableDataSource<AssistantData>(this.assistants);
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

    //Get Report by the astId
    
  }
  
  insertData(data){
    this.ast_initial = data.data.GetAssistantById.initial;
    this.opened = true;
  }

  isOpen(){
    return this.opened;
  }

  isError(){
    return this.errors;
  }

  doUpdate(element){
    
  }
}
