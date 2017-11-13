import {Component, OnInit, Output, ViewEncapsulation,EventEmitter,Input} from '@angular/core';
import {UserService} from "../Services/user.service";
import {Iuser} from "../Interface/Iuser";
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FavouritesComponent implements OnInit {

  activeUser:Iuser={
    "name": "",
    "password": "",
    "status": null,
    "id": null
  };
  @Input () blogFav=[];
  loggedIn: Boolean;
  loggedOut: Boolean;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.activeUser().subscribe(u=> {this.activeUser = u;
      this.loggedIn = this.activeUser? true : false;
      this.loggedOut = this.activeUser? false : true;
      if(this.activeUser){
        this.favMarkedStatus = this.blogFav.includes(this.activeUser.id);
      }

    });


  }

  @Output() Markfav: EventEmitter<Iuser>= new EventEmitter<Iuser>();
  favMarkedStatus: boolean;
  onClick(userId){
    this.Markfav.emit(userId);
    this.favMarkedStatus = !this.favMarkedStatus;
  }



}
