import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map'

const USER_URL = 'https://still-wildwood-65116.herokuapp.com/users/';
const header = {headers: new Headers({'Content-Type': 'application/json'})};
@Injectable()
export class UsersService {

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get(USER_URL).map(res => res.json());
  }
  getUser(name: string, password: string) {
    return this.getUsers().map(users => {
      return users.find(users.name === name && users.password === password);
    });
  }
  updateUser(data) {
    return this._http.patch(USER_URL + data.id, data , header).map(res => res.json());
  }
  activeUser(){
    return this.getUsers().map((users) => users.find(u => u.status === true));
  }

}
