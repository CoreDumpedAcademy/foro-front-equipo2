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

   usernameId;

   getMessages(){
     const observable = new Observable(observer =>{
        
      this.socket.on('message', message => {
        if( message.receiverUsernameId == this.usernameId) observer.next(message);
        observer.next();
        });
      
      this.socket.on('sender', message => {
        observer.next(message);
      });
    
    });
    return observable;
   }

   sendMessage(msg){
    this.http.post('url',msg); 
    this.socket.emit('message', msg);
   }
}


