import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../services/product.entity';
import { getDiscountedPrice, getVatPrice } from '../../utils/cart-utils';

export type ProductCardAddEvent = {
  productId: string;
  quantity: number;
}

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnChanges {

  @Input()
  product!: Product;

  @Input()
  vat: number = 0;

  @Output()
  add = new EventEmitter<ProductCardAddEvent>();

  quantity: number = 1;

  price: number = 0;
  discount: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    const p = getVatPrice(this.product.netPrice, this.vat);
    this.price = getDiscountedPrice(p, this.vat);
    this.discount = p * this.product.discount;
  }

  onAdd() {
    this.add.emit({productId: this.product.id, quantity: this.quantity})
  }

}
