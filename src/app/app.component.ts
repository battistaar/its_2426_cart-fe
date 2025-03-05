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

  items$ = this.cartSrv.items$;

  vat = getVat('IT');

  ngOnInit() {
    this.items$.subscribe(val => {
      console.log(val);
    })
  }

  updateQuantity(item: any, newQuantity: number) {
    this.cartSrv.setQuantity(item.id, newQuantity);
  }

  trackById(_: number, item: any) {
    return item.id;
  }
}
