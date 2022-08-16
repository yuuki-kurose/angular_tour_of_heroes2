import { Injectable }     from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero }           from './hero';
import { HEROES }         from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // getHeroes()はof関数によりデータが流され、Observableを返す
  getHeroes(): Observable<Hero[]> {
   const heroes = of(HEROES);
   return heroes;
  } 

  constructor() { }
}
