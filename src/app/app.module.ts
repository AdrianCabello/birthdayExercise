import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Redux
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { IAppState, rootReducer, INITIAL_STATE } from './store';

//Services
import { BirthdayService } from './services/birthday.service';

//Components
import { AppComponent } from './app.component';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';



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
    NgReduxModule,
    NgbModule.forRoot()
  ],
  providers: [BirthdayService],
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

