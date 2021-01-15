import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PeriodData } from 'src/app/common/period-model';
import { PeriodService } from 'src/app/service/period-services.service';
import { GlobalConstants } from '../../common/global-variable';

declare function decrypt(word): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  User_name: string;

  constructor(private router: Router, private periodService: PeriodService) {
    periodService.GetAllPeriods().subscribe(async data => {
      await this.insertData(data);
    });
  }
  
  insertData(data){
    data.data.GetAllPeriods.forEach(element => {
      this.selection.push(element)
    });
    this.selection.reverse();
    var period;
    period = localStorage.getItem(GlobalConstants.CURR_PERIOD);
    if(period != null){
      period = parseInt(period);
      this.selection.forEach(element => {
        if(element.id == period){
          this.selected = element.description;
        }
      });
    }
    else{
      this.selected = this.selection[0].description;
      localStorage.setItem(GlobalConstants.CURR_PERIOD, this.selection[0].id.toString());
    }
  }
  
  selection: PeriodData[] = [];
  selected;
  
  
  ngOnInit(): void {
    var user;
    try {
      user = JSON.parse(decrypt(localStorage.getItem(GlobalConstants.USER)));
      if(user != null){
        this.User_name = user.UserName;
      }
      else{
        this.User_name = "Dummy";
      }
    } catch (error) {
      this.User_name = "Dummy";
    }
  }

  signOut(): void{
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  onUpdate():void{
    this.selection.forEach(element => {
      if(element.description == this.selected){
        localStorage.setItem(GlobalConstants.CURR_PERIOD, element.id.toString());
        this.router.navigate(["/home"]);
      }
    });
  }

}
