import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { LeaderData } from 'src/app/common/leader-model';
import { AssistantPageComponent } from 'src/app/manage/assistant-page/assistant-page.component';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { ExcelServicesService } from 'src/app/service/excel-services.service';
import { LeaderService } from 'src/app/service/leader-services.service';
import { PeriodService } from 'src/app/service/period-services.service';
import { ReportSummaryServiceService } from 'src/app/service/report-summary-service.service';
import { SummaryData } from '../../common/summary-model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  opened = false;
  minDate;
  maxDate;
  startDate;
  leaderId = 0;  //ALL
  astId = 0;     //ALL
  ast_initial;
  leaders= [];
  assistants= [];
  displayedColumns: string[] = ['leader', 'assistant', 'ITM', 'LAM', 'TAM', 'TM', 'IP', 'LAP', 'TP', 'CT', 'SK', 'TL', 'AL', 'unverified'];

  summary: SummaryData[] = [];
  dataSource = new MatTableDataSource<SummaryData>(this.summary);

  excel=[]; //Ini tempat simpen data yang mo di jadiin excel

  constructor(
    private periodService: PeriodService,
    private assistantService: AssistantService,
    private leaderService: LeaderService,
    private excelService: ExcelServicesService,
    private summaryService: ReportSummaryServiceService
  ) { 
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    this.periodService.GetPeriodById(period_id).subscribe(async data => {
      await this.insertDate(data);
    })

    this.assistantService.GetAllAssistant(period_id).subscribe(async data => {
      await this.insertAssistantData(data);
    });

    this.leaderService.GetAllLeader(period_id).subscribe(async data => {
      await this.insertLeaderData(data);
    });
  }

  insertDate(data){
    if(data.data.GetPeriodById != null){
      this.startDate = this.minDate = data.data.GetPeriodById.start;
      this.maxDate = data.data.GetPeriodById.end;
    }
  }
  
  insertAssistantData(data){
    console.log(data.data);
    if(data.data.GetAssistantByPeriodId != null){
      // var temp = {id: 0, initial: "ALL"};
      // this.assistants.push(temp)
      data.data.GetAssistantByPeriodId.forEach(element => {
        this.assistants.push(element)
      });
      // this.dataSource = new MatTableDataSource<SummaryData>(this.summary);
    }
  }
  
  insertLeaderData(data){
    console.log(data.data);
    if(data.data.GetLeaderByPeriodId != null){
      // var temp = {id: 0, initial: "ALL"};
      // this.leaders.push(temp);
      data.data.GetLeaderByPeriodId.forEach(element => {
        this.leaders.push(element)
      });
    }
  }

  viewData(){
    console.log("Test Masuk");
    console.log("Leader : " + this.leaderId );
    console.log("Assistant : " + this.astId );
    // this.assistantService.GetAssistantById(this.astId).subscribe(
    //   async data=>{
    //     await this.insertData(data);
    //   }
    // )

    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    if(this.leaderId == 0 && this.astId == 0){
      console.log("harusnya get all");
      this.summaryService.GetAllAttendanceSummary(period_id, this.minDate, this.startDate)
      .subscribe(
        async data=>{
          await this.insertSummaryData(data);
        }
      );
    }else if(this.leaderId == 0 || this.astId != 0){
      this.summaryService.GetAttendanceSummary(this.astId, this.minDate, this.startDate, period_id)
      .subscribe(
        async data=>{
          await this.insertSummaryDataAssistant(data);
        }
      );
    }else if(this.leaderId != 0 || this.astId == 0){
      this.summaryService.GetAllAttendanceSummaryByLeader(period_id, this.leaderId, this.minDate, this.startDate)
      .subscribe(
        async data=>{
          await this.insertSummaryDataLeader(data);
        }
      );
    }


    

    //Get Report by the astId
    // this.opened = true;
    
  }
  
  insertData(data){
    this.ast_initial = data.data.GetAssistantById.initial;
  }

  insertSummaryDataAssistant(data){
    console.log(data.data);
    if(data.data.GetAttendanceSummary != null){
      // try{
      //   data.data.GetAttendanceSummary.forEach(element => {
      //     this.summary.push(element);
      //   });
      // }catch{
        this.summary.push(data.data.GetAttendanceSummary);
      // }

      this.dataSource.data = this.summary;
      console.log(this.summary);
    }
    this.opened = true;
  }

  insertSummaryDataLeader(data){
    console.log(data.data);
    if(data.data.GetAllAssistantAttendanceSummaryByLeader != null){
      try{
        data.data.GetAllAssistantAttendanceSummaryByLeader.forEach(element => {
          this.summary.push(element);
        });
      }catch{
        this.summary.push(data.data.GetAllAssistantAttendanceSummaryByLeader);
      }

      this.dataSource.data = this.summary;
      console.log(this.summary);
    }
    this.opened = true;
  }

  insertSummaryData(data){
    console.log(data.data);
    if(data.data.GetAllAssistantAttendanceSummary != null){
      try{
        data.data.GetAllAssistantAttendanceSummary.forEach(element => {
          this.summary.push(element);
        });
      }catch{
        this.summary.push(data.data.GetAllAssistantAttendanceSummary);
      }

      this.dataSource.data = this.summary;
      console.log(this.summary);
    }
    this.opened = true;
  }

  isOpen(){
    return this.opened;
  }

  exportAsXLSX() {
    this.excel = this.summary;
    this.excelService.exportAsExcelFile(this.excel, 'sample');
 }

  getData(s){
    if(s==null){
      return 0;
    }else{
      return s;
    }
  }

  getSubjectData(s){
    if(s==null){
      return 0;
    }else{
      return "ALL";
    }
  }

}
