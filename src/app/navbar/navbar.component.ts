import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users.service";
import {DataService} from "../data.service";
import {IUser} from "../IUser";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(private _userservice:UsersService,private _service: DataService,private _route:Router){

  }
  check=false;
  Users:IUser[];
  activeUser:IUser;
  ngOnInit(): void {

    this._userservice.getUsers().subscribe(data => {
      this.Users = data;
      this.activeUser = this.Users.find(user => user.status === true);
      if (this.activeUser) {
        this.check = this.activeUser.status;
      }
    });
  }
  onLogOut() {
    this.activeUser = this.Users.find(item => item.status === true);
    if (this.activeUser) {
      this.activeUser.status = false;
    }
    this._userservice.updateUser(this.activeUser).subscribe();
    //location.reload();
    this._route.navigate(['/posts']);
  }

}
