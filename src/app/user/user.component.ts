import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../Services/user.service"
import {Iuser} from "../Interface/Iuser";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  loginUser: Iuser;
  constructor(private _router: Router, private _user:UserService) { }

  ngOnInit() {

  }

  onLogIn(name, password){
    this._user.getUser(name,password).subscribe(user=>{this.loginUser = user;
    if (this.loginUser){
      this.loginUser.status= true;
    this._user.patchUser(this.loginUser).subscribe();}
    });
    this._router.navigate(['/loggedin']);
  }

}
