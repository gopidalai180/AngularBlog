

import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {IPost} from "./IPost";

@Injectable()
export class DataService {

  constructor() { }
  private status:boolean = false;
  private  dataOb = new Subject<IPost>();
  getData() {
    return this.dataOb;
  }
  updateData(data: IPost) {
    this.dataOb.next(data);
  }
  getStatus(){
    return this.status;
  }
  changeStatus(){
    !this.status;
  }

}
