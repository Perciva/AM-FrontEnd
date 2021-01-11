import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodService } from 'src/app/service/period-services.service';
import { GlobalConstants } from '../../common/global-variable';

declare function decrypt(word): any;

interface Selection {
  id: number;
  value: string;
}
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
       this.selection.push({id: element.id, value: element.description})
     });
     this.selection.reverse();
     if(this.selection != null){
       GlobalConstants.CURR_PERIOD = this.selection[0];
       this.selected = this.selection[0].value;
     }
   }
  
  selection: Selection[] = [];
  selected;
  
  
  ngOnInit(): void {
    var user = JSON.parse(decrypt(localStorage.getItem(GlobalConstants.USER)));
    if(user != null){
      this.User_name = user.UserName;
    }
    else{
      this.User_name = "Dummy";
    }
  }

  signOut(): void{
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  onUpdate():void{
    this.selection.forEach(element => {
      if(element.value == this.selected){
        GlobalConstants.CURR_PERIOD = element;
        return;
      }
    });
  }

}
