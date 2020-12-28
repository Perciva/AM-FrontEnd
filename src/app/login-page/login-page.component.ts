import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service' 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
currUser;
  constructor(private router: Router, private authenticate: AuthenticateService) {
  }

  doLogin() {
    var username = ((document.getElementById("txtUsername") as HTMLInputElement).value).toLowerCase();
    var password = ((document.getElementById("txtPassword") as HTMLInputElement).value);


    this.currUser = this.authenticate.GetUser(username, password)
    .subscribe(async data => {
      await this.saveData(data.data.GetUser);
    });
  }
  
  saveData(data){
    this.currUser = data;
    console.log(data);
    if(this.currUser){
      this.router.navigate(['/home']);
    }
    else{
      alert('Failed to login');
    }
  }

  ngOnInit(): void {
  }


}
