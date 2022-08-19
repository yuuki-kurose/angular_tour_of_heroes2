import { Injectable }              from '@angular/core';
import { Observable, of }          from 'rxjs';
import { catchError, map, tap }    from 'rxjs/operators';

import { MessageService }          from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero }                    from './hero';
import { HEROES }                  from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
   private http: HttpClient,
   private messageService: MessageService,
  ) { }

   // 頻繁に使用するからlog()でラップするとはどういうことなのか？
   private log(message: string) {
     this.messageService.add(`HeroService: ${ message }`);
   }

   private heroesUrl = 'api/heroes';

   /*
    * 長くて難しそうに見えるけど、handleError()はlogにエラーメッセージを出力し、
    * 実行を止めないようにする処理をしているだけ
    */
   private handleError<T>(operation = 'operation',result?: T) {
     return (error: any): Observable<T> => {
       console.error(error);
       this.log(`${ operation } failed: ${ error.message }`);
       return of(result as T);
     }
   }
  
  // getHeroes()はof関数によりデータが流され、Observableを返す
  getHeroes(): Observable<Hero[]> {
   return this.http.get<Hero[]>(this.heroesUrl)
     .pipe(
        catchError(this.handleError<Hero[]>('getHeroes',[]))
     );
   // messageServiceのadd()を使用し、()内のメッセージが追加される
   this.messageService.add('HeroService: fetched heroes');
  } 

  // HEROESの中から選択されたidを持つヒーローがObservableとなって返される 
  getHero(id: number): Observable<Hero> {
   const hero = HEROES.find(h => h.id === id)!;
   this.messageService.add(`HeroService: fetched hero id=${ id }`);
   return of(hero);
  }
}

