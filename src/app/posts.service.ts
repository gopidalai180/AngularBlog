import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'


const BASE_URL = 'https://still-wildwood-65116.herokuapp.com/items/';
const header = {headers: new Headers({'Content-Type': 'application/json'})};

@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get(BASE_URL)
      .map(res=> res.json());
  }
  addPost(data){
    console.log(data);
    return this.http.post(BASE_URL,data,header)
      .map(res=> res.json());
  }
  getPost(id:number){

    return this.http.get(BASE_URL+id)
      .map(res => res.json());
  }
  deletePost(post){
    return this.http.delete(BASE_URL+post.id,header)
      .map(res=> res.json());
  }
  updatePost(post){
    return this.http.patch(BASE_URL+post.id,post,header)
      .map(res=> res.json());
  }
}
