import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./module/material/material.module";
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PeriodPageComponent } from './manage/period-page/period-page.component';
import { LeaderPageComponent } from './manage/leader-page/leader-page.component';

import { AssistantPageComponent } from './manage/assistant-page/assistant-page.component';
import { WorkShiftComponent } from './assistants/work-shift/work-shift.component';
import { HolidayComponent } from './assistants/holiday/holiday.component';
import { SpecialShiftComponent } from './assistants/special-shift/special-shift.component';
import { AttendanceComponent } from './assistants/attendance/attendance.component';
import { SummaryComponent } from './report/summary/summary.component';
import { ReportAttendanceComponent } from './report/report-attendance/report-attendance.component';
import { AddPeriodDialogComponent } from './manage/dialog/add-period-dialog/add-period-dialog.component';
import { UpdatePeriodDialogComponent } from './manage/dialog/update-period-dialog/update-period-dialog.component';
import { AddLeaderDialogComponent } from './manage/dialog/add-leader-dialog/add-leader-dialog.component';
import { UpdateLeaderDialogComponent } from './manage/dialog/update-leader-dialog/update-leader-dialog.component';


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    RoutingComponent,
    LoginPageComponent,
    PeriodPageComponent,
    LeaderPageComponent,
    AssistantPageComponent,
    WorkShiftComponent,
    HolidayComponent,
    SpecialShiftComponent,
    AttendanceComponent,
    SummaryComponent,
    ReportAttendanceComponent,
    AddPeriodDialogComponent,
    UpdatePeriodDialogComponent,
    AddLeaderDialogComponent,
    UpdateLeaderDialogComponent,
  ],
    providers: [
    ],
  bootstrap: [AppComponent]
})  

export class AppModule {
}
