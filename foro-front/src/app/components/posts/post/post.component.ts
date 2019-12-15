import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/service/routes.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public comments=[];
  public post=[];

  constructor(private respServices: RoutesService, private router: Router, public globals: Globals) { }
  ngOnInit() {
    this.respServices.getPostId(this.globals.postId).subscribe(info =>{
      this.post= info;
    });
    this.respServices.getComments(this.globals.postId).subscribe(data =>{
      this.comments = data;
      console.log(this.comments);
    });
  }
  response(form): void{
    this.respServices.commentPost(form.value).subscribe(res =>{
      this.router.navigateByUrl('/post');
    });
    console.log(form.value);
  }
}
