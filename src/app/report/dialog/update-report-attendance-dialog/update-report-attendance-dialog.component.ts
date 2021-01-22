import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportAttendanceService } from '../../../service/report-attendance-services.service';

@Component({
  selector: 'app-update-report-attendance-dialog',
  templateUrl: './update-report-attendance-dialog.component.html',
  styleUrls: ['./update-report-attendance-dialog.component.scss']
})
export class UpdateReportAttendanceDialogComponent{

  error;

  in_permission = "";
  in_permission_desc;
  in_permissions = [
    { key: "", value: "-" },
    { key: "IT", value: "Izin Telat Masuk" },
    { key: "LM", value: "Lupa Absen Masuk" },
    { key: "TM", value: "Telat Absen Masuk" },
    { key: "TL", value: "Toleransi Masuk" },
  ]

  out_permission = "";
  out_permission_desc;
  out_permissions = [
    { key: "", value: "-" },
    { key: "IP", value: "Izin Pulang" },
    { key: "LP", value: "Lupa Absen Pulang" },
    { key: "TL", value: "Toleransi Pulang" },
  ]

  special_permission = "";
  special_permission_desc;
  special_permissions = [
    { key: "", value: "-" },
    { key: "CT", value: "Cuti" },
    { key: "SK", value: "Sakit" },
    { key: "AP", value: "Alpha" },
    { key: "TL", value: "Toleransi" },
  ]

  constructor(
    public dialogRef: MatDialogRef<UpdateReportAttendanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private reportAttendanceService: ReportAttendanceService,
  ) {
    console.log(data);
    this.in_permission = data.in_permission;
    this.out_permission = data.out_permission;
    this.special_permission = data.special_permission;
    this.in_permission_desc = data.in_permission_description;
    this.out_permission_desc = data.out_permission_description;
    this.special_permission_desc = data.special_permission_description;
  }

  doUpdateReport(){
    var id = this.data.id;
    if(this.in_permission != "" && this.in_permission_desc == ""){
      this.error = "Fill In Permission Desc";
      return;
    }
    if(this.out_permission != "" && this.out_permission_desc == ""){
      this.error = "Fill Out Permission Desc";
      return;
    }
    if(this.special_permission != "" && this.special_permission_desc == ""){
      this.error = "Fill Special Permission Desc";
      return;
    }

    this.reportAttendanceService.UpdateAttendance(id, 
      this.in_permission, this.out_permission, this.special_permission, 
      this.in_permission_desc, this.out_permission_desc, this.special_permission_desc)
    .subscribe(async data => {
      await this.afterUpdate(data);
    });
  }
  
  afterUpdate(data){
    this.error = null;
    console.log(data.data);
    if(data.data.UpdateAssistant != null && data.data.UpdateAssistant != "Success"){
      this.error = data.data.UpdateAssistant;
      return;
    }

    this.dialogRef.close();
  }

  isErr(){
    return this.error != null;
  }
}
