import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-variable';
import { LeaderData } from 'src/app/common/leader-model';
import { LeaderService } from 'src/app/service/leader-services.service';
import { AddLeaderDialogComponent } from '../dialog/add-leader-dialog/add-leader-dialog.component';
import { UpdateLeaderDialogComponent } from '../dialog/update-leader-dialog/update-leader-dialog.component';


@Component({
  selector: 'app-leader-page',
  templateUrl: './leader-page.component.html',
  styleUrls: ['./leader-page.component.scss']
})
export class LeaderPageComponent implements OnInit{
  ELEMENT_DATA: LeaderData[] = [];
  mySub: any;
  period_id = -1;

  constructor(public dialog: MatDialog, private leaderService: LeaderService, private router: Router) {
    this.period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    console.log("Curr Period_Id: " + this.period_id);
    if(this.period_id == null){
      this.router.navigate(["/home"]);
    }
    // this.mySub = this.leaderService.GetAllLeader(this.period_id).subscribe(async data => {
    //   await this.insertData(data);
    // });
    
   }
   ngOnInit(){

   }

   insertData(data){
     console.log(data.data);
     if(data.data.GetLeaderByPeriodId != null){
       data.data.GetLeaderByPeriodId.forEach(element => {
          this.ELEMENT_DATA.push(element)
       });
        this.dataSource.data = this.ELEMENT_DATA;
     }
   }

  displayedColumns: string[] = ['initial', 'name', 'action'];
  dataSource = new MatTableDataSource<LeaderData>(this.ELEMENT_DATA);

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
    alert(data.data.DeleteLeader? "Delete Success":"Delete Failed");
    location.reload();
  }
}
