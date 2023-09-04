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
// profile project/create search
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
    path:'user/:param/solicitations',
    component:UserHomeComponent
  },
  {
    path:'user/:param/profile',
    component:ProfileComponent
  },
  {
    path:'user/:param/search',
    component:SearchProjectsComponent
  },
  {
    path:'user/:param/u/:user',
    component:SeeUserComponent
  },
  {
    path:'user/:param',
    component:MyProjectsComponent
  },
  {
    path:'admin/:param',
    component:HomeAdminComponent
  },
  {
    path:'user/:param/project/create',
    component:CreateProjectComponent
  },
  {
    path:'user/:param/project/update/:pjc',
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
