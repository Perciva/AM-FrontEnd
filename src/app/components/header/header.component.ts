import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../common/global-variable';

declare function decrypt(word): any;

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

  constructor(private router: Router) { }
  
  
  selection: Selection[] = [
    {value: 'Compact 19-20'},
    {value: 'Even 19-20'},
    {value: 'Odd 19-20'}
  ];
  
  selected = this.selection[0].value;
  
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

}
