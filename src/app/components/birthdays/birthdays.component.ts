import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { BirthdayService } from '../../services/birthday.service';
import { Birthday } from '../../model/birthday';

//redux
import { NgRedux, select } from 'ng2-redux';
import { ADD_BIRTHDAY, LOAD_BIRTHDAY } from '../../actions';
import { IAppState } from '../../store';
declare var swal: any;


@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss']
})

export class BirthdaysComponent implements OnInit {
  @select() birthdays;

  now = new Date();
  birthdayDate: NgbDateStruct;

  countries: any;
  selectedCountries: any;

  month_names = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(
    public _birthdayServices: BirthdayService,
    config: NgbDatepickerConfig,
    private ngRedux: NgRedux<IAppState>
  ) {
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
  }

  ngOnInit() {
    //Get API Countries
    this.getCountries();

    //Save birthdays from localstorage on birthdayServices
    this._birthdayServices.loadBirthdays();

    //Initialize Redux state
    if (JSON.parse(localStorage.getItem('birthdays'))) {
      this.ngRedux.dispatch({ type: LOAD_BIRTHDAY, birthdays: JSON.parse(localStorage.getItem('birthdays')) });
    }

    //Initialize date on today
    this.birthdayDate = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
  }


  //Get countries for the services
  getCountries() {
    this._birthdayServices.getCountries()
      .subscribe((resp) => {
        this.countries = resp;
        this.selectedCountries = this.countries[0];
      });
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

  saveBirthday(form: NgForm) {
    if (form.valid) {
      //Create birthday
      let birthday = new Birthday(
        form.value.name,
        form.value.surname,
        form.value.countrySelect,
        new Date(form.value.dateSelected.year, form.value.dateSelected.month - 1, form.value.dateSelected.day)
      )

      //Redux
      let dateBirthday = new Date(form.value.dateSelected.year, form.value.dateSelected.month - 1, form.value.dateSelected.day)
      this.ngRedux.dispatch({ type: ADD_BIRTHDAY, birthday: birthday });

      //Save birthday on localstorage
      this._birthdayServices.saveBirthday(birthday);

      //Message
      let message = "Hello " + form.value.name + " from " + form.value.countrySelect.name + " on " + form.value.dateSelected.day + " of " + this.month_names[form.value.dateSelected.month] + " you will have " + this.getYears(form.value.dateSelected) + ".";
      swal("Register Complete", message, "success");
    } else {
      swal("Register incomplete", "Please complete all fields.", "error");
    }
  }

  showBirthday(birthday) {
    let date = new Date(birthday.date);
    let dateSelected: NgbDateStruct = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
    let mensaje = birthday.name + " from " + birthday.country.name + " on " + dateSelected.day + " of " + this.month_names[dateSelected.month] + " you will have " + this.getYears(dateSelected) + ".";

    swal("Hello !", mensaje);
  }

  //Compare to Select Countries
  compare(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
