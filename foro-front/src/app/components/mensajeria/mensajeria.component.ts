import { instaMessage } from './../../interfaces/instaMessage';
import { User } from 'src/app/interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RoutesService } from 'src/app/service/routes.service';
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent implements OnInit {

  user:User;
  SendMessage: instaMessage;
  msg: any;
  allSentMessages: instaMessage[];
  SentMessages: instaMessage[];
  allRecivedMessages: instaMessage[];
  RecivedMessages: instaMessage[];

  usernameId: string;

  constructor(
    private socketService: SocketService,
    private api: RoutesService,
    private router: Router,
    private cookieService: CookieService,
    ) {
      const token = this.cookieService.get('token');
      this.api.authToken(token).subscribe((response:{data: User}) => {
       this.user = response.data;
       this.usernameId = this.user._id
       this.socketService.sendInit(this.usernameId);
       });
      
   }

   private conexion;
   
  ngOnInit() {
    const token = this.cookieService.get('token');
     this.api.authToken(token).subscribe((response:{data: User}) => {
       this.user = response.data;
       this.usernameId = this.user._id
       

       this.api.getSentMsg(this.user._id).subscribe((response:{instaMessage:instaMessage[]})=>{
         console.log(response);
         this.allSentMessages = response.instaMessage;
         
       });
       this.api.getRecMsg(this.usernameId).subscribe((response:{instaMessage:instaMessage[]})=>{
        console.log(response);
        this.allRecivedMessages = response.instaMessage;
        console.log(this.allRecivedMessages);
        
      });
    this.conexion = this.socketService.getMessages().subscribe( msg => {
      this.msg = msg;
      console.log(this.allRecivedMessages);
      console.log(this.msg);
      if (this.msg.receiverUsernameId == this.usernameId) this.allRecivedMessages.push(this.msg);
      else this.allSentMessages.push(this.msg);
      
    });
       
       });
  }
  reload(){
    const token = this.cookieService.get('token');
     this.api.authToken(token).subscribe((response:{data: User}) => {
       this.user = response.data;
       this.usernameId = this.user._id
       this.socketService.sendInit(this.usernameId);
       this.api.getSentMsg(this.user._id).subscribe((response:{instaMessage:instaMessage[]})=>{
        console.log(response);
        this.allSentMessages = response.instaMessage;
      });
      this.api.getRecMsg(this.usernameId).subscribe((response:{instaMessage:instaMessage[]})=>{
       console.log(response);
       this.allRecivedMessages = response.instaMessage;
     });
    this.conexion = this.socketService.getMessages().subscribe( msg => {
      this.msg = msg;
    });
       
       });
  }

  sendMessage(form){
    console.log(form.value);
    this.api.getuser(form.value.receiverUsername).subscribe((response:{user:User})=>{
      
      const msg = {
        senderUsernameId: this.user._id,
        receiverUsernameId: response.user._id,
        content: form.value.content,
      }
      console.log(msg);
      this.api.sendmessage(msg).subscribe((response)=>{
        console.log(response);
      })
      this.socketService.sendMessage(msg);
      this.reload();
    })
    }
  getConver(Id){
    console.log(Id);
    this.SentMessages=this.allSentMessages;
    this.RecivedMessages=this.allRecivedMessages; 
   
  }

    
}
