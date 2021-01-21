import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { HolidayData } from 'src/app/common/holiday-model';
import { HolidayServicesService } from 'src/app/service/holiday-services.service';

var moment = require('moment');
moment().format(); 
@Component({
  selector: 'app-update-holiday-dialog',
  templateUrl: './update-holiday-dialog.component.html',
  styleUrls: ['./update-holiday-dialog.component.scss']
})
export class UpdateHolidayDialogComponent implements OnInit {
  description: string;
  date;
  formDescription;
  formDate;
  err:any;

  constructor(public dialogRef: MatDialogRef<UpdateHolidayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private holidayData : HolidayData, 
    private holidayService: HolidayServicesService) {
      this.formDescription= new FormControl('', [Validators.required]);
      this.formDate= new FormControl('', [Validators.required]);
      this.description = holidayData.description;
      this.date = holidayData.date;
     }

  ngOnInit(): void {
  }

  doUpdateHoliday(){
    var holidayId = this.holidayData.id;
    if(this.formDescription.value == "null" || this.formDate.value == null){
      this.err = "Some Field Empty";
    }
    else{
      var exactDate = this.formatDate(this.date);
      console.log(exactDate)
      this.holidayService.UpdateHoliday(holidayId, this.formDescription.value, exactDate)
      .subscribe(async data => {
        await this.afterUpdate(data);
      });

    }
  }

  afterUpdate(data){
    console.log(data)
    if(data.data.UpdateHoliday != null && data.data.UpdateHoliday != "Success"){
      this.err = data.data.UpdateHoliday;
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
