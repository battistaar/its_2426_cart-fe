import { Component, inject } from '@angular/core';
import { Product } from '../../services/product.entity';
import { ProductService } from '../../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  protected productSrv = inject(ProductService);
  protected fb = inject(FormBuilder);

  filters = this.fb.group({
    name: '',
    minPrice: [null, {updateOn: 'submit', validators: [Validators.min(0)]}],
    maxPrice: [null, {updateOn: 'submit', validators: [Validators.min(0)]}]
  });

  products$ = this.filters.valueChanges
              .pipe(
                filter(_ => this.filters.valid),
                debounceTime(300),
                startWith({}),
                switchMap(filters => {
                  return this.productSrv.list(filters);
                })
              );

  ngOnInit() {
    this.filters.valueChanges.subscribe(f => {
      console.log(this.filters.invalid);
      console.log(f);
    });
  }

  addToCart(productId: string, quantity: number) {
    console.log(productId, quantity);
  }

  trackById(_: any, item: Product) {
    return item.id;
  }
}
