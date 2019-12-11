import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RoutesService } from './../../../service/routes.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  constructor(
    private api: RoutesService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
        // check the token in the cookies service
        const token = this.cookieService.get('token');
        this.api.authToken(token).subscribe((response) => {
        }, (error: HttpErrorResponse) => {
          console.log('error tienes que iniciar sesion');
          alert('You should be logged for posting');
          this.router.navigateByUrl('/home');
        });
  }

  


}
