import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { SearchProjectsComponent } from './pages/user/search-projects/search-projects.component';
import { SeeUserComponent } from './pages/user/see-user/see-user.component';
import { MyProjectsComponent } from './pages/user/my-projects/my-projects.component';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'userHome',
    component:UserHomeComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'searchProject',
    component:SearchProjectsComponent
  },
  {
    path:'seeUser',
    component:SeeUserComponent
  },
  {
    path:'myProjects',
    component:MyProjectsComponent
  },
  {
    path:'admin',
    component:HomeAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
