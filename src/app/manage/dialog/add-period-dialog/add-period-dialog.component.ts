import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';3
import { PeriodData } from '../../period-page/period-page.component'

@Component({
  selector: 'app-add-period-dialog',
  templateUrl: './add-period-dialog.component.html',
  styleUrls: ['./add-period-dialog.component.scss']
})
export class AddPeriodDialogComponent{
  selectedPeriod: string;
  otherPeriod: string;
  selectedYear: string;
  addPeriodGroup: FormGroup;
  startDate = new FormControl('');
  endDate = new FormControl('');

  years: String[] = [
    "2023-2024",
    "2022-2023",
    "2021-2022",
    "2020-2021",
    "2019-2020",
    "2018-2019",
  ];

  constructor(public dialogRef: MatDialogRef<AddPeriodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodData, fb: FormBuilder) {
      this.addPeriodGroup = fb.group({
        periods: new FormControl('', [Validators.required]),
        otherPeriod: new FormControl('', [Validators.required]),
        selectedYear: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
      });
    }

  isOtherPeriod(): boolean{
    if(this.selectedPeriod === "Other")
      return true;
    this.otherPeriod = null;
    return false;
  }

  isSelectedPeriod(): boolean{
    if(this.selectedPeriod == null || this.selectedPeriod === "Other")
      return false;
    return true;
  }

  doAddPeriod(){
    var period;
    if(
      this.selectedPeriod == null ||
      this.startDate.value == "" || 
      this.endDate.value == "" ||
      (this.selectedPeriod==="Other" && this.otherPeriod == null) ||
      (this.selectedPeriod != null && this.selectedPeriod !="Other" && this.selectedYear == null)
      ){
        alert("Some Field Empty");
      return;
    }

    if(this.selectedPeriod==="Other"){
      period = this.otherPeriod;
    }
    else{
      if(this.years != null){
        period = this.selectedPeriod + ", " + this.years;
      }
    }
    
    

    this.dialogRef.close();
  }
}
