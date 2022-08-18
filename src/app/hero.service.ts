import { Injectable }     from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Hero }           from './hero';
import { HEROES }         from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // HeroServiceが生成されるタイミングで、MessageServiceが注入される
  constructor(private messageService: MessageService) { }
  
  // getHeroes()はof関数によりデータが流され、Observableを返す
  getHeroes(): Observable<Hero[]> {
   const heroes = of(HEROES);
   // messageServiceのadd()を使用し、()内のメッセージが追加される
   this.messageService.add('HeroService: fetched heroes');
   return heroes; 
  } 

  // HEROESの中から選択されたidを持つヒーローがObservableとなって返される 
  getHero(id: number): Observable<Hero> {
   const hero = HEROES.find(h => h.id === id)!;
   this.messageService.add(`HeroService: fetched hero id=${ id }`);
   return of(hero);
  }
}

