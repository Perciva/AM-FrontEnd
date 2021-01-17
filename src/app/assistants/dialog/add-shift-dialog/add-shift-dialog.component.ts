import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';

@Component({
  selector: 'app-add-shift-dialog',
  templateUrl: './add-shift-dialog.component.html',
  styleUrls: ['./add-shift-dialog.component.scss']
})
export class AddShiftDialogComponent {
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
    'Normal',
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

  constructor(public dialogRef: MatDialogRef<AddShiftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private assistantId: number) { 
    this.formDay= new FormControl('', [Validators.required]);
    this.formShift= new FormControl('', [Validators.required]);
    this.formTimeIn= new FormControl('', [Validators.required]);
    this.formTimeOut= new FormControl('', [Validators.required]);
    
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
   }

  doAddShift(){
    if(this.selectedDay == null || this.selectedShift == null ||
       (this.selectedShift == "Custom" && (this.timeIn == "" || this.timeOut == ""))
      ){
      alert("Some Field Empty");
    }
    else{
      // this.assistantService.UpdateAssistant (this.assistantId, this.selected, this.initial, this.name)
      // .subscribe(async data => {
      //   await this.dialogRef.close();
      // });

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
