import {Component, OnInit} from '@angular/core';
import {PostsService} from "../posts.service";
import {IPost} from "../IPost";
import {DataService} from "../data.service";
import {UsersService} from "../users.service";
import {IUser} from "../IUser";
import {equal} from "assert";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.css']
})
export class SeeAllComponent implements OnInit {

  constructor(private _service: PostsService,private _dataService: DataService,private _userService:UsersService){

  }
  category:string = "All Categories";
  activeUser:IUser;
  posts: IPost[];
  filterdposts:IPost[];
  ngOnInit(): void {

    this._service.getPosts()
      .subscribe((data)=>{
      console.log(data);
      this.posts = data;
        this.filterdposts = data;
      });
    //location.reload();
  }
  filter(){
    if(this.category=== "All Categories"){
      this.filterdposts = this.posts;
    }
    else{
      this.filterdposts= [];
      this.posts.forEach(post=> {
        if(post.category=== this.category){

          this.filterdposts.push(post);
        }
      })
    }
  }

}
