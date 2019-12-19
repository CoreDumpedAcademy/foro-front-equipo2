import { Message } from './../../../interfaces/message';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { RoutesService } from 'src/app/service/routes.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-md',
  templateUrl: './md.component.html',
  styleUrls: ['./md.component.css']
})
export class MDComponent implements OnInit {
  user:User;
  sendMessage: Message;
  messages:Message[];
  myMessages:Message[];
  editState:boolean=false;
  editId:string;

  constructor(
    private api: RoutesService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
     // check the token in the cookies service
     const token = this.cookieService.get('token');
     this.api.authToken(token).subscribe((response:{data: User}) => {
       this.user= response.data;
      
       this.api.reciveMessage(this.user._id).subscribe((response) =>{
        this.messages=response['pm']
        for (let i = 0; i < this.messages.length ; i++) {
          this.api.getusername(this.messages[i].senderUsernameId).subscribe((response:{username:string})=>{
            this.messages[i].senderUsername = response.username;
          });
        }
       });
       this.api.sentMessage(this.user._id).subscribe((response) => {
        this.myMessages=response['pm']
        console.log(this.myMessages);
        
        for (let i = 0; i < this.myMessages.length ; i++) {
          this.api.getusername(this.myMessages[i].receiverUsernameId).subscribe((response:{username:string})=>{
            this.myMessages[i].receiverUsername = response.username;
            console.log(this.myMessages[i]);
          });
        }
       });


     }, (error: HttpErrorResponse) => {
       console.log('error tienes que iniciar sesion');
       this.router.navigateByUrl('/home');
       alert('You should be logged for access to messages');
     });
  }
  reload(){
    const token = this.cookieService.get('token');
     this.api.authToken(token).subscribe((response:{data: User}) => {
       this.user= response.data;
      
       this.api.reciveMessage(this.user._id).subscribe((response) =>{
        this.messages=response['pm']
        for (let i = 0; i < this.messages.length ; i++) {
          this.api.getusername(this.messages[i].senderUsernameId).subscribe((response:{username:string})=>{
            this.messages[i].senderUsername = response.username;
          });
        }
       });
       this.api.sentMessage(this.user._id).subscribe((response) => {
        this.myMessages=response['pm']
        console.log(this.myMessages);
        
        for (let i = 0; i < this.myMessages.length ; i++) {
          this.api.getusername(this.myMessages[i].receiverUsernameId).subscribe((response:{username:string})=>{
            this.myMessages[i].receiverUsername = response.username;
            console.log(this.myMessages[i]);
          });
        }
       });


     }, (error: HttpErrorResponse) => {
      console.log('error tienes que iniciar sesion');
      this.router.navigateByUrl('/home');
      alert('You should be logged for access to messages');
    });
  }
  send(form,receiver){
    this.sendMessage = form.value;
    this.api.getuser(form.value.receiverUsername).subscribe((response:{user:User})=>{
      this.sendMessage.receiverUsernameId = response.user._id;
      this.sendMessage.senderUsernameId = this.user._id
    this.api.sendMessage(this.sendMessage).subscribe((response)=>{
      this.reload();
    });
    })
    
  }
  edit(id){
    console.log(id);
      this.editState = !this.editState;
      this.editId = id;
  }
}
