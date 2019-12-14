import { Post } from './../interfaces/post';
import { User } from './../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Topic } from '../interfaces/topic';
import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { ConsoleReporter } from 'jasmine';

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
  topicId: string;


  postTitle: string;
  postId: string;
  comments: Comment[];

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

  // register call to the back end
  registerUser(user:User){
    return this.http.post(`${this.adress}user/signup`, user );
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

  create(post:Post){
    console.log(post);
    return this.http.post(`${this.adress}post/new`,post);
  }

  getTopics(){
    return this.http.get(`${this.adress}topic/all`);
  }

  getPostsByTopicId(topicId:string){
    return this.http.get(`${this.adress}post/topic/${topicId}`);
  }
  getTopicById(topicId:string){
    return this.http.get(`${this.adress}topic/id/${topicId}`);
  }
  getPostById(postId: string){
    return this.http.get(`${this.adress}post/id/${postId}`);
  }
  getComments(postId: string){
    return this.http.get(`${this.adress}comment/post/${postId}`);
  }
  Rating(data:object, commentId:string){
    return this.http.post(`${this.adress}comment/vote/${commentId}`,data);
  }
  commentPost(data){
    return this.http.post(`${this.adress}comment/new`, data);
  }

}
