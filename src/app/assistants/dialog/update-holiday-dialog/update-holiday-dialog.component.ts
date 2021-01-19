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
  date: string;
  formDescription;
  formDate;

  constructor(public dialogRef: MatDialogRef<UpdateHolidayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private holidayData : HolidayData, 
    private holidayService: HolidayServicesService) {
      this.formDescription= new FormControl('', [Validators.required]);
      this.formDate= new FormControl('', [Validators.required]);
     }

  ngOnInit(): void {
  }

  doUpdateHoliday(){
    var holidayId = this.holidayData.id;
    if(this.formDescription.value == null || this.formDate.value == null){
      alert("Some Field Empty");
    }
    else{
      var exactDate = moment(this.formDate.value).add(7, 'hours')._d;
      this.holidayService.UpdateHoliday(holidayId, this.formDescription.value, exactDate)
      .subscribe(async data => {
        await this.dialogRef.close();
      });

    }
  }


}
