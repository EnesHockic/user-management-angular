import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPermissionsComponent } from './users/user-permissions/user-permissions.component';

const appRoutes: Routes = [
  //{path:"",redirectTo:"/users"},
  {path:"users",component:UsersComponent,children:[
    {path:"new",component:EditUserComponent},
    {path:":id/edit",component:EditUserComponent},
    {path:":id/permissions",component:UserPermissionsComponent}
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    EditUserComponent,
    UserPermissionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
