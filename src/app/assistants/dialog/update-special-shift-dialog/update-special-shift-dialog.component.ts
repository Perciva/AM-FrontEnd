
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { SpecialShiftData } from 'src/app/common/special-shift-model';

var moment = require('moment');
moment().format(); 

@Component({
  selector: 'app-update-special-shift-dialog',
  templateUrl: './update-special-shift-dialog.component.html',
  styleUrls: ['./update-special-shift-dialog.component.scss']
})
export class UpdateSpecialShiftDialogComponent{
  period_id;
  day;
  timeIn;
  timeOut;
  assistants;
  description;
  formDay;
  formTimeIn;
  formTimeOut;
  formAssistants;
  formDescription;

  constructor(public dialogRef: MatDialogRef<UpdateSpecialShiftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: SpecialShiftData
    ) { 
    this.formDay= new FormControl('', [Validators.required]);
    this.formTimeIn= new FormControl('', [Validators.required]);
    this.formTimeOut= new FormControl('', [Validators.required]);
    this.formAssistants = new FormControl('', [Validators.required]);
    this.formDescription = new FormControl('', [Validators.required]);
    this.period_id = data.period_id;
    this.day = data.date;
    this.timeIn = data._in;
    this.timeOut = data._out;
    this.assistants = data.assistant_ids;
    this.description = data.description;
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0;
  }

  doAddShift(){
    if(this.day == null || this.timeIn == null || this.timeOut == null || this.assistants == null || this.description == null){
      alert("Missing Values")
      return;
    }
    var start = moment(this.day).add(7, 'hours')._d;
    
    console.log("Period " + this.period_id)
    console.log("Day " + start)
    console.log("In " + this.timeIn)
    console.log("Out " + this.timeOut)
    console.log("Assistant " + this.assistants)
    console.log("Description " + this.description)
  }
}
