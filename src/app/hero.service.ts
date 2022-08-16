import { Injectable }     from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Hero }           from './hero';
import { HEROES }         from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // getHeroes()はof関数によりデータが流され、Observableを返す
  getHeroes(): Observable<Hero[]> {
   const heroes = of(HEROES);
   // messageServiceのadd()を使用し、()内のメッセージが追加される
   this.messageService.add('HeroService: fetched heroes');
   return heroes; 
  } 

  // HeroServiceが生成されるタイミングで、MessageServiceが注入される
  constructor(private messageService: MessageService) { }
}

