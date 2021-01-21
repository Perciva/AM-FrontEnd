import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { LeaderData } from 'src/app/common/leader-model';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { LeaderService } from 'src/app/service/leader-services.service';

@Component({
  selector: 'app-add-assistant-dialog',
  templateUrl: './add-assistant-dialog.component.html',
  styleUrls: ['./add-assistant-dialog.component.scss']
})
export class AddAssistantDialogComponent {

  initial: string;
  name: string;
  formInitial;
  formName;
  formLeader;
  
  selection: LeaderData[] = [];
  selected;

  error;

  constructor(public dialogRef: MatDialogRef<AddAssistantDialogComponent>,
     private assistantService: AssistantService, private leaderService: LeaderService) { 
    this.formInitial= new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    this.formName= new FormControl('', [Validators.required]);
    this.formLeader= new FormControl('', [Validators.required]);
    
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    leaderService.GetAllLeader(period_id).subscribe(async data => {
      await this.insertData(data);
    });
   }

   insertData(data){
     console.log(data.data)
     data.data.GetLeaderByPeriodId.forEach(element => {
       this.selection.push(element)
     });
     this.selection.reverse();
   }

  doAddAssistant(){
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    console.log(period_id);
    if(this.name == null || this.initial == null|| this.selected == null){
      alert("Some Field Empty");
    }
    else if(this.initial.length != 6){
      alert("Initial must 6 character");
    }
    else{
      this.assistantService.InsertAssistant(period_id, this.selected, this.initial, this.name)
      .subscribe(async data => {
        await this.afterInsert(data);
      });

    }
  }

  afterInsert(data){
    this.error = null;
    if(data.data.InsertAssistant != null && data.data.InsertAssistant != "Success"){
      this.error = data.data.InsertAssistant;
      return;
    }
    this.dialogRef.close();
  }

  isErr(){
    return this.error != null;
  }

}
