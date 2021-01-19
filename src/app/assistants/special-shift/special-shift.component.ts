import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-variable';
import { SpecialShiftData } from 'src/app/common/special-shift-model';
import { AddSpecialShiftDialogComponent } from '../dialog/add-special-shift-dialog/add-special-shift-dialog.component';
import { UpdateSpecialShiftDialogComponent } from '../dialog/update-special-shift-dialog/update-special-shift-dialog.component';

@Component({
  selector: 'app-special-shift',
  templateUrl: './special-shift.component.html',
  styleUrls: ['./special-shift.component.scss']
})
export class SpecialShiftComponent{
  ELEMENT_DATA: SpecialShiftData[] = [
    {id: 1, period_id: 1, date:"2021-06-10", _in: "09:05:00", _out: "17:00:00", assistant_ids: "ALL", description: "Testing"},
    {id: 2, period_id: 1, date:"2021-06-12", _in: "09:05:00", _out: "17:00:00", assistant_ids: "JE19-2,MV19-2,EV19-1", description: "Testing"},
    {id: 3, period_id: 1, date:"2021-06-13", _in: "09:05:00", _out: "17:00:00", assistant_ids: "ALL", description: "Testing"},
    {id: 4, period_id: 1, date:"2021-06-14", _in: "09:05:00", _out: "17:00:00", assistant_ids: "ALL", description: "Testing"},
    {id: 5, period_id: 1, date:"2021-06-15", _in: "09:05:00", _out: "17:00:00", assistant_ids: "ALL", description: "Testing"},
    {id: 6, period_id: 1, date:"2021-06-16", _in: "09:05:00", _out: "17:00:00", assistant_ids: "ALL", description: "Testing"},
    {id: 7, period_id: 1, date:"2021-06-17", _in: "09:05:00", _out: "17:00:00", assistant_ids: "ALL", description: "Testing"},
  ];
  mySub: any;
  period_id = -1;

  constructor(public dialog: MatDialog, private router: Router) { 
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    console.log("Curr Period_Id: " + this.period_id);
    if(this.period_id == null){
      this.router.navigate(["/home"]);
    }
    // this.mySub = this.holidayService.GetAllHoliday(this.period_id).subscribe(async data => {
    //   await this.insertData(data);
    // });
  }

  displayedColumns: string[] = ['date', 'in', 'out', 'assistants', 'description', 'action'];
  dataSource = new MatTableDataSource<SpecialShiftData>(this.ELEMENT_DATA);

  insertData(data){
    console.log(data.data);
    // if(data.data.GetHolidayByPeriodId != null){
    //   data.data.GetHolidayByPeriodId.forEach(element => {
    //      this.ELEMENT_DATA.push(element)
    //   });
    //    this.dataSource.data = this.ELEMENT_DATA;
    // }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSpecialShiftDialogComponent, {
      width: '500px',
      maxHeight: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doDelete(x){
    console.log(x);
    // this.holidayService.DeleteHoliday(x).subscribe(async data => {
    //   await this.afterDelete(data);
    // });
  }

  afterDelete(data){
    console.log(data)
    alert(data.data.DeleteHoliday? "Delete Success":"Delete Failed");
    location.reload();
  }

  doUpdate(x){
    console.log(x);
    const dialogRef = this.dialog.open(UpdateSpecialShiftDialogComponent, {
      width: '500px',
      maxHeight: '600px',
      data: x
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
