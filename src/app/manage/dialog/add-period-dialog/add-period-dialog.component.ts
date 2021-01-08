import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';import { PeriodService } from 'src/app/service/period-services.service';
import { PeriodData } from '../../period-page/period-page.component'

var moment = require('moment'); // require
moment().format(); 

@Component({
  selector: 'app-add-period-dialog',
  templateUrl: './add-period-dialog.component.html',
  styleUrls: ['./add-period-dialog.component.scss']
})
export class AddPeriodDialogComponent{
  selectedPeriod;
  otherPeriod;
  selectedYear;
  startDate;
  endDate;

  thisPeriod;
  thisOther;
  thisYear;

  years: String[] = [
    "2023-2024",
    "2022-2023",
    "2021-2022",
    "2020-2021",
    "2019-2020",
    "2018-2019",
  ];

  constructor(public dialogRef: MatDialogRef<AddPeriodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodData, 
    private periodService: PeriodService) {
        this.selectedPeriod= new FormControl('', [Validators.required]);
        this.otherPeriod= new FormControl('', [Validators.required]);
        this.selectedYear= new FormControl('', [Validators.required]);
        this.startDate= new FormControl('', [Validators.required]);
        this.endDate= new FormControl('', [Validators.required]);
    }

  isOtherPeriod(): boolean{
    if(this.thisPeriod == "Other")
      return true;
    this.thisOther = null;
    return false;
  }

  isSelectedPeriod(): boolean{
    if(this.thisPeriod != null && this.thisPeriod != "Other")
      return true;
    return false;
  }

  doAddPeriod(){
    var period;
    console.log("Period " + this.thisPeriod)
    console.log("Year " + this.thisYear)
    console.log("Other " + this.thisOther)
    console.log("Start " + this.startDate.value)
    console.log("End " + this.endDate.value)
    console.log("===================")
    if(
        this.thisPeriod == null ||
        this.startDate.value == "" || 
        this.endDate.value == "" ||
        (this.thisPeriod==="Other" && this.thisOther == null) ||
        (this.thisPeriod != null && this.thisPeriod !="Other" && this.thisYear == null) 
      ){
        alert("Some Field Empty");
      return;
    }

    if(this.thisPeriod==="Other"){
      period = this.thisOther;
    }
    else{
      period = this.thisPeriod + ", " + this.thisYear;
    }

    var start = moment(this.startDate.value).add(7, 'hours')._d;
    var end = moment(this.endDate.value).add(7, 'hours')._d;

    this.periodService.InsertPeriods(period, start, end).
    subscribe(async data => {
      await this.dialogRef.close();
    });

    
  }

}
