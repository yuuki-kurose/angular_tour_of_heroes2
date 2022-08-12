import { Component, OnInit }  from '@angular/core';
import { Hero }             from '../hero';

@Component({
  // selectorは差し込む際のタグの名前
  selector:     'app-heroes',
  templateUrl:  './heroes.component.html',
  styleUrls:    ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // インポートしたHeroにより、heroプロパティにデータ型が設定できる
  hero: Hero = { id: 1, name: 'Windstorm' }

  constructor() { }

  ngOnInit(): void {
  }

}

