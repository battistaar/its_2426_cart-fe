import { Component, inject } from '@angular/core';
import { CartSourceService } from '../../services/cart-source.service';
import { combineLatest, interval, map } from 'rxjs';
import { calcCartItem, getTransportFee } from '../../utils/cart-utils';
import { VatService } from '../../services/vat.service';

@Component({
  selector: 'app-side-cart',
  standalone: false,
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css'
})
export class SideCartComponent {
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);

  items$ = combineLatest([
      this.cartSrv.items$,
      this.vatSrv.vat$
    ])
    .pipe(
      map(([items, vat]) => {
        return items.map(item => calcCartItem(item, vat))
      })
    );

  total$ = this.items$
    .pipe(
      map(items => {
        const totalPrice = items.reduce((prev, curr) => {
          return prev + curr.totalPrice;
        }, 0);

        const totalWeight = items.reduce((prev, curr) => {
          return prev + curr.totalWeight;
        }, 0);

        const transportFee = getTransportFee(totalWeight);
        return totalPrice + transportFee;
      })
    );

  remove(id: string) {
    this.cartSrv.removeFromCart(id);
  }
}
