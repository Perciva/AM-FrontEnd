import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-variable';
import { LeaderData } from 'src/app/common/leader-model';
import { LeaderService } from 'src/app/service/leader-services.service';
import { AddLeaderDialogComponent } from '../dialog/add-leader-dialog/add-leader-dialog.component';
import { UpdateLeaderDialogComponent } from '../dialog/update-leader-dialog/update-leader-dialog.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-leader-page',
  templateUrl: './leader-page.component.html',
  styleUrls: ['./leader-page.component.scss']
})
export class LeaderPageComponent implements OnInit{
  ELEMENT_DATA: LeaderData[] = [];
  mySub: any;
  period_id = -1;

  title= 'XlsRead';
  file:File;
  arrayBuffer:any;

  constructor(public dialog: MatDialog, private leaderService: LeaderService, private router: Router) {
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    console.log("Curr Period_Id: " + this.period_id);
    if(this.period_id == null){
      this.router.navigate(["/home"]);
    }
    this.mySub = this.leaderService.GetAllLeader(this.period_id).subscribe(async data => {
      await this.insertData(data);
    });
    
   }
   ngOnInit(){

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
      var first_sheet_name = "Leader";
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 

      arraylist.forEach(element => {
        var initial = element["Initial"];
        var leader = element["Name"];
        this.leaderService.InsertLeader(period_id, initial, leader).subscribe();
      });
      location.reload();
    }
  }

   insertData(data){
     console.log(data.data);
     if(data.data.GetLeaderByPeriodId != null){
       data.data.GetLeaderByPeriodId.forEach(element => {
          this.ELEMENT_DATA.push(element)
       });
        this.dataSource.data = this.ELEMENT_DATA;
     }
   }

  displayedColumns: string[] = ['initial', 'name', 'action'];
  dataSource = new MatTableDataSource<LeaderData>(this.ELEMENT_DATA);

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLeaderDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doUpdate(x){
    console.log(x);
    const dialogRef = this.dialog.open(UpdateLeaderDialogComponent, {
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
    console.log(x);
    this.leaderService.DeleteLeader(x).subscribe(async data => {
      await this.afterDelete(data);
    });
  }

  afterDelete(data){
    console.log(data)
    alert(data.data.DeleteLeader? "Delete Success":"Delete Failed");
    location.reload();
  }
}
