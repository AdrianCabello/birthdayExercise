import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
declare var swal: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  lang = localStorage.getItem('lang');

  constructor(public _loginService: LoginService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (!this._loginService.login(form.value.password)) {
      swal("Incorrect credentials", "Please try again.", "error");
    }
  }
}