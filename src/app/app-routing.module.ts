import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/utility/page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManagePageComponent } from './manage/manage-page/manage-page.component';
import { AssistantsPageComponent } from './assistants/assistants-page/assistants-page.component';
import { PeriodPageComponent } from './manage/period-page/period-page.component';
import { LeaderPageComponent } from './manage/leader-page/leader-page.component';
import { AssistantPageComponent } from './manage/assistant-page/assistant-page.component';
import { WorkShiftComponent } from './assistants/work-shift/work-shift.component';
import { HolidayComponent } from './assistants/holiday/holiday.component';
import { SpecialShiftComponent } from './assistants/special-shift/special-shift.component';
import { AttendanceComponent } from './assistants/attendance/attendance.component';
import { ReportAttendanceComponent } from './report/report-attendance/report-attendance.component';
import { SummaryComponent } from './report/summary/summary.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  { 
    path: 'login',
    component: LoginPageComponent 
  },
  { 
    path: 'home', 
    component: HeaderComponent ,
    children:[
      {
        path: 'manage/period', 
        component: PeriodPageComponent ,
      },
      {
        path: 'manage/leader', 
        component: LeaderPageComponent ,
      },
      {
        path: 'manage/assistant', 
        component: AssistantPageComponent ,
      },
      {
        path: 'assistant-management/work-shift', 
        component: WorkShiftComponent,
      },
      {
        path: 'assistant-management/holiday', 
        component: HolidayComponent,
      },
      {
        path: 'assistant-management/special-shift', 
        component: SpecialShiftComponent,
      },
      {
        path: 'assistant-management/attendance', 
        component: AttendanceComponent,
      },
      {
        path: 'report/attendance', 
        component: ReportAttendanceComponent ,
      },
      {
        path: 'report/summary', 
        component: SummaryComponent ,
      }
    ]
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
export const RoutingComponent = [
  LoginPageComponent,
  HeaderComponent,
  PageNotFoundComponent,
  ManagePageComponent,
  AssistantsPageComponent,
  PeriodPageComponent,
  LeaderPageComponent,
  AssistantPageComponent,
  WorkShiftComponent,
  HolidayComponent,
  SpecialShiftComponent,
  AttendanceComponent,
  ReportAttendanceComponent,
  SummaryComponent
]