import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router"
import { AppComponent } from './app.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-list/blog-detail.component';
import { UserComponent } from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./Services/user.service";
import {BlogService} from "./Services/blog.service";
import { UserDetailComponent } from './user/user-detail.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { BlogUserPipe } from './Pipes/blog-user.pipe';
import {FormsModule} from "@angular/forms";
import { FavouritesComponent } from './favourites/favourites.component'


const approutes = [
  {path:"",redirectTo:'/home',pathMatch:'full'},
  {path:"home", component: BlogListComponent},
  {path:"user", component: UserComponent},
  {path:"blog/:id", component: BlogDetailComponent},
  {path:"loggedin", component: UserDetailComponent},
  {path:"**", component: BlogListComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogDetailComponent,
    UserComponent,
    UserDetailComponent,
    UserNavComponent,
    BlogUserPipe,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(approutes),
    HttpClientModule
  ],
  providers: [UserService,BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
