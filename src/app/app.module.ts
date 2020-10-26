import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./module/material/material.module";

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/utility/page-not-found/page-not-found.component'; 

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
    RoutingComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})  
export class AppModule { }
