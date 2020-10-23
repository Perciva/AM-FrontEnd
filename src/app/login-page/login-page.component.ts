import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router) { 
  }

  doLogin(){
    var username = ((document.getElementById("txtUsername") as HTMLInputElement).value);
    var password = ((document.getElementById("txtPassword") as HTMLInputElement).value);

    

    console.log(username + " " + password);

    this.router.navigate(['home']);
  }

  ngOnInit(): void {
  }

}
