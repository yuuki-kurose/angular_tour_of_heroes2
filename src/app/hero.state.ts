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

  @Action(HeroAction.Add)
    addHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Add) {
      const hero = action.payload;

      return this.heroService.addHero(hero).pipe(
        finalize(() => {
          ctx.dispatch(new HeroAction.Load());
        }),
      );
    }

