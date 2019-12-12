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
    console.log(posts)
    this.posts=posts ;
    this.change.emit(this.posts);
    console.log(this.posts)
  }


  private adress = 'http://localhost:3000/';
  
  // prototype function not the final version
  findPost(data:string){
    return this.http.get(`${this.adress}post/find/${data}`);
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
    return this.http.get(`${this.adress}user/loginToken`, { headers : httpOptions.header} );
  }
  // get the posts made by an user
  userPosts(username:string){
    return this.http.get(`${this.adress}post/user/${username}`);
  }
  // Response to a post
  commentPost(data){
    return this.http.post(`${this.adress}comment/new`, data);
  }
  // get comments of a post
  getComments(){
    return this.http.get()
  }
}
