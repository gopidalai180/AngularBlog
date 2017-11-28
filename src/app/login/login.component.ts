import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {IUser} from "../IUser";
import {DataService} from "../data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users:IUser[];
  user:IUser;
  login:boolean = false;
  message:boolean = false;
  constructor(private _service: UsersService,private  _route: Router,private _dataService: DataService) { }

  ngOnInit() {
    this._service.getUsers()
      .subscribe(data=>
        {
          this.users= data;
        }
      )
  }
  onLogin(userId:string,pwd:string){
    console.log(userId);
    console.log(pwd);
    console.log(pwd);
    this.user = this.users.find(u => u.id === userId && u.pwd === pwd);
    if (this.user) {
      this.user.status = true;
      this._service.updateUser(this.user).subscribe();

      this._route.navigate(['/posts']);
    }
    else {
      this.message  = true;

    }


  }
}


