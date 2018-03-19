import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from "@angular/router";

//Redux
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { IAppState, rootReducer, INITIAL_STATE } from './store';

//Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Services
import { BirthdayService } from './services/birthday.service';

// Routers
import { APP_ROUTING } from './app.routes';

//Components
import { AppComponent } from './app.component';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';
import { RevisitedComponent } from './components/revisited/revisited.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './services/guards/login.guard';
import { LoginService } from './services/login.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BirthdaysComponent,
    RevisitedComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    NgReduxModule,
    NgbModule.forRoot()
  ],
  providers: [BirthdayService, LoginGuard, LoginService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension) {
    let enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}

