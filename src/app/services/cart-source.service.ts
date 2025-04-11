import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from './cart-item.entity';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class CartSourceService {
  protected http = inject(HttpClient);
  protected authSrv = inject(AuthService);

  protected _items$ = new BehaviorSubject<CartItem[]>([]);

  items$ = this._items$.asObservable();

  constructor() {
    this.authSrv.isAuthenticated$
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.fetch()
        } else {
          this._items$.next([]);
        }
      });
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

  addToCart(productId: string, quantity: number) {
    this.http.post<CartItem>('/api/cart', { productId, quantity})
      .subscribe(newItem => {
        const list = this._items$.value;
        const clone = structuredClone(list);
        const index = list.findIndex(el => el.id === newItem.id);

        if (index === -1) {
          clone.push(newItem);
        } else {
          clone[index] = newItem;
        }

        this._items$.next(clone);
      });
  }

  removeFromCart(id: string) {
    this.http.delete<CartItem>(`/api/cart/${id}`)
      .subscribe(_ => {
        const list = this._items$.value;
        const clone = structuredClone(list);
        const index = list.findIndex(el => el.id === id);

        if (index === -1) {
          return;
        }

        clone.splice(index, 1);
        this._items$.next(clone);
      });
  }
}
