import { Observable }                            from 'rxjs';
import { tap, finalize }                         from 'rxjs/operators';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Hero }                                  from './hero';
import { HeroAction }                            from './hero.action';
import { HeroService }                           from './hero.service';

export class HeroStateModel {
  selectedHero: Hero | undefined;
  heroes:       Hero[] | undefined;
}

@State<HeroStateModel> ({
  // nameはStateの名前を指す
  name:           'heroes',
  // defaultsはHeroStateModelのデフォルト値を指す
  defaults: {
    selectedHero: null,
    heroes:       []
  }
})

export class HeroState {
  // 依存性の注入
  constructor(private heroService: HeroService) {}

  // ここからセレクター↓
  @Selector()
    static heroes(state: HeroStateModel) {
      return state.heroes;
  }

  @Selector()
    static selectedHero(state: HeroStateModel) {
      return state.selectedHero;
  }
