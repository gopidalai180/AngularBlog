import { Component, OnInit } from '@angular/core';
import {PostsService} from "../posts.service";
import {DataService} from "../data.service";
import {UsersService} from "../users.service";
import {IUser} from "../IUser";
import {IPost} from "../IPost";

@Component({
  selector: 'app-myfav',
  templateUrl: './myfav.component.html',
  styleUrls: ['./myfav.component.css']
})
export class MyfavComponent implements OnInit {

  constructor(private _service: PostsService,private _dataService: DataService,private _userService:UsersService){}
  activeUser:IUser;
  Users:IUser[];
  posts: IPost[];
  ngOnInit(): void {
    this._userService.getUsers().subscribe(data => {
      this.Users = data;
      this.activeUser = this.Users.find(user => user.status === true);

    });
    this._service.getPosts()
      .subscribe((data)=>{
        this.posts = data;
      });
    this._dataService.getData()
      .subscribe((req)=>{
        this.posts.push(req);
      });

  }

}
