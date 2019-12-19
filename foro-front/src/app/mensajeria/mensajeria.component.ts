import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent implements OnInit {

  constructor(private socketService: SocketService) {
   }

   private conexion;

  ngOnInit() {
    this.conexion = this.socketService.getMessages().subscribe( msg => {
      //mensaje
    });
  }

  ngOnDestroy(){
    this.conexion.unsubscribe();
  }

  sendMessage(usernameId, receiverUsernameId, content){
    const msg = {
      usernameId: usernameId,
      receiverUsernameId: receiverUsernameId,
      content: content,
    }
    this.socketService.sendMessage(msg);
  }
}
