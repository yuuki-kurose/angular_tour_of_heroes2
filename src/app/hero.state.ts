import { Injectable }                                  from '@angular/core';

import { Observable }                                  from 'rxjs';
import { tap, finalize }                               from 'rxjs/operators';

import { Receiver }                                    from '@ngxs-labs/emitter';
import { State, Action, StateContext, Selector }       from '@ngxs/store';
import { Emittable, Emitter, EmitterAction }           from '@ngxs-labs/emitter';

import { Hero }                                        from './hero';
import { HeroAction }                                  from './hero.action';
import { HeroService }                                 from './hero.service';

// StateModelの型を定義
export interface HeroStateModel {
  selectedHero?: Hero; 
  heroes?:       Hero[];
}

@State<HeroStateModel> ({
  name:           'heroes',
  defaults: {
    selectedHero: undefined,
    heroes:       []
  }
})

// Stateクラス内で、Receiverを定義する
@Injectable()
export class HeroState {

  constructor(private heroService: HeroService) {}


  @Receiver()
    static heroes(state: HeroStateModel) {
      return state.heroes;
    }

  @Receiver()
    static selectedHero(state: HeroStateModel) {
      return state.selectedHero;
    }

  @Action(HeroAction.Load)
    load(ctx: StateContext<HeroStateModel>) {
      return this.heroService.getHeroes()
        .pipe(
           tap((data) => {
             ctx.patchState({
               heroes: data
             });
           }),
        )
    }

  @Action(HeroAction.Select)
    select(ctx: StateContext<HeroStateModel>, action: HeroAction.Select) {
      const id = action.id;
      return this.heroService.getHero(id)
        .pipe(
           tap((data: Hero) => {
             ctx.patchState({
               selectedHero: data
             });
           }),
        )
    }
  
  @Action(HeroAction.Add)
    addHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Add) {
      const hero = action.payload;

      return this.heroService.addHero(hero).pipe(
        finalize(() => {
          ctx.dispatch(new HeroAction.Load());
        }),
      );
    }

  @Action(HeroAction.Delete)
    deleteHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Delete) {
      const hero = action.payload;
      const id =   typeof hero === 'number' ? hero: hero.id;

      return this.heroService.deleteHero(hero).pipe(
        finalize(() => {
          ctx.dispatch(new HeroAction.Load());
        }),
      );
    }

  @Action(HeroAction.Update)
    updateHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Update): Observable<any> {
      const hero = action.payload;

      return this.heroService.updateHero(hero);
    }
}

