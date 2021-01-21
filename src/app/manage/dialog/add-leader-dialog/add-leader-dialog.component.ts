import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';
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
  error;

  constructor(public dialogRef: MatDialogRef<AddLeaderDialogComponent>,
     private leaderService: LeaderService) { 
    this.formInitial= new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    this.formName= new FormControl('', [Validators.required]);
  }

  doAddLeader(){
    this.error = null;
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    if(this.name == null || this.initial == null){
      this.error = "Some Field Empty";
    }
    else{
      this.leaderService.InsertLeader(period_id, this.initial, this.name)
      .subscribe(async data => {
        await this.afterInsert(data);
      });

    }
  }

  afterInsert(data){
    if(data.data.InsertLeader != null && data.data.InsertLeader != "Success"){
      this.error = data.data.InsertLeader;
      return;
    }

    this.dialogRef.close();
  }

  isErr(){
    return this.error != null;
  }

}
