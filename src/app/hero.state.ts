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
// このデコレータの後ろに記述されるクラスはStateクラスであることを指す
@State<HeroStateModel> ({
  // nameはStateの名前を指す
  name:           'heroes',
  // defaultsはHeroStateModelのデフォルト値を指す
  defaults: {
    selectedHero: null,
    heroes:       []
  }
})

// HeroStateクラスはStateクラスである
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

