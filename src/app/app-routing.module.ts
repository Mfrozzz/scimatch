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
import { CreateProjectComponent } from './pages/user/project/create-project/create-project.component';
import { UpdateProjectComponent } from './pages/user/project/update-project/update-project.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

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
    path:'solicitations',
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
  },
  {
    path:'project/create',
    component:CreateProjectComponent
  },
  {
    path:'project/update',
    component:UpdateProjectComponent
  },
  {
    path:'forgotPassword',
    component:ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
