import { Component, OnInit, ViewEncapsulation,OnChanges } from '@angular/core';
import {UserService} from "../../Services/user.service";
import {Iuser} from "../../Interface/Iuser"
@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserNavComponent implements OnInit,OnChanges {

  constructor(private _user:UserService) { }
  activeUser:Iuser;
  loggedIn :boolean;
  loggedOut : boolean;


  ngOnInit() {
    this._user.activeUser().subscribe(user=> {this.activeUser= user;
      this.loggedIn = this.activeUser? true : false;
      this.loggedOut = this.activeUser? false : true;
    })

  }
  ngOnChanges(){

  }


  onSignOut(){
    this.activeUser.status = false;
    this._user.patchUser(this.activeUser).subscribe();
  }

}
