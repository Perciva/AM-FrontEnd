import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { UpdateAssistantDialogComponent } from 'src/app/manage/dialog/update-assistant-dialog/update-assistant-dialog.component';
import { ShiftService } from 'src/app/service/shift-services.service';

@Component({
  selector: 'app-update-shift-dialog',
  templateUrl: './update-shift-dialog.component.html',
  styleUrls: ['./update-shift-dialog.component.scss']
})
export class UpdateShiftDialogComponent {
  period_id;

  selectedDay;
  selectionDay = [
    {text: 'Monday', value: 1},
    {text: 'Tuesday', value: 2},
    {text: 'Wednesday', value: 3},
    {text: 'Thursday', value: 4},
    {text: 'Friday', value: 5},
    {text: 'Saturday', value: 6},
  ];

  selectedShift;
  selectionShift = [
    'Morning',
    'Night',
    'Custom',
  ];

  timeIn;
  timeOut;
  formDay;
  formShift;
  formTimeIn;
  formTimeOut;
  
  selection: [] = [];
  selected;

  ast_id;
  shift_id;

  constructor(public dialogRef: MatDialogRef<UpdateAssistantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data , private shiftService: ShiftService) { 
    this.formDay= new FormControl(data.shift.day, [Validators.required]);
    this.formShift= new FormControl("Custom", [Validators.required]);
    this.formTimeIn= new FormControl('', [Validators.required]);
    this.formTimeOut= new FormControl('', [Validators.required]);
    
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));

    this.ast_id = data.ast_id;
    this.shift_id = data.shift.id;
    console.log(data);

    this.selectedDay = data.shift.day;
    this.selectedShift = "Custom";
    this.timeIn = data.shift._in;
    this.timeOut = data.shift._out;
    console.log("Ast id " + this.ast_id + " >> Shift " + this.shift_id);
   }

  doUpdateShift(){
    var invalueArr = this.timeIn.split(':')
    var invalue = invalueArr[0]+invalueArr[1]+invalueArr[2]
    var outvalueArr = this.timeOut.split(':')
    var outvalue = outvalueArr[0]+outvalueArr[1]+outvalueArr[2]

    if(this.selectedDay == null || this.selectedShift == null ||
      (this.selectedShift == "Custom" && (this.timeIn == "" || this.timeOut == ""))
    ){
      alert("Some Field Empty");
    }else if(invalue > outvalue){
      alert("In Time must be before Out Time")
    }
    else{
      if(this.selectedShift == "Morning"){
        this.timeIn = "07:20:59"
        this.timeOut = "15:00:00"
      }
      else if(this.selectedShift == "Night"){
        this.timeIn = "11:20:59"
        this.timeOut = "19:00:00"
      }
      if(this.selectedDay == 6){
        if(this.selectedShift == "Morning"){
          this.timeOut = "13:00:00"
        }
        else if(this.selectedShift == "Night"){
          this.timeOut = "17:00:00"
        }
      }
      
      console.log("Day : " + this.selectedDay);
      console.log("Time In : " + this.timeIn);
      console.log("Time Out : " + this.timeOut);

      this.shiftService.UpdateShift (this.shift_id, this.ast_id, this.selectedDay, this.timeIn, this.timeOut)
      .subscribe(async data => {
        await this.dialogRef.close();
      });

    }
  }
  
  isSelectedCustom(){
    if(this.selectedShift == "Custom")
      return true;
    this.timeIn = '';
    this.timeOut = '';
    return false;  
  }


}
