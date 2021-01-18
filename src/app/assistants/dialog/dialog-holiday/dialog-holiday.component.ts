import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-variable';

@Component({
  selector: 'app-dialog-holiday',
  templateUrl: './dialog-holiday.component.html',
  styleUrls: ['./dialog-holiday.component.scss']
})
export class DialogHolidayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
