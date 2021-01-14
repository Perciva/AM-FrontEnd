import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { AssistantService } from 'src/app/service/assistant-services.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-assistant-page',
  templateUrl: './assistant-page.component.html',
  styleUrls: ['./assistant-page.component.scss']
})
export class AssistantPageComponent implements OnInit {
  title= 'XlsRead';
  file:File;
  arrayBuffer:any;
  fileList:any;
  
  ELEMENT_DATA: AssistantData[] = [];
  mySub: any;
  
  displayedColumns: string[] = ['initial', 'name', 'leader', 'action'];
  dataSource = new MatTableDataSource<AssistantData>(this.ELEMENT_DATA);
  
  constructor(private assistantService: AssistantService, public dialog: MatDialog, private router: Router) {   }

   ngOnInit(){
    var period_id = GlobalConstants.CURR_PERIOD == null ? -1 : GlobalConstants.CURR_PERIOD.id;
    console.log("Curr Period_Id: " + period_id);
    if(period_id < 1){
      this.router.navigate(["/home"]);
    }
    this.mySub = this.assistantService.GetAllAssistant(period_id).subscribe(async data => {
      await this.insertData(data);
    });

   }
   
   insertData(data){
    console.log(data.data);
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
      var period_id = GlobalConstants.CURR_PERIOD.id;
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = "Anak Bina";
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
      arraylist.forEach(element => {
        var initial = element["Full Initial"];
        var leader = element["Leader Initial"];
        var name = element["Nama"];
        console.log(element["AM_Format"])
        this.assistantService.InsertAssistant(period_id, 1, initial, name).subscribe(
          async data => {
          }
        )
      });

    }
  }

  
  openDialog(): void {
    // const dialogRef = this.dialog.open(AddLeaderDialogComponent, {
    //   width: '500px',
    //   data: {}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   location.reload();
    //   console.log('The dialog was closed');
    //   console.log(result)
    // });
  }

  doUpdate(x){
    console.log(x);
    // const dialogRef = this.dialog.open(UpdateLeaderDialogComponent, {
    //   width: '500px',
    //   data: x
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   location.reload();
    //   console.log('The dialog was closed');
    //   console.log(result)
    // });
  }

  doDelete(x){
    console.log(x);
    this.assistantService.DeleteAssistant(x).subscribe(async data => {
      await this.afterDelete(data);
    });
  }

  afterDelete(data){
    console.log(data)
    alert(data.data.DeleteAssistant? "Delete Success":"Delete Failed");
    location.reload();
  }
}
