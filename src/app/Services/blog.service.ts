import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IBlog} from "../Interface/IBlog"
@Injectable()
export class BlogService {
  private BASE_URL = 'http://localhost:3000/blogs/';
  constructor(private _http:HttpClient) { }
  postBlog(data): Observable<IBlog> {
    return this._http.post<IBlog>(this.BASE_URL,data)
  }
  getBlogs():Observable<IBlog[]>{
    return this._http.get<IBlog[]>(this.BASE_URL);
  }
  updateBlog(data:IBlog):Observable<IBlog>{
    return this._http.patch<IBlog>(this.BASE_URL+data.id,data);
  }
  deleteBlog(data:IBlog){
    return this._http.delete<IBlog>(this.BASE_URL+data.id);
  }
  getBlog(id):Observable<IBlog>{
    return this.getBlogs().map((blogs:IBlog[])=>blogs.find(b=>b.id==id));
  }
  getBlogByAuthorId(id):Observable<IBlog[]>{
    return this.getBlogs().map((blogs: IBlog[])=>blogs.filter(b=> b.authorId==id ))
  }
 updateFavourites(userId, blog:IBlog){


 }


}
