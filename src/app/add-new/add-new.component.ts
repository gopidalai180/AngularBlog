import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from "../posts.service";
import {IPost} from "../IPost";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {UsersService} from "../users.service";
import {IUser} from "../IUser";

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  constructor(private _service: PostsService,private _route: Router,private _dataservice: DataService,private _userservice:UsersService){}
    activeUser:IUser;
    Users:IUser[];
    msg:boolean= false;
  ngOnInit(): void {
    this._userservice.getUsers().subscribe(data => {
      this.Users = data;
      this.activeUser = this.Users.find(user => user.status === true);

    });
  }
  addPost(title,desc,category){
    let post = {
      title: title,
      desc: desc,
      author:this.activeUser.id,
      likes: 0,
      date: Date.now(),
      userId: this.activeUser.id,
      category:category
    };
    if (title.trim().length !== 0 && desc.trim().length !== 0 ){
    this._service.addPost(post)
      .subscribe(data=> {
      this._dataservice.updateData(data);


      });
    //location.reload();
    this._route.navigate(['/posts']);
    }
    else {
      this.msg = true;

    }
  }
}
