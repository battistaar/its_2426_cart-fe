import { Component, inject } from '@angular/core';
import { cart } from './utils/cart-data';
import { getVat } from './utils/cart-utils';
import { CartSourceService } from './services/cart-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected cartSrv = inject(CartSourceService);

  items = this.cartSrv.getCart();

  vat = getVat('IT');

  updateQuantity(item: any, newQuantity: number) {
    this.cartSrv.setQuantity(item.id, newQuantity);
    this.items = this.cartSrv.getCart();
  }

  trackById(_: number, item: any) {
    return item.id;
  }
}
