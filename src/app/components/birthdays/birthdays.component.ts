import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
declare var swal: any;


@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss']
})
export class BirthdaysComponent implements OnInit {
  
  now = new Date();
  model: NgbDateStruct;
  date: {year: number, month: number};
  
  constructor() { }

  ngOnInit() {
  }

  selectToday() {
    this.model = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
  }

  saveBirthday(){
    swal("Good job!", "You clicked the button!", "success");
  }


}
