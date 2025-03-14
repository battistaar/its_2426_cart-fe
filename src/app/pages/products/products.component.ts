import { Component, inject } from '@angular/core';
import { Product } from '../../services/product.entity';
import { ProductFilter, ProductService } from '../../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, filter, map, ReplaySubject, startWith, switchMap } from 'rxjs';
import { ProductFilterEvent } from '../../components/product-filter/product-filter.component';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  protected productSrv = inject(ProductService);

  protected _filters$ = new BehaviorSubject<ProductFilter>({});
  filters$ = this._filters$.asObservable();

  products$ = this.filters$
              .pipe(
                debounceTime(300),
                switchMap(filters => {
                  return this.productSrv.list(filters);
                })
              );

  ngOnInit() {
  }

  addToCart(productId: string, quantity: number) {
    console.log(productId, quantity);
  }

  trackById(_: any, item: Product) {
    return item.id;
  }

  setFilters(filters: ProductFilter) {
    this._filters$.next(filters);
  }
}
