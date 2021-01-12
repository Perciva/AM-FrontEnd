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

  constructor(public dialogRef: MatDialogRef<AddLeaderDialogComponent>,
     private leaderService: LeaderService) { 
    this.formInitial= new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    this.formName= new FormControl('', [Validators.required]);
  }

  doAddLeader(){
    var period_id = GlobalConstants.CURR_PERIOD.id;
    if(this.name == null || this.initial == null){
      alert("Some Field Empty");
    }
    else if(this.initial.length != 6){
      alert("Initial must 6 character");
    }
    else{
      this.leaderService.InsertLeader(period_id, this.initial, this.name)
      .subscribe(async data => {
        await this.dialogRef.close();
      });

    }
  }

}
