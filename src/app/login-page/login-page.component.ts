import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authentication } from 'src/app/service/authentication.service'

declare function EncryptToBase64(password, username): any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private _auth : authentication) {
  }

  doLogin() {
    var username = ((document.getElementById("txtUsername") as HTMLInputElement).value).toLowerCase();
    var password = ((document.getElementById("txtPassword") as HTMLInputElement).value);

    console.log(EncryptToBase64(password,username));

    // console.log(username + " " + password);
    this._auth.getUser().subscribe(
      data=>
      {

      }
    );


    this.router.navigate(['home']);
  }

  ngOnInit(): void {
  }

}
