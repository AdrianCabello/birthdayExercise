import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService,
    router: Router) {
    translate.setDefaultLang('es');
    router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe((event: any) => {
        let activeRoute = event.url;
        activeRoute = activeRoute.substr(1, 2);
        if(activeRoute === 'es' || activeRoute === 'en' || activeRoute === 'pr'){
          translate.setDefaultLang(activeRoute);
        }
      });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
