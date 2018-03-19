import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  token: string;
  lang = localStorage.getItem('lang');

  constructor(public router: Router) {
    this.loadStorage();
  }

  login(nombre: string) {
    console.log(nombre)
    if (nombre == 'admin') {
      //simulates the response of the login service
      let tokenId: string = '123465798';
      this.saveStorage(tokenId);
      
      this.router.navigate([this.lang, 'revisited']);
      return true;
    } else {
      return false;
    }
  }

  saveStorage(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  isLogged() {
    return (this.token.length > 5) ? true : false;
  }

  logout(){
    this.token = '';
    localStorage.removeItem('token');
    
    this.router.navigate([this.lang, 'birthday']);
  }

}
