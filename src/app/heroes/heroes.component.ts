import { Component, OnInit }  from '@angular/core';

import { Hero }               from '../hero';
import { HeroService }        from '../hero.service';
import { MessageService }     from '../message.service'; 

@Component({
  // selectorは差し込む際のタグの名前
  selector:     'app-heroes',
  templateUrl:  './heroes.component.html',
  styleUrls:    ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
	
  //Hero型のheroesプロパティを定義から宣言へ変更
  heroes: Hero[] = [];  
  
  // selectedHeroプロパティを定義
  selectedHero?: Hero;
   
  /*
   * インスタンス生成時にプライベートなプロパティとして定義され、
   * 同時にheroServiceを注入する場所として認識される
   */
  constructor(
    private heroService: HeroService, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

   // 選択されたヒーローが(idとname)selectedHeroプロパティに代入される
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${ hero.id }`);
  }
  
   /*
   * サービスからデータを取得するということは、
   * サービスにあるgetHeroes()を使用し取得するということ
   * heroesプロパティには[]が代入されているので型はいらない
   */
  getHeroes() :void {
    this.heroService.getHeroes()
     //Observable(川)から流れてきた値(value)をsubscribe(購読)する
     .subscribe(heroes => this.heroes = heroes);
  }
}


