import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {BlogService} from "../Services/blog.service";
import {IBlog} from "../Interface/IBlog"

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogListComponent implements OnInit {


  constructor(private _blog: BlogService) { }
  blogs:IBlog[]=[];
  filterBlogs :IBlog[]=[];
  _listFilter: string="";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value :string){
    this._listFilter = value;
    this.filterBlogs = this.listFilter ? this.performFilter(this.listFilter) : this.blogs;
  }
  performFilter(filterBy: string): IBlog[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.blogs.filter((blog: IBlog) =>
      (blog.title.toLocaleLowerCase().indexOf(filterBy) !== -1)||(blog.type.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }


  ngOnInit() {
    this._blog.getBlogs().subscribe(blog=>{this.blogs= blog;
                                                this.filterBlogs= this.blogs});

  }
  favClick(userId,blog:IBlog){
    if(blog.favourites.includes(userId)){
      blog.favourites.splice(blog.favourites.indexOf(userId),1);
      console.log(blog.favourites);
    }
    else{
      blog.favourites.push(userId);
    }
    this._blog.updateBlog(blog).subscribe();
  }




}
