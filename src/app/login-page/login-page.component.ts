import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service' 
import { GlobalConstants } from '../common/global-variable'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare function encrypt(word): any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticate: AuthenticateService) {
  }

  doLogin() {
    var username = ((document.getElementById("txtUsername") as HTMLInputElement).value).toLowerCase();
    var password = ((document.getElementById("txtPassword") as HTMLInputElement).value);


    const querySubscription = this.authenticate.GetUser(username, password)
    .subscribe(async data => {
      await this.saveData(data.data.GetUser);
    });

    this.subscriptions = [...this.subscriptions, querySubscription];
  }
  
  saveData(data){
    localStorage.setItem(GlobalConstants.USER, encrypt(JSON.stringify(data.UserData)));
    localStorage.setItem(GlobalConstants.TOKEN, encrypt(data.Token));
    if(data.Token != null){
      this.router.navigate(['/home']);
    }
    else{
      alert('Failed to login');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      txtUsername: ['', Validators.required],
      txtPassword: ['', Validators.required]
    });
  }

  onKey(event: any) { 
    if(event.key == 'Enter'){
      this.doLogin();
    }
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }

}
