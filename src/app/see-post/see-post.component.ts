import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPost} from "../IPost";
import {PostsService} from "../posts.service";
import {IUser} from "../IUser";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-see-post',
  templateUrl: './see-post.component.html',
  styleUrls: ['./see-post.component.css']
})
export class SeePostComponent implements OnInit {
  markedFavourite:boolean=true;
  postId: number;
  editable:boolean = false;
  post: IPost;

  comment: string;
  commentBy: string;
  activeUser:IUser;
  Users:IUser[];
  msg:boolean = false;
  constructor(private _route:ActivatedRoute,private _service:PostsService,private _router:Router,private _userService:UsersService) {

  }

  ngOnInit() {
    this.postId = +this._route.snapshot.paramMap.get('id');
    this._service.getPost(this.postId)
      .subscribe((data)=> {
        this.post = data;
      });
    this._userService.getUsers().subscribe(data => {
      this.Users = data;
      this.activeUser = this.Users.find(user => user.status === true);

    });

  }
  deletePost(post){
    this._service.deletePost(post).subscribe();
    //location.reload();
    this._router.navigate(['/myposts']);
  }
  postLiked(){
    this.post.likes++;
  }

  updatePost(){

    this.editable= true;

  }
  onSubmit(title:string,description:string,category){
      let post={

        title:title,
        desc: description,
        author:this.activeUser.id,
        likes:this.post.likes,
        date: Date.now(),
        userId: this.post.userId,
        category:category,
        id: this.post.id
      };
      this.editable = false;
    if (title.trim().length !== 0 && description.trim().length !== 0 ){
      this._service.updatePost(post)
        .subscribe();
      //location.reload();
      this._router.navigate(['/myposts']);
    }
    else{
      this.msg = true;
    }
  }

  favourite(){
    console.log("buttonclicked!!");
    if(this.activeUser.favourites.includes(this.post.id)){
      alert("Already added to favourites");
    }
    else{
      this.activeUser.favourites.push(this.post.id);
      this._userService.updateUser(this.activeUser).subscribe();
      alert("SuccessFully Added to Favourites");
    }


  }
}

