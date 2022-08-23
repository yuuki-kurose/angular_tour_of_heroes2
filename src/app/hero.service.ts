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

   /**
     *  長くて難しそうに見えるけど、handleError()はlogにエラーメッセージを出力し
     *  実行を止めないようにする処理をしているだけ
     */
   private handleError<T>(operation = 'operation',result?: T) {
     return (error: any): Observable<T> => {
       console.error(error);
       this.log(`${ operation } failed: ${ error.message }`);
       return of(result as T);
     }
   }

   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

  
  // getHeroes()はof関数によりデータが流され、Observableを返す
  getHeroes(): Observable<Hero[]> {
   return this.http.get<Hero[]>(this.heroesUrl)
     .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
     );
     // messageServiceのadd()を使用し、()内のメッセージが追加される
     this.messageService.add('HeroService: fetched heroes');
  } 

  // HEROESの中から選択されたidを持つヒーローがObservableとなって返される 
  getHero(id: number): Observable<Hero> {
    const url = `${ this.heroesUrl }/ ${ id }`; 
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${ id }`)),
      catchError(this.handleError<Hero>(`getHero id=${ id }`))
    );
  }
  
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${ hero.id }`)),
      catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${ newHero.id }`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id =  typeof hero === 'number' ? hero: hero.id;
    const url = `${ this.heroesUrl }/${ id }`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${ id }`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${ this.heroesUrl }/?name=${ term }`).pipe(
      tap(_ => this.log(`found heroes maching "${ term }"`)),
      catchError(this.handleError<Hero[]>('searchHeroes',[]))
    );
  }
}

