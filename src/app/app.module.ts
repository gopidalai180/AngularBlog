import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddNewComponent } from './add-new/add-new.component';
import { SeeAllComponent } from './see-all/see-all.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {PostsService} from "./posts.service";
import { LimitToPipe } from './limit-to.pipe';
import {DataService} from "./data.service";
import { SeePostComponent } from './see-post/see-post.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {UsersService} from "./users.service";
import { NavbarComponent } from './navbar/navbar.component';
import { MypostComponent } from './mypost/mypost.component';
import { MyfavComponent } from './myfav/myfav.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewComponent,
    SeeAllComponent,
    LimitToPipe,
    SeePostComponent,
    LoginComponent,
    NavbarComponent,
    MypostComponent,
    MyfavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      {path:"",redirectTo: 'posts',pathMatch: 'full'},
      {path: "posts",component: SeeAllComponent},
      {path: "posts/:id",component: SeePostComponent},
      {path:"login",component: LoginComponent},
      {path:"addnew",component: AddNewComponent},
      {path: "myposts",component: MypostComponent},
      {path:"myfavs",component: MyfavComponent}
    ])
  ],
  providers: [PostsService,DataService,UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
