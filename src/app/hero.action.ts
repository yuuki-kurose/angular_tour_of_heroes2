import { Hero } from './hero';

// 複数のActionがある時は、namespaceでまとめることができる。
export namespace HeroAction {
  
  export const LOAD_HERO =   'Load_Hero';
  export const SELECT_HERO = 'Select_Hero';
  export const ADD_HERO =    'Add_Hero';
  export const DELETE_HERO = 'Delete_Hero';
  export const UPDATE_HERO = 'Update_Hero';

  //ここからコードが間違っていたので訂正していきます。↓

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






