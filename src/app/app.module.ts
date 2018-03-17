import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';
import { BirthdayService } from './services/birthday.service';

@NgModule({
  declarations: [
    AppComponent,
    BirthdaysComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [BirthdayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
