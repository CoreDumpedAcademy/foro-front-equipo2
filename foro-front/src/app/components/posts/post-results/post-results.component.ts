import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/service/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-results',
  templateUrl: './post-results.component.html',
  styleUrls: ['./post-results.component.css']
})
export class PostResultsComponent implements OnInit {

  public posts=[];
  constructor(private service: RoutesService,private router: Router) { }

  ngOnInit() {
    this.service.getPosts().subscribe(data =>{
      this.posts = data;
      console.log(this.posts);
    });
  }

}
