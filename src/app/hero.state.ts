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
  name:           'heroes',
  defaults: {
    selectedHero: null,
    heroes:       []
  }
})

