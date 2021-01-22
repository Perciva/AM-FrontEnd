import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { PeriodService } from 'src/app/service/period-services.service';


var moment = require('moment');
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

  err;

  constructor(public dialogRef: MatDialogRef<AddPeriodDialogComponent>,
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
    this.err = null;
    var period;
    if(
        this.thisPeriod == null ||
        this.startDate.value == "" || 
        this.endDate.value == "" ||
        (this.thisPeriod==="Other" && this.thisOther == null) ||
        (this.thisPeriod != null && this.thisPeriod !="Other" && this.thisYear == null) 
      ){
        this.err = "Some Field Empty";
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

  isErr(){
    return this.err != null;
  }

}
