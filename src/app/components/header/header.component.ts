import { Component, Inject, OnInit } from '@angular/core';
import { GlobalConstants } from '../../common/global-variable';

interface Selection {
  value: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  User_name: string;

  constructor() { }
  
  
  selection: Selection[] = [
    {value: 'Compact 19-20'},
    {value: 'Even 19-20'},
    {value: 'Odd 19-20'}
  ];
  
  selected = this.selection[0].value;
  
  ngOnInit(): void {
    
    if(GlobalConstants.CURR_USER != null){
      this.User_name = GlobalConstants.CURR_USER.UserName;
    }
    else{
      this.User_name = "Dummy";
    }
  }

}
