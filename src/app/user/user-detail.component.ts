import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../Services/user.service";
import {BlogService} from "../Services/blog.service"
import {Iuser} from "../Interface/Iuser";
import {IBlog} from "../Interface/IBlog";
import {Router} from "@angular/router";
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {

  constructor(private _user:UserService,private _blogService:BlogService,private _router :Router) { }
  activeUser:Iuser;
  blogs:IBlog[];
  title:string="";
  description:string="";
  type:string="";
  blogsFromActiveUser:IBlog={
    "title": "",
    "description": "",
    "type": "",
    "favourites": [],
    "authorId": null,
    "id": null
  };

  loggedIn :boolean;
  loggedOut : boolean;


  ngOnInit() {
    this._user.activeUser().subscribe(user=> {this.activeUser= user;
      this.loggedIn = this.activeUser? true : false;
      this.loggedOut = this.activeUser? false : true;
      this.blogsFromActiveUser.authorId= this.activeUser.id;
      this._blogService.getBlogByAuthorId(this.activeUser.id).subscribe(b=>this.blogs= b);
    })
  }

  addBlog(blog){
    this._blogService.postBlog(blog).subscribe(b=>this.blogs.push(b));
  }
  updateBlog(blog){
    this._blogService.updateBlog(blog).subscribe();
  }
  deleteBlog(blog){
    this._blogService.deleteBlog(blog).subscribe()
  }
  checkBlog(name,desc,type){
    this.blogsFromActiveUser.title = name;
    this.blogsFromActiveUser.description = desc;
    this.blogsFromActiveUser.type = type;
    this.blogsFromActiveUser.id? this.updateBlog(this.blogsFromActiveUser) : this.addBlog(this.blogsFromActiveUser);

  }
  updateClick(blog){
    this.title = blog.title;
    this.description = blog.description;
    this.type = blog.type;
    this.blogsFromActiveUser = blog;
  }
  deleteClick(blog){
    this.blogs= this.blogs.filter(b=>b.id != blog.id);
    this._blogService.deleteBlog(blog).subscribe();

  }


}
