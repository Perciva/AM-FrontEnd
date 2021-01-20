import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { ShiftService } from 'src/app/service/shift-services.service';

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
    'Night',
    'Custom',
  ];

  timeIn: string;
  timeOut: string;
  formDay;
  formShift;
  formTimeIn;
  formTimeOut;
  
  assistants: AssistantData[] = [];
  selected;

  constructor(public dialogRef: MatDialogRef<AddShiftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private assistantId: number,
    private assistantService: AssistantService,
    private shiftService: ShiftService) { 
    this.formDay= new FormControl('', [Validators.required]);
    this.formShift= new FormControl('', [Validators.required]);
    this.formTimeIn= new FormControl('', [Validators.required]);
    this.formTimeOut= new FormControl('', [Validators.required]);
    
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    this.assistantService.GetAllAssistant(this.period_id).subscribe(async data => {
      await this.insertAssistantData(data);
    });
    // this.retrieveNewShift();
   }
   
  insertAssistantData(data){
    console.log(data.data);
    if(data.data.GetAssistantByPeriodId != null){
      data.data.GetAssistantByPeriodId.forEach(element => {
         this.assistants.push(element)
      });
    }
  }

  doAddShift(){
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
      
      console.log(invalue + outvalue);
      console.log("Day : " + this.selectedDay);
      console.log("Time In : " + this.timeIn);
      console.log("Time Out : " + this.timeOut);

      this.shiftService.InsertShift (this.selected, this.selectedDay, this.timeIn, this.timeOut)
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
