import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeaderService } from 'src/app/service/leader-services.service';
import { AddLeaderDialogComponent } from '../dialog/add-leader-dialog/add-leader-dialog.component';
import { UpdateLeaderDialogComponent } from '../dialog/update-leader-dialog/update-leader-dialog.component';

export interface LeaderData {
  id: number;
  period_id: number;
  initial: string;
  name: string;
}

@Component({
  selector: 'app-leader-page',
  templateUrl: './leader-page.component.html',
  styleUrls: ['./leader-page.component.scss']
})
export class LeaderPageComponent implements AfterViewInit{
  ELEMENT_DATA: LeaderData[] = [];
  mySub: any;

  constructor(public dialog: MatDialog, private leaderService: LeaderService, private router: Router) {
    this.mySub = this.leaderService.GetAllLeader().subscribe(async data => {
      await this.insertData(data);
    });

   }

   insertData(data){
     console.log(data.data.GetAllLeader);
    data.data.GetAllLeader.forEach(element => {
       this.ELEMENT_DATA.push(element)
    });
     this.ELEMENT_DATA.reverse();
     this.dataSource.data = this.ELEMENT_DATA;
     this.dataSource.paginator = this.paginator;
   }

  displayedColumns: string[] = ['initial', 'name', 'action'];
  dataSource = new MatTableDataSource<LeaderData>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLeaderDialogComponent, {
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
    const dialogRef = this.dialog.open(UpdateLeaderDialogComponent, {
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
    this.leaderService.DeleteLeader(x).subscribe(async data => {
      await this.afterDelete(data);
    });
  }

  afterDelete(data){
    console.log(data)
    // alert(data.data.DeleteLeader? "Delete Success":"Delete Failed");
    location.reload();
  }
}
