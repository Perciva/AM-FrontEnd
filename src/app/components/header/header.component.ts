import { Component, OnInit } from '@angular/core';

interface Selection {
  value: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  
  
  selection: Selection[] = [
    {value: 'Compact 19-20'},
    {value: 'Even 19-20'},
    {value: 'Odd 19-20'}
  ];
  
  selected = this.selection[0].value;
  
  ngOnInit(): void {
  }

}
