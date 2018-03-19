import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { IAppState } from './store';
import { NgRedux } from 'ng2-redux';
import { LOAD_BIRTHDAY } from './actions';
import { BirthdayService } from './services/birthday.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService,
    router: Router,
    private ngRedux: NgRedux<IAppState>,
    _birthdayServices: BirthdayService) {

    //Load birthdays from localstorage on birthdayServices
    _birthdayServices.loadBirthdays();

    //Initialize Redux state
    if (JSON.parse(localStorage.getItem('birthdays'))) {
      this.ngRedux.dispatch({ type: LOAD_BIRTHDAY, birthdays: JSON.parse(localStorage.getItem('birthdays')) });
    }

    translate.setDefaultLang('en');
    localStorage.setItem('lang', '/en');
    
    //Set translate with router
    router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe((event: any) => {
        let activeRoute = event.url;
        activeRoute = activeRoute.substr(1, 2);
        if (activeRoute === 'es' || activeRoute === 'en' || activeRoute === 'pr') {
          translate.setDefaultLang(activeRoute);
          let lang = '/' + activeRoute;
          localStorage.setItem('lang', lang);
        }
      });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
