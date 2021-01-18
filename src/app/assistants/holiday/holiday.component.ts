import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HolidayData } from 'src/app/common/holiday-model';
import { HolidayServicesService } from 'src/app/service/holiday-services.service';
import { DialogHolidayComponent } from '../dialog/dialog-holiday/dialog-holiday.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  ELEMENT_DATA: HolidayData[] = [];
  mySub: any;
  period_id = -1;

  constructor(public dialog: MatDialog, private holidayService: HolidayServicesService) { 
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
    if(data.data.GetLeaderByPeriodId != null){
      data.data.GetLeaderByPeriodId.forEach(element => {
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

}
