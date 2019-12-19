import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutesService  } from '../../../service/routes.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private api: RoutesService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
  }


  register(data) {
    console.log(data.value)
    this.api.registerUser(data.value).subscribe((response: { token: string }) => {
      console.log(response.token);
      this.cookieService.set('token', response.token);
      this.api.token(response.token);
      alert('usuario se ha guardado correctamente');
      window.location.reload();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

}
