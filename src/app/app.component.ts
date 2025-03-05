import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartSourceService } from './services/cart-source.service';
import { VatService } from './services/vat.service';
import { Subject, takeUntil } from 'rxjs';
import { CartItem } from './services/cart-item.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);

  items$ = this.cartSrv.items$;

  vat$ = this.vatSrv.vat$;

  protected destroyed$ = new Subject<void>();
  // protected subscription: Subscription | null = null;

  ngOnInit() {
    this.vatSrv.setCountry('IT');

    // this.subscription = this.items$.subscribe(val => {
    //   console.log(val);
    // });
    this.items$
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(val => {
        console.log(val);
      });
  }

  ngOnDestroy() {
    //this.subscription?.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    this.cartSrv.setQuantity(item.id, newQuantity);
  }

  trackById(_: number, item: CartItem) {
    return item.id;
  }
}
