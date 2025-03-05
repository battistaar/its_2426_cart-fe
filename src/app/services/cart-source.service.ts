import { Injectable } from '@angular/core';
import { cart } from '../utils/cart-data';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class CartSourceService {
  protected _items$ = new BehaviorSubject<any[]>([...cart]);

  items$ = this._items$.asObservable();

  setQuantity(id: string, quantity: number) {
    const list = this._items$.value;

    const index = list.findIndex(i => i.id === id);
    const clone = structuredClone(list);
    clone[index].quantity = quantity;

    this._items$.next(clone);
  }
}
