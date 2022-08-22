import { Hero } from './hero';

// 複数のActionがある時は、namespaceでまとめることができる。
export namespace HeroAction {
  // 追加
  export class Add {
    static readonly type = '[Hero] Add';

    constructor(public hero: Hero) {}
  }

  // 削除
  export class Delete {
    static readonly type = '[Hero] Delete';

    constructor(public hero: Hero | number) {}
  }

  // 更新
  export class Update {
    static readonly type = '[Hero] Update';

    constructor(public hero: Hero) {}
  }

  // 取得
  export class get {
    static readonly type = '[Hero] Get';

    constructor(public id: number) {}
  }

  // 全て取得
  export class getAll {
    static readonly type = '[Hero] GetAll';
  }
}




