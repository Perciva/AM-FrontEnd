import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodService } from 'src/app/service/period-services.service';
import { AddPeriodDialogComponent } from '../dialog/add-period-dialog/add-period-dialog.component';

export interface PeriodData {
  id: number;
  description: string;
  start: string;
  end: string;
}

@Component({
  selector: 'app-period-page',
  templateUrl: './period-page.component.html',
  styleUrls: ['./period-page.component.scss']
})

export class PeriodPageComponent implements AfterViewInit {
  ELEMENT_DATA: PeriodData[] = [];

  constructor(public dialog: MatDialog, private periodService: PeriodService) {
    periodService.GetAllPeriods().subscribe(async data => {
      await this.insertData(data);
    });

   }

   insertData(data){
     this.ELEMENT_DATA = data.data.GetAllPeriods;
     this.ELEMENT_DATA.forEach(element => {
       console.log(element)
     });
     console.log(this.ELEMENT_DATA)
     this.dataSource = new MatTableDataSource<PeriodData>(this.ELEMENT_DATA);
     this.dataSource.paginator = this.paginator;
   }

  displayedColumns: string[] = ['description', 'startDate', 'endDate', 'action'];
  dataSource = new MatTableDataSource<PeriodData>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPeriodDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doUpdate(val){
    console.log(val);
  }
}
