import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { GlobalConstants } from 'src/app/common/global-variable';
import { HolidayData } from 'src/app/common/holiday-model';
import { HolidayServicesService } from 'src/app/service/holiday-services.service';
import { AddDialogHolidayComponent } from '../dialog/add-dialog-holiday/add-dialog-holiday.component';
import { UpdateHolidayDialogComponent } from '../dialog/update-holiday-dialog/update-holiday-dialog.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  title= 'XlsRead';
  file:File;
  arrayBuffer:any;

  ELEMENT_DATA: HolidayData[] = [];
  mySub: any;
  period_id = -1;

  constructor(public dialog: MatDialog, private holidayService: HolidayServicesService, private router: Router) { 
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    console.log("Curr Period_Id: " + this.period_id);
    if(this.period_id == null){
      this.router.navigate(["/home"]);
    }
    this.mySub = this.holidayService.GetAllHoliday(this.period_id).subscribe(async data => {
      await this.insertData(data);
    });
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['date', 'description', 'action'];
  dataSource = new MatTableDataSource<HolidayData>(this.ELEMENT_DATA);

  insertData(data){
    console.log(data.data);
    if(data.data.GetHolidayByPeriodId != null){
      data.data.GetHolidayByPeriodId.forEach(element => {
         this.ELEMENT_DATA.push(element)
      });
       this.dataSource.data = this.ELEMENT_DATA;
       console.log(this.ELEMENT_DATA);
    }
  }

  
  addfile(event) {
    if(this.FLAG_DONE == 0){
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
        var first_sheet_name = "Holiday";
        var worksheet = workbook.Sheets[first_sheet_name];
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
        var description = [];
        var date = [];
  
        arraylist.forEach(element => {
          description.push(element["Description"]);
          date.push(element["Year"] + "-" + element["Month"] + "-" + element["Day"]);
        });

        this.FLAG_DONE= 1;
        this.CURR_PROG= 0;
        for(var i = 0; i < description.length; i++){
          console.log(date[i]);
          date[i] = this.formatDate(date[i]);
          console.log(date[i]);
          this.CURR_PROG++;
          this.holidayService.InsertHoliday(period_id, description[i], date[i]).subscribe(
            async data =>{
              await this.removeFlag()
            }
          );
        }
        this.FLAG_DONE = 0;
      }
    }
  }

  CURR_PROG = 0;
  FLAG_DONE = 0;

  removeFlag(){
    this.CURR_PROG--;
    if(this.FLAG_DONE == 0 && this.CURR_PROG==0){
      location.reload();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogHolidayComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doDelete(x){
    console.log(x);
    this.holidayService.DeleteHoliday(x).subscribe(async data => {
      await this.afterDelete(data);
    });
  }

  afterDelete(data){
    console.log(data)
    alert(data.data.DeleteHoliday? "Delete Success":"Delete Failed");
    location.reload();
  }

  doUpdate(x){
    console.log(x);
    const dialogRef = this.dialog.open(UpdateHolidayDialogComponent, {
      width: '500px',
      data: x
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
