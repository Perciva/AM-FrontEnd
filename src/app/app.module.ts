import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./module/material/material.module";

import { AppComponent } from './app.component';
import { PeriodPageComponent } from './manage/period-page/period-page.component';
import { LeaderPageComponent } from './manage/leader-page/leader-page.component';
import { AssistantPageComponent } from './manage/assistant-page/assistant-page.component';
import { WorkShiftComponent } from './assistants/work-shift/work-shift.component';
import { HolidayComponent } from './assistants/holiday/holiday.component';
import { SpecialShiftComponent } from './assistants/special-shift/special-shift.component';
import { AttendanceComponent } from './assistants/attendance/attendance.component';
import { SummaryComponent } from './report/summary/summary.component';
import { ReportAttendanceComponent } from './report/report-attendance/report-attendance.component';
import { GraphQLModule } from './graphql.module';


@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
  ],
  declarations: [
    AppComponent,
    RoutingComponent,
    PeriodPageComponent,
    LeaderPageComponent,
    AssistantPageComponent,
    WorkShiftComponent,
    HolidayComponent,
    SpecialShiftComponent,
    AttendanceComponent,
    SummaryComponent,
    ReportAttendanceComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})  

export class AppModule {
}
