import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { select } from 'ng2-redux';
import { LoginService } from '../../services/login.service';
import { BirthdayService } from '../../services/birthday.service';
declare var swal: any;

@Component({
  selector: 'app-revisited',
  templateUrl: './revisited.component.html',
  styleUrls: ['./revisited.component.scss']
})
export class RevisitedComponent implements OnInit {

  @select() birthdays;

  lang: string;

  month_names = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(public _loginService: LoginService, public _birthdayService:BirthdayService) { }

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
  }

  //Function to get years olds
  getYears(date: NgbDateStruct) {
    let today = new Date();
    let year = today.getFullYear() - date.year;
    let m = today.getMonth() + 1 - date.month;

    if (m < 0 || (m === 0 && today.getDate() < date.day)) {
      year--;
    }

    return year;
  }

  showBirthday(birthday) {
    let date = new Date(birthday.date);
    let dateSelected: NgbDateStruct = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
    let mensaje = birthday.name + " from " + birthday.country.name + " on " + dateSelected.day + " of " + this.month_names[dateSelected.month] + " you will have " + this.getYears(dateSelected) + ".";

    swal("Hello !", mensaje);
  }

  logout() {
    this._loginService.logout();
  }


}
