import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaderService } from 'src/app/service/leader-services.service';
import { LeaderData } from '../../leader-page/leader-page.component';

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

  constructor(public dialogRef: MatDialogRef<UpdateLeaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private leaderData: LeaderData, 
     private leaderService: LeaderService) { 
    this.formInitial= new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    this.formName= new FormControl('', [Validators.required]);
  }

  doUpdateLeader(){
    var period_id = this.leaderData.id;
    if(this.name == null || this.initial == null){
      alert("Some Field Empty");
    }
    else if(this.initial.length != 6){
      alert("Initial must 6 character");
    }
    else{
      this.leaderService.UpdateLeader(period_id, this.initial, this.name)
      .subscribe(async data => {
        await this.dialogRef.close();
      });
    }
  }

  afterUpdate(data){
    alert(data.data.UpdatePeriod? "Update Success":"Update Failed");
    location.reload();
  } 
}
