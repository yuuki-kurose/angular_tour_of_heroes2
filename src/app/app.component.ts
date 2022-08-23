import { Component }                       from '@angular/core';
import { Select }                          from '@ngxs/store';
import { Emitter, Emittable }              from '@ngxs-labs/emitter';
import { Observable }                      from 'rxjs';

import { CounterState, CounterStateModel } from './store/counter.state';

@Component({
  selector:     'app-root',
  templateUrl:  './app.component.html',
  styleUrls:    ['./app.component.css']
})
export class AppComponent {
  @Select(CounterState)
    public count$: Observable<CounterStateModel>;
  
  @Emitter(CounterState.setValue)
    public counterValue: Emittable<number>;
}



