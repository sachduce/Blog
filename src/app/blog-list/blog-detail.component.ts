import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {IBlog} from "../Interface/IBlog";
import {BlogService} from "../Services/blog.service"
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private  _router:Router, private _blogService: BlogService) { }
  blog:IBlog={
    "title": "",
    "description": "",
    "type": "",
    "favourites": null,
    "authorId": null,
    "id": null
  };

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.getBlog(id);

  }
  getBlog(id){
    this._blogService.getBlog(id).subscribe(b=>this.blog=b);
  }
  onBack():void{
    this._router.navigate(['/home']);

  }

}
