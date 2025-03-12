import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from './cart-item.entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartSourceService {
  protected http = inject(HttpClient);
  protected _items$ = new BehaviorSubject<CartItem[]>([]);

  items$ = this._items$.asObservable();

  constructor() {
    this.fetch();
  }

  setQuantity(id: string, quantity: number) {
    this.http.patch<CartItem>(`/api/cart/${id}`, { quantity })
      .subscribe(updated => {
        const list = this._items$.value;

        const index = list.findIndex(i => i.id === id);
        const clone = structuredClone(list);
        clone[index] = updated;

        this._items$.next(clone);
      });
  }

  fetch() {
    this.http.get<CartItem[]>('/api/cart')
      .subscribe(items => this._items$.next(items));
  }
}
