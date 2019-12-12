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
    console.log(data.value)
    this.api.registerUser(data.value).subscribe((response) => {
      console.log(data.value);
      alert('usuario se ha guardado correctamente');
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

}
