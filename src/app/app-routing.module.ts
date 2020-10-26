import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/utility/page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManagePageComponent } from './manage/manage-page/manage-page.component';
import { AssistantsPageComponent } from './assistants/assistants-page/assistants-page.component';

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
        path: 'manage', 
        component: ManagePageComponent ,
      },
      {
        path: 'assistants', 
        component: AssistantsPageComponent ,
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
  AssistantsPageComponent
]