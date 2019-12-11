import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutesService  } from '../../../service/routes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private api: RoutesService,
  ) { }

  ngOnInit() {
  }


  register(data) {
    this.api.registerUser(data.value).subscribe((response) => {
      alert('usuario se ha guardado correctamente');
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

}
