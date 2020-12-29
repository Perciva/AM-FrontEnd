import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddPeriodDialogComponent } from '../dialog/add-period-dialog/add-period-dialog.component';

@Component({
  selector: 'app-period-page',
  templateUrl: './period-page.component.html',
  styleUrls: ['./period-page.component.scss']
})
export class PeriodPageComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['description', 'startDate', 'endDate', 'action'];
  dataSource = new MatTableDataSource<Period>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPeriodDialogComponent, {
      width: '500px',
      data: {}
    });
  }
}

export interface Period {
  description: string;
  startDate: string;
  endDate: string;
}

const ELEMENT_DATA: Period[] = [
  {description: '20-2 Post Acceptance', startDate: '2020-08-14' , endDate: '2020-09-12'},
  {description: 'Compact, 2019-2020', startDate: '2020-07-113' , endDate: '2020-09-13'},
  {description: 'Even, 2019-2020', startDate: '2020-02-17' , endDate: '2020-07-12'},
  {description: '20-1 Post Acceptance', startDate: '2020-02-07' , endDate: '2020-02-16'},
  {description: 'Odd, 2019-2020', startDate: '2019-09-16' , endDate: '2020-02-16'},
  {description: '19-2 Post Acceptance', startDate: '2019-08-16' , endDate: '2019-09-12'},
  {description: 'Compact, 2018-2019', startDate: '2019-07-18' , endDate: '2019-09-15'},
  {description: 'Even, 2018-2019', startDate: '2019-02-18' , endDate: '2019-07-17'},
  {description: '19-1 Post Acceptance', startDate: '2020-02-01' , endDate: '2019-02-17'},
  {description: 'Odd, 2018-2019', startDate: '2018-09-11' , endDate: '2019-02-17'},
  {description: 'Compact, 2017-2018', startDate: '2018-07-20' , endDate: '2018-09-17'},
  {description: 'Even, 2017-2018', startDate: '2018-02-19' , endDate: '2018-07-19'},
];
