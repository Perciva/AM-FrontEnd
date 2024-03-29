
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpecialShiftData } from 'src/app/common/special-shift-model';
import { SpecialShiftService } from 'src/app/service/special-shift-services.service';

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
  error;

  constructor(public dialogRef: MatDialogRef<UpdateSpecialShiftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: SpecialShiftData,
    private specialShiftService: SpecialShiftService
    ) { 
    this.formDay= new FormControl('', [Validators.required]);
    this.formTimeIn= new FormControl('', [Validators.required]);
    this.formTimeOut= new FormControl('', [Validators.required]);
    this.formAssistants = new FormControl('', [Validators.required]);
    this.formDescription = new FormControl('', [Validators.required]);
    this.period_id = data.period.id;
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

  doUpdateShift(){
    var invalueArr = this.timeIn.split(':')
    var invalue = invalueArr[0]+invalueArr[1]+invalueArr[2]
    var outvalueArr = this.timeOut.split(':')
    var outvalue = outvalueArr[0]+outvalueArr[1]+outvalueArr[2]

    this.error = [];
    if(this.day == null || this.timeIn == null || this.timeOut == null || this.assistants == null || this.description == null){
      this.error.push("Missing Values");
      return;
    }else if(invalue > outvalue){
      this.error.push("In Time must be before Out Time");
    }else{
      var start = moment(this.day).add(7, 'hours')._d;
      console.log("Period " + this.period_id)
      console.log("Day " + start)
      console.log("In " + this.timeIn)
      console.log("Out " + this.timeOut)
      console.log("Assistant " + this.assistants)
      console.log("Description " + this.description)

      this.specialShiftService.UpdateSpecialShift(this.data.id, this.period_id, this.description, this.assistants, start, this.timeIn, this.timeOut)
      .subscribe(
        async data =>{
          await this.afterInsert(data);
        }
        );
      }
    }
    
    afterInsert(data){
      if(data.data.UpdateSpecialShift != null && data.data.UpdateSpecialShift != "Success"){
        this.error = data.data.UpdateSpecialShift.split(",");
      }
      else{
        this.error = null;
        this.dialogRef.close();
      }
      
  }
}
