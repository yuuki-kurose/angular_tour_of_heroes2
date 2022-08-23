import { Component, OnInit } from '@angular/core';

import { Observable }        from 'rxjs';

import { Store, Select }     from '@ngxs/store';
import { HeroAction }        from '../hero.action';
import { HeroState }         from '../hero.state';

import { Hero }              from '../hero';

@Component({
  selector:    'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:   ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  @Select(HeroState.heroes) heroes$?: Observable<Hero[]>;

  // サービスからデータが流れてくるのではなく、NgxsのStoreで状態が管理される
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(new HeroAction.Load())
  }

}


