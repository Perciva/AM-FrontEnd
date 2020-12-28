import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authentication } from 'src/app/service/authentication.service'
import { UserPost } from '../service/model/User';

declare function EncryptToBase64(username,password): any;

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

    var encryptPassword = EncryptToBase64(username,password);
    var _data = new UserPost();
    _data.password = encryptPassword;
    _data.username = username;


    this._auth.getUser(_data).subscribe(
      data=>
      {
        console.log(data);
      }
      );
      
      // if(this.currUser == null){
      //   alert("Failed to login");
      // }
      // else{
        this.router.navigate(['home']);
      // }
    }

  ngOnInit(): void {
  }

}
