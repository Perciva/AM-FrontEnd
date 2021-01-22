import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PeriodData } from 'src/app/common/period-model';
import { PeriodService } from 'src/app/service/period-services.service';
import { AddPeriodDialogComponent } from '../dialog/add-period-dialog/add-period-dialog.component';
import { UpdatePeriodDialogComponent } from '../dialog/update-period-dialog/update-period-dialog.component';



@Component({
  selector: 'app-period-page',
  templateUrl: './period-page.component.html',
  styleUrls: ['./period-page.component.scss']
})

export class PeriodPageComponent implements AfterViewInit{
  ELEMENT_DATA: PeriodData[] = [];
  mySub: any;

  constructor(public dialog: MatDialog, private periodService: PeriodService, private router: Router) {
    this.mySub = this.periodService.GetAllPeriods().subscribe(async data => {
      await this.insertData(data);
    });

   }

   insertData(data){
    data.data.GetAllPeriods.forEach(element => {
       this.ELEMENT_DATA.push(element)
    });
     this.ELEMENT_DATA.reverse();
     this.dataSource.data = this.ELEMENT_DATA;
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
      location.reload();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doUpdate(x){
    console.log(x);
    const dialogRef = this.dialog.open(UpdatePeriodDialogComponent, {
      width: '500px',
      data: x
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doDelete(x){
    console.log(x);
    this.periodService.DeletePeriods(x).subscribe(async data => {
      await this.afterDelete(data);
    });
  }

  afterDelete(data){
    location.reload();
  }

}
