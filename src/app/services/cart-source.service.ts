import { Injectable } from '@angular/core';
import { cart } from '../utils/cart-data';

@Injectable()
export class CartSourceService {
  protected items: any[] = [...cart];

  getCart() {
    return this.items;
  }

  setQuantity(id: string, quantity: number) {
    const index = this.items.findIndex(i => i.id === id);
    const clone = structuredClone(this.items);
    clone[index].quantity = quantity;

    this.items = clone;
  }
}
