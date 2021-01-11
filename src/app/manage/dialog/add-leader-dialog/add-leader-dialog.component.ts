import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaderService } from 'src/app/service/leader-services.service';

@Component({
  selector: 'app-add-leader-dialog',
  templateUrl: './add-leader-dialog.component.html',
  styleUrls: ['./add-leader-dialog.component.scss']
})
export class AddLeaderDialogComponent {

  initial: string;
  name: string;
  formInitial;
  formName;

  constructor(public dialogRef: MatDialogRef<AddLeaderDialogComponent>,
     private leaderService: LeaderService) { 
    this.formInitial= new FormControl('', [Validators.required]);
    this.formName= new FormControl('', [Validators.required]);
  }

  doAddLeader(){
    var period_id = 1;
    if(this.name == null || this.initial == null){
      alert("Some Field Empty");
    }
    this.leaderService.InsertLeader(period_id, this.initial, this.name)
    .subscribe(async data => {
      await this.dialogRef.close();
    });
  }

}
