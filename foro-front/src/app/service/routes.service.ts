import { Post } from './../interfaces/post';
import { User } from './../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';

const httpOptions = {
  header: new HttpHeaders({
  'token': 'my-auth-token'
})
}

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http:HttpClient) { }

  // comunication between app components and post results 
  posts: Post[] ;

  @Output() change: EventEmitter<any> = new EventEmitter();

  send(posts: any) {
    this.posts=posts ;
    this.change.emit(this.posts);
  }


  private adress = 'http://localhost:3000/';
  
  // prototype function not the final version
  findPost(data:string){
    return this.http.get(`${this.adress}posts/${data}`);
  }
  // login call to the back end
  loginUser(user:User){
    return this.http.post(`${this.adress}user/login`, user );
  }
  // token creation
  token(token: string){
    httpOptions.header= httpOptions.header.set('token', token );
  }
  // check if the token is correct
  authToken(token: string){
    httpOptions.header= httpOptions.header.set('token', token );
    console.log(httpOptions.header);
    return this.http.get(`${this.adress}user/loginToken`, { headers : httpOptions.header} );
  }
}
