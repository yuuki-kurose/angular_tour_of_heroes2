import { Component, OnInit }  from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}


