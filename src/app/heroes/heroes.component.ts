import { Component, OnInit } from '@angular/core';

@Component({
  // selectorは差し込む際のタグの名前
  selector:     'app-heroes',
  templateUrl:  './heroes.component.html',
  styleUrls:    ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // ヒーローの名前を表示する為、heroプロパティを追加する
  hero = "Windstorm";

  constructor() { }

  ngOnInit(): void {
  }

}

