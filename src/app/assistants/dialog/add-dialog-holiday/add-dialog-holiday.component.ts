import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { HolidayServicesService } from 'src/app/service/holiday-services.service';

var moment = require('moment');
moment().format(); 
@Component({
  selector: 'app-add-dialog-holiday',
  templateUrl: './add-dialog-holiday.component.html',
  styleUrls: ['./add-dialog-holiday.component.scss']
})
export class AddDialogHolidayComponent implements OnInit {
  description: string;
  date: string;
  formDescription;
  formDate;
  err:any;

  constructor(public dialogRef: MatDialogRef<AddDialogHolidayComponent>,
    private holidayService: HolidayServicesService) {
      this.formDescription= new FormControl('', [Validators.required]);
      this.formDate= new FormControl('', [Validators.required]);
     }

  ngOnInit(): void {
  }

  doAddHoliday(){
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    this.err = null;
    if(this.description == null || this.formDate.value == null){
      this.err = "Some Field Empty";
    }
    else{
      var exactDate = this.formatDate(this.date);
      // // moment(this.date).add(7, 'hours')._d;
      // var temp = exactDate.split("T");
      console.log(exactDate)
      this.holidayService.InsertHoliday(period_id, this.description, exactDate)
      .subscribe(async data => {
        await this.afterInsert(data);
      });

    }
  }
  // Holiday with date 2021-12-12T00:00:00.000Z Already Exists!
  afterInsert(data){
    console.log(data)
    if(data.data.InsertHoliday != null && data.data.InsertHoliday != "Success"){
      this.err = data.data.InsertHoliday;
      return;
    }
    this.dialogRef.close();
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
