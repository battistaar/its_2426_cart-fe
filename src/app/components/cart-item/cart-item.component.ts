import { Component, EventEmitter, Input, Output } from '@angular/core';
import { calcCartItem } from '../../utils/cart-utils';
import { CartItem } from '../../services/cart-item.entity';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input({required: true})
  item!: CartItem;

  @Input()
  vat: number = 0;

  @Output('quantityChange')
  onQuantityChange = new EventEmitter<number>();

  getItemPrice(item: CartItem) {
    const calculated = calcCartItem(item, this.vat);
    return calculated.totalPrice;
  }

  getDiscountAmount(item: CartItem) {
    const calculated = calcCartItem(item, this.vat);
    return calculated.discountAmount;
  }

  quantityChange(value: number) {
    this.onQuantityChange.emit(value);
  }
}
