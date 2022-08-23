import { Hero } from './hero';

// 複数のActionがある時は、namespaceでまとめることができる。
export namespace HeroAction {
  
  export const LOAD_HERO =   'Load_Hero';
  export const SELECT_HERO = 'Select_Hero';
  export const ADD_HERO =    'Add_Hero';
  export const DELETE_HERO = 'Delete_Hero';
  export const UPDATE_HERO = 'Update_Hero';

  export class Load {
    static readonly type = LOAD_HERO;
  }

  export class Select {
    static readonly type = SELECT_HERO;

    constructor(public id: number) {}
  }

  // 追加
  export class Add {
    static readonly type = ADD_HERO;

    constructor(public payload: Hero) {}
  }

  // 削除
  export class Delete {
    static readonly type = DELETE_HERO;

    constructor(public payload: Hero) {}
  }

  // 更新
  export class Update {
    static readonly type = UPDATE_HERO; 

    constructor(public payload: Hero) {}
  }
}







