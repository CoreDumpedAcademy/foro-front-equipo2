import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3001')
   }

   getMessages(){
     const observable = new Observable(observer =>{
        
      this.socket.on('message', message => {
        observer.next(message);
        });
    });
    return observable;
   }

   sendInit(usernameId){
     console.log(usernameId);
    this.socket.emit('init', usernameId);
   }

   sendMessage(msg){
     console.log(msg);
     
    this.http.post('http://localhost:3000/instaMessage/send',msg); 
    this.socket.emit('message', msg);
   }
}


