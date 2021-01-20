import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssistantData } from 'src/app/common/assistant-model';
import { GlobalConstants } from 'src/app/common/global-variable';
import { AssistantService } from 'src/app/service/assistant-services.service';
import { ShiftService } from 'src/app/service/shift-services.service';
import * as XLSX from 'xlsx';
import { ShiftData } from '../../common/shift-model'
import { AddShiftDialogComponent } from '../dialog/add-shift-dialog/add-shift-dialog.component';
import { UpdateShiftDialogComponent } from '../dialog/update-shift-dialog/update-shift-dialog.component';

@Component({
  selector: 'app-work-shift',
  templateUrl: './work-shift.component.html',
  styleUrls: ['./work-shift.component.scss']
})
export class WorkShiftComponent implements OnInit {
  title= 'XlsRead';
  file:File;
  arrayBuffer:any;
  
  ELEMENT_DATA: ShiftData[] = [];
  assistants: AssistantData[] = [];
  selection = new SelectionModel<ShiftData>(true, []);
  selected;
  mySub: any;
  
  displayedColumns: string[] = ['select', 'initial', 'day', 'in', 'out', 'action'];
  dataSource = new MatTableDataSource<ShiftData>(this.ELEMENT_DATA);
  
  constructor(private assistantService: AssistantService, 
    private shiftService: ShiftService,
    private router: Router, public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
    console.log("Curr Period_Id: " + period_id);
    if(period_id < 1){
      this.router.navigate(["/home"]);
    }
    this.mySub = this.assistantService.GetAllAssistant(period_id).subscribe(async data => {
      await this.insertAssistantData(data);
    });
    // this.retrieveNewShift();
   }
   
  insertAssistantData(data){
    console.log(data.data);
    if(data.data.GetAssistantByPeriodId != null){
      data.data.GetAssistantByPeriodId.forEach(element => {
         this.assistants.push(element)
      });
    }
  }

  insertShiftData(data){
    console.log(data.data);
    //TODO Update this
    if(data.data.GetAssistantByPeriodId != null){
      data.data.GetAssistantByPeriodId.forEach(element => {
         this.assistants.push(element)
      });
       this.dataSource.data = this.ELEMENT_DATA;
    }
  }

  addfile(event) {
    this.file= event.target.files[0]; 
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file); 
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var period_id = parseInt(localStorage.getItem(GlobalConstants.CURR_PERIOD));
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = "Shift Kerja (Include Special)";
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
      var initial = [];
      var day = [];
      var in_clock = [];
      var out_clock = [];

      arraylist.forEach(element => {
        var temp = element["Initial"] + element["Gen"];
        initial.push(temp);
        day.push(element["Day"]);
        in_clock.push(element["Clock In"]);
        out_clock.push(element["Clock Out"]);
      });
      
      this.FLAG_DONE= 1;
      this.CURR_PROG= 0;
      for(var i = 0; i < initial.length; i++){
        console.log(initial[i]);
        this.CURR_PROG++;
        this.shiftService.InsertShiftByAssistantInitial(initial[i], day[i], in_clock[i], out_clock[i]).subscribe(
          async data =>{
            await this.removeFlag()
          }
        );
      }
      this.FLAG_DONE = 0;
    }
  }

  CURR_PROG = 0;
  FLAG_DONE = 0;

  removeFlag(){
    this.CURR_PROG--;
    if(this.FLAG_DONE == 0 && this.CURR_PROG==0){
      this.retrieveNewShift();
      alert("Done");
    }
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddShiftDialogComponent, {
      width: '500px',
      data: this.selected
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      // this.retrieveNewShift();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doUpdate(x){
    console.log(x);
    const dialogRef = this.dialog.open(UpdateShiftDialogComponent, {
      width: '500px',
      data: { ast_id: this.selected, shift: x}
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
      // this.retrieveNewShift();
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  doDelete(x){
    console.log(x);
    this.shiftService.DeleteShift(x).subscribe(
      async data =>{
        await this.afterDelete(data)
      }
    );
  }

  afterDelete(data){
    console.log(data)
    alert(data.data.DeleteShift? "Delete Success":"Delete Failed");
    location.reload();
  }

  doDeleteAllShift(){
    console.log(this.selected);
    this.shiftService.DeleteAllAssistantShifts(this.selected).subscribe();
    location.reload();
  }

   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ShiftData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  doDeleteSelectedShift(){
    if(this.selection.selected.length== 0){
      alert("None item Selected");
    } 
    else{
      if(confirm("Are you sure want to delete?")){
        this.FLAG_DONE= 1;
        this.CURR_PROG= 0;
        this.ELEMENT_DATA.forEach(row =>{
          console.log(row.id + " ?? " + this.selection.isSelected(row));
          if(this.selection.isSelected(row)){
            //Remove by row.id
            this.CURR_PROG++;
            this.shiftService.DeleteShift(row.id).subscribe(
              async data =>{
                await this.removeFlag()
              }
            );
          }
        })
        this.FLAG_DONE = 0;

      }
      
    }
  }


  retrieveNewShift(){
    console.log(this.selected)
    this.shiftService.GetAssistantShifts(this.selected).subscribe(async res => {
      await this.refresh(res);
    });
  }

  refresh(res){
    this.ELEMENT_DATA = res.data.GetAssistantShifts;
    this.dataSource = new MatTableDataSource<ShiftData>(this.ELEMENT_DATA);
    this.changeDetectorRefs.detectChanges();
    this.dataSource.data = this.dataSource.data;
  }

}
