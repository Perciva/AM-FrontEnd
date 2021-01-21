import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { PeriodData } from 'src/app/common/period-model';
import { PeriodService } from 'src/app/service/period-services.service';

var moment = require('moment');
moment().format(); 

@Component({
  selector: 'app-update-period-dialog',
  templateUrl: './update-period-dialog.component.html',
  styleUrls: ['./update-period-dialog.component.scss']
})

export class UpdatePeriodDialogComponent {
  selectedPeriod;
  otherPeriod;
  selectedYear;
  startDate;
  endDate;

  thisPeriod;
  thisOther;
  thisYear;

  years: String[] = GlobalConstants.YEAR;

  constructor(
    public dialogRef: MatDialogRef<UpdatePeriodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private periodData: PeriodData, private periodService: PeriodService) {
      this.selectedPeriod= new FormControl('', [Validators.required]);
      this.otherPeriod= new FormControl('', [Validators.required]);
      this.selectedYear= new FormControl('', [Validators.required]);
      this.startDate= new FormControl(periodData.start, [Validators.required]);
      this.endDate= new FormControl(periodData.end, [Validators.required]);
      this.thisPeriod = "Other";
      this.thisOther = periodData.description;
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
  
    doUpdatePeriod(){
      var period;
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
      console.log(start)
  
      this.periodService.UpdatePeriods(this.periodData.id, period, start, end).
      subscribe(async data => {
        await this.afterUpdate(data);
      });

    }

    afterUpdate(data){
      alert(data.data.UpdatePeriod? "Update Success":"Update Failed");
      location.reload();
    } 

}