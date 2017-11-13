import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Iuser} from "../Interface/Iuser";

@Injectable()
export class UserService {

  private BASE_URL = 'http://localhost:3000/users/';
  constructor(private _http:HttpClient) { }
  getUsers():Observable<Iuser[]>{
    return this._http.get<Iuser[]>(this.BASE_URL);
  }
  getUser(name: string, password: string): Observable<Iuser>{
       return this.getUsers().map((users:Iuser[])=>users.find(u => u.name==name && u.password== password ));
  }
  patchUser(data:Iuser){
    return this._http.patch(this.BASE_URL+data.id,data);
  }
  activeUser(){
    return this.getUsers().map((users:Iuser[])=>users.find(u => u.status== true));
  }




}
