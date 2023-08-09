import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { MyProjectsComponent } from './pages/user/my-projects/my-projects.component';
import { SearchProjectsComponent } from './pages/user/search-projects/search-projects.component';
import { SeeUserComponent } from './pages/user/see-user/see-user.component';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { CreateProjectComponent } from './pages/user/project/create-project/create-project.component';
import { UpdateProjectComponent } from './pages/user/project/update-project/update-project.component';
import {MatChipsModule} from '@angular/material/chips';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    ProfileComponent,
    MyProjectsComponent,
    SearchProjectsComponent,
    SeeUserComponent,
    HomeAdminComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
NgIf, MatTabsModule, NgFor, AsyncPipe

MatFormFieldModule, MatInputModule
*/