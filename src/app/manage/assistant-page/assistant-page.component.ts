import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { LeaderService } from 'src/app/service/leader-services.service';
import * as XLSX from 'xlsx';
import { AddAssistantDialogComponent } from '../dialog/add-assistant-dialog/add-assistant-dialog.component';
import { UpdateAssistantDialogComponent } from '../dialog/update-assistant-dialog/update-assistant-dialog.component';

@Component({
  selector: 'app-assistant-page',
  templateUrl: './assistant-page.component.html',
  styleUrls: ['./assistant-page.component.scss']
})
export class AssistantPageComponent implements OnInit {
  title= 'XlsRead';
  file:File;
  arrayBuffer:any;
  
  ELEMENT_DATA: AssistantData[] = [];
  mySub: any;
  
  displayedColumns: string[] = ['initial', 'name', 'leader', 'action'];
  dataSource = new MatTableDataSource<AssistantData>(this.ELEMENT_DATA);
  
  error;
  
  constructor(private assistantService: AssistantService, public dialog: MatDialog,
     private router: Router, private leaderService: LeaderService) {   }

   ngOnInit(){
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    // console.log("Curr Period_Id: " + period_id);
    if(period_id < 1){
      this.router.navigate(["/home"]);
    }
    this.mySub = this.assistantService.GetAllAssistant(period_id).subscribe(async data => {
      await this.insertData(data);
    });

   }
   
   insertData(data){
    // console.log(data.data);
    if(data.data.GetAssistantByPeriodId != null){
      data.data.GetAssistantByPeriodId.forEach(element => {
         this.ELEMENT_DATA.push(element)
      });
       this.dataSource.data = this.ELEMENT_DATA;
    }
  }

  addfile(event) {
    this.file= event.target.files[0]; 
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file); 
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = "Anak Bina";
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
      var initial = [];
      var leader = [];
      var name = [];

      arraylist.forEach(element => {
        var temp = element["Leader Initial + Gen"];
        initial.push(element["Initial + Gen"]);
        leader.push(temp);
        name.push(element["Name"]);
        
      });
      
      this.FLAG_DONE= 1;
      this.CURR_PROG= 0;
      this.error = [];
      for(var i = 0; i < initial.length; i++){
        this.CURR_PROG++;
        this.assistantService.InsertAssistantByLeaderInitial(period_id,leader[i], initial[i], name[i]).subscribe(
          async data =>{
            await this.removeFlag(data)
          }
        );
      }
      this.FLAG_DONE = 0;
    }
  }

  CURR_PROG = 0;
  FLAG_DONE = 0;

  removeFlag(data){
    this.CURR_PROG--;
    if(data.data.InsertAssistantByLeaderInitial != null && data.data.InsertAssistantByLeaderInitial !="Success"){
      this.error.push(data.data.InsertAssistantByLeaderInitial);
    }

    if(this.FLAG_DONE == 0 && this.CURR_PROG==0 && this.error.length == 0){
      this.error = null;
      location.reload();
    }

  }

  isErr(){
    return this.error != null;
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddAssistantDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      // console.log('The dialog was closed');
      // console.log(result)
    });
  }

  doUpdate(x){
    // console.log(x);
    const dialogRef = this.dialog.open(UpdateAssistantDialogComponent, {
      width: '500px',
      data: x
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doDelete(x){
    // console.log(x);
    this.assistantService.DeleteAssistant(x).subscribe(async data => {
      await this.afterDelete(data);
    });
  }

  afterDelete(data){
    // console.log(data)
    alert(data.data.DeleteAssistant? "Delete Success":"Delete Failed");
    location.reload();
  }
}
