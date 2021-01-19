import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-variable';
import { HolidayData } from 'src/app/common/holiday-model';
import { HolidayServicesService } from 'src/app/service/holiday-services.service';
import { DialogHolidayComponent } from '../dialog/dialog-holiday/dialog-holiday.component';
import { UpdateHolidayDialogComponent } from '../dialog/update-holiday-dialog/update-holiday-dialog.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  ELEMENT_DATA: HolidayData[] = [];
  mySub: any;
  period_id = -1;

  constructor(public dialog: MatDialog, private holidayService: HolidayServicesService, private router: Router) { 
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    console.log("Curr Period_Id: " + this.period_id);
    if(this.period_id == null){
      this.router.navigate(["/home"]);
    }
    this.mySub = this.holidayService.GetAllHoliday(this.period_id).subscribe(async data => {
      await this.insertData(data);
    });
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['date', 'description', 'action'];
  dataSource = new MatTableDataSource<HolidayData>(this.ELEMENT_DATA);

  insertData(data){
    console.log(data.data);
    if(data.data.GetHolidayByPeriodId != null){
      data.data.GetHolidayByPeriodId.forEach(element => {
         this.ELEMENT_DATA.push(element)
      });
       this.dataSource.data = this.ELEMENT_DATA;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogHolidayComponent, {
      width: '500px',
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
    this.holidayService.DeleteHoliday(x).subscribe(async data => {
      await this.afterDelete(data);
    });
  }

  afterDelete(data){
    console.log(data)
    alert(data.data.DeleteHoliday? "Delete Success":"Delete Failed");
    location.reload();
  }

  doUpdate(x){
    console.log(x);
    const dialogRef = this.dialog.open(UpdateHolidayDialogComponent, {
      width: '500px',
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
