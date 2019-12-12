import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/service/routes.service';
import { Router } from '@angular/router';
import { Comment } from '../../../interfaces/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public comments=[];

  constructor(private respServices: RoutesService, private router: Router) { }
  ngOnInit() {
    this.respServices.getComments().subscribe(data =>{
      this.comments = data;
      console.log(this.comments);
    });
  }
  response(form): void{
    console.log(form.value);
  }
}
