import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { SpecialShiftService } from 'src/app/service/special-shift-services.service';

var moment = require('moment');
moment().format(); 

@Component({
  selector: 'app-add-special-shift-dialog',
  templateUrl: './add-special-shift-dialog.component.html',
  styleUrls: ['./add-special-shift-dialog.component.scss']
})
export class AddSpecialShiftDialogComponent {
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
  error;

  constructor(public dialogRef: MatDialogRef<AddSpecialShiftDialogComponent>,
    private specialShiftService: SpecialShiftService
    ) { 
    this.formDay= new FormControl('', [Validators.required]);
    this.formTimeIn= new FormControl('', [Validators.required]);
    this.formTimeOut= new FormControl('', [Validators.required]);
    this.formAssistants = new FormControl('', [Validators.required]);
    this.formDescription = new FormControl('', [Validators.required]);
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0;
  }

  doAddShift(){
    
    this.error = [];
    if(this.day == null || this.timeIn == null || this.timeOut == null || this.assistants == null || this.description == null){
      this.error.push("Some Field Empty");
    }else if(invalue > outvalue){
      this.error.push("In Time must be before Out Time");
    }
    else{
      var invalueArr = this.timeIn.split(':');
      var invalue = invalueArr[0]+invalueArr[1]+invalueArr[2];
      var outvalueArr = this.timeOut.split(':');
      var outvalue = outvalueArr[0]+outvalueArr[1]+outvalueArr[2];
      var start = moment(this.day).add(7, 'hours')._d;
      
      console.log("Period " + this.period_id)
      console.log("Day " + start)
      console.log("In " + this.timeIn)
      console.log("Out " + this.timeOut)
      console.log("Assistant " + this.assistants)
      console.log("Description " + this.description)
  
      this.specialShiftService.InsertSpecialShift(this.period_id, this.description, this.assistants, start, this.timeIn, this.timeOut)
      .subscribe(
        async data =>{
          this.afterInsert(data);
        }
        );  
      }
    }
    
  afterInsert(data){
    console.log(data.data.InsertSpecialShift)
    if(data.data.InsertSpecialShift != null && data.data.InsertSpecialShift != "Success"){
      this.error.push(data.data.InsertSpecialShift);
    }
    else{
      this.error = null;
      this.dialogRef.close();
    }
  }

}
