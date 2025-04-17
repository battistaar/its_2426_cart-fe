import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { VatService } from '../../services/vat.service';
import { calcCartItem } from '../../utils/cart-utils';
import { FormControl, Validators } from '@angular/forms';
import { CartSourceService } from '../../services/cart-source.service';
import { Product } from '../../services/product.entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  protected activatedRoute = inject(ActivatedRoute);
  protected productSrv = inject(ProductService);
  protected vatSrv = inject(VatService);
  protected cartSrv = inject(CartSourceService);
  protected authSrv = inject(AuthService);

  quantityInput = new FormControl(1, {nonNullable: true, validators: [Validators.required, Validators.min(1)]});

  product$: Observable<Product> = this.activatedRoute.data
              .pipe(
                map(data => data['product'])
              );

  protected cartItem$ = combineLatest([
                          this.product$,
                          this.vatSrv.vat$
                        ]).pipe(
                          map(([product, vat]) => {
                            return calcCartItem({product, id:'', quantity: 1}, vat);
                          })
                        );

  price$ = this.cartItem$.pipe(map(item => item.totalPrice));

  discount$ = this.cartItem$.pipe(map(item => item.discountAmount));

  protected destroyed$ = new Subject<void>();

  ngOnInit() {
    this.authSrv.isAuthenticated$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(authenticated => {
        authenticated ? this.quantityInput.enable() : this.quantityInput.disable();
      })
  }

  ngOnDestroy(){
    this.destroyed$.next();
    this.destroyed$.complete()
  }

  add(product: Product) {
    if (this.quantityInput.valid) {
      this.cartSrv.addToCart(product.id, this.quantityInput.value);
    }
  }
}
