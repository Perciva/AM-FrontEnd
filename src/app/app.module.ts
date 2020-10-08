import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./module/material/material.module";

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './components/header/header.component'; 

@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})  
export class AppModule { }
