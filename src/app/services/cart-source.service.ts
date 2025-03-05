import { Injectable } from '@angular/core';
import { cart } from '../utils/cart-data';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartSourceService {
  protected _items$ = new BehaviorSubject<CartItem[]>([...cart]);

  items$ = this._items$.asObservable();

  setQuantity(id: string, quantity: number) {
    const list = this._items$.value;

    const index = list.findIndex(i => i.id === id);
    const clone = structuredClone(list);
    clone[index].quantity = quantity;

    this._items$.next(clone);
  }
}
