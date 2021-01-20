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
  dataSource = new MatTableDataSource<AssistantData>(this.assistants);

  excel=[]; //Ini tempat simpen data yang mo di jadiin excel

  constructor(
    private periodService: PeriodService,
    private assistantService: AssistantService,
    private leaderService: LeaderService,
    private excelService: ExcelServicesService,
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
      this.dataSource = new MatTableDataSource<AssistantData>(this.assistants);
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

    //Get Report by the astId
    this.opened = true;
    
  }
  
  insertData(data){
    // this.ast_initial = data.data.GetAssistantById.initial;
  }

  isOpen(){
    return this.opened;
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.excel, 'sample');
 }

}
