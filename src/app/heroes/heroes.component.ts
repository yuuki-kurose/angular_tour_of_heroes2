import { Component, OnInit }  from '@angular/core';
import { Hero }               from '../hero';
import { HeroService }        from '../hero.service';

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

  // 選択されたヒーローが(idとname)selectedHeroプロパティに代入される
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /*
   * サービスからデータを取得するということは、
   * サービスにあるgetHeroes()を使用し取得するということ
   * heroesプロパティには[]が代入されているので型はいらない
   */ 
  getHeroes() :void {
    this.heroes = this.heroService.getHeroes();
  }
   
  /*
   * インスタンス生成時にプライベートなプロパティとして定義され、
   * 同時にheroServiceを注入する場所として認識される
   */
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
}


