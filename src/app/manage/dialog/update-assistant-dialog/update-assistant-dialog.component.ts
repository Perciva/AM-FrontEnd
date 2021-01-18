import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { LeaderData } from 'src/app/common/leader-model';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { LeaderService } from 'src/app/service/leader-services.service';

@Component({
  selector: 'app-update-assistant-dialog',
  templateUrl: './update-assistant-dialog.component.html',
  styleUrls: ['./update-assistant-dialog.component.scss']
})
export class UpdateAssistantDialogComponent{

  initial: string;
  name: string;
  formInitial;
  formName;
  formLeader;
  
  selection: LeaderData[] = [];
  selected;

  constructor(public dialogRef: MatDialogRef<UpdateAssistantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private assistantData: AssistantData, 
     private assistantService: AssistantService, private leaderService: LeaderService) { 
    this.formInitial= new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    this.formName= new FormControl('', [Validators.required]);
    this.formLeader= new FormControl('', [Validators.required]);

    this.initial = assistantData.initial;
    this.name = assistantData.name;
    
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

  doUpdateAssistant(){
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    console.log(period_id);
    if(this.name == null || this.initial == null|| this.selected == null){
      alert("Some Field Empty");
    }
    else if(this.initial.length != 6){
      alert("Initial must 6 character");
    }
    else{
      this.assistantService.UpdateAssistant (this.assistantData.id, this.selected, this.initial, this.name)
      .subscribe(async data => {
        await this.dialogRef.close();
      });

    }
  }

}
