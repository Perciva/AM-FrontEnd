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

  constructor(public dialogRef: MatDialogRef<AddDialogHolidayComponent>,
    private holidayService: HolidayServicesService) {
      this.formDescription= new FormControl('', [Validators.required]);
      this.formDate= new FormControl('', [Validators.required]);
     }

  ngOnInit(): void {
  }

  doAddHoliday(){
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    if(this.description == null || this.formDate.value == null){
      alert("Some Field Empty");
    }
    else{
      var exactDate = moment(this.formDate.value).add(7, 'hours')._d;
      this.holidayService.InsertHoliday(period_id, this.description, exactDate)
      .subscribe(async data => {
        await this.dialogRef.close();
      });

    }
  }

}
