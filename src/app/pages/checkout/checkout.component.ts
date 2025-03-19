import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { CartItem } from '../../services/cart-item.entity';
import { CartSourceService } from '../../services/cart-source.service';
import { VatService } from '../../services/vat.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);

  items$ = this.cartSrv.items$;

  vat$ = this.vatSrv.vat$;

  protected updateQtySubject$ = new Subject<{id: string, quantity: number}>();
  protected destroyed$ = new Subject<void>();
  // protected subscription: Subscription | null = null;

  ngOnInit() {

    this.updateQtySubject$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(300)
      )
      .subscribe(({id, quantity}) => {
        this.cartSrv.setQuantity(id, quantity);
      });
  }

  ngOnDestroy() {
    //this.subscription?.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    this.updateQtySubject$.next({id: item.id, quantity: newQuantity});
  }

  trackById(_: number, item: CartItem) {
    return item.id;
  }
}
