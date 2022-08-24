import { State, StateContext } from '@ngxs/store';
import { receiver }            from '@ngxs-labs/emitter';

import { HeroStateModel }      from './hero.state';

@State<HeroStateModel> ({
   name:    'heroes',
   default: selectedHero: undefined,
            heroes:       []
})
