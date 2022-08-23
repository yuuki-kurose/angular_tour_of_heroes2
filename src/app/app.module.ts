import { NgModule }                       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { FormsModule }                    from '@angular/forms';
import { AppRoutingModule }               from './app-routing.module';
import { HttpClientModule }               from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { NgxsModule }                     from '@ngxs/store';
import { NgxsLoggerPluginModule }         from '@ngxs/logger-plugin';
import { HeroState }                      from './hero.state';

import { InMemoryDataService }            from './in-memory-data.service';

import { AppComponent }                   from './app.component';
import { HeroesComponent }                from './heroes/heroes.component';
import { HeroDetailComponent }            from './hero-detail/hero-detail.component';
import { MessageComponent }               from './message/message.component';
import { DashboardComponent }             from './dashboard/dashboard.component';
import { HeroSearchComponent }            from './hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,{ dataEncapsulation: false }
    ),
    NgxsModule.forRoot([
      HeroState
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
