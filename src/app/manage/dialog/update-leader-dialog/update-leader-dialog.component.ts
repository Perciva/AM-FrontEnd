import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
import { LeaderData } from 'src/app/common/leader-model';
import { LeaderService } from 'src/app/service/leader-services.service';

@Component({
  selector: 'app-update-leader-dialog',
  templateUrl: './update-leader-dialog.component.html',
  styleUrls: ['./update-leader-dialog.component.scss']
})
export class UpdateLeaderDialogComponent {

  initial: string;
  name: string;
  formInitial;
  formName;

  error;

  constructor(public dialogRef: MatDialogRef<UpdateLeaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private leaderData: LeaderData, 
     private leaderService: LeaderService) { 
    this.formInitial= new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    this.formName= new FormControl('', [Validators.required]);
    this.initial = leaderData.initial;
    this.name = leaderData.name;
  }

  doUpdateLeader(){
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    var id = this.leaderData.id;
    if(this.name == null || this.initial == null){
      alert("Some Field Empty");
    }
    else if(this.initial.length != 6){
      alert("Initial must 6 character");
    }
    else{
      this.leaderService.UpdateLeader(id, period_id, this.initial, this.name)
      .subscribe(async data => {
        await this.afterUpdate(data);
      });
    }
  }

  afterUpdate(data){
    this.error = null;
    if(data.data.UpdateLeader != null && data.data.UpdateLeader != "Success"){
      this.error = data.data.UpdateLeader;
      return;
    }
    location.reload();
  } 

  isErr(){
    return this.error != null;
  }
}
