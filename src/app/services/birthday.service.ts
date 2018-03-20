import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Birthday } from '../model/birthday';

@Injectable()
export class BirthdayService {
  
  birthdays: Birthday[];
  
  constructor(public _http: HttpClient) {
  }

  getCountries() {
    let url = 'https://restcountries.eu/rest/v2/all';
    return this._http.get(url);
  }

  saveBirthday(birthday: Birthday) {
    if (this.birthdays === null) {
      this.birthdays = [];
    }

    this.birthdays.push(birthday);
    localStorage.setItem('birthdays', JSON.stringify(this.birthdays));
  }

  loadBirthdays() {
    return this.birthdays = JSON.parse(localStorage.getItem('birthdays'));
  }
}
