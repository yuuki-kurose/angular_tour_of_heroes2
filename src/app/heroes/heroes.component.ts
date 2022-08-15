import { Component, OnInit }  from '@angular/core';
import { Hero }               from '../hero';
import { HEROES }             from '../mock-heroes';

@Component({
  // selectorは差し込む際のタグの名前
  selector:     'app-heroes',
  templateUrl:  './heroes.component.html',
  styleUrls:    ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // 新たに作成したheroesプロパティにインポートしたHEROES(全ヒーローのデータ)を代入する
  heroes = HEROES;

  // selectedHeroプロパティを定義
  selectedHero?: Hero;

  // 選択されたヒーローが(idとname)selectedHeroプロパティに代入される
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

