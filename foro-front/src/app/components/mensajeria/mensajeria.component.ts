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
  myMessages: instaMessage[];
  sendMessage1: any;
  usernameId: string;

  constructor(
    private socketService: SocketService,
    private api: RoutesService,
    private router: Router,
    private cookieService: CookieService,
    ) {
   }

   private conexion;
   
  ngOnInit() {
    const token = this.cookieService.get('token');
     this.api.authToken(token).subscribe((response:{data: User}) => {
       this.user = response.data;
       this.usernameId = this.user._id
       this.socketService.sendInit(this.usernameId);
    this.conexion = this.socketService.getMessages().subscribe( msg => {
      console.log(msg);
    });
       
       });
       
       
    
  }

  sendMessage(form){
    console.log(form.value);
    
    const msg = {
      usernameId: this.user._id,
      receiverUsernameId: form.value.receiverUsernameId,
      content: form.value.content,
      creationDate: Date.now()

    }
    console.log(msg);
    this.socketService.sendMessage(msg);
  }

}
