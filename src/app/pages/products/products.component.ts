import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../services/product.entity';
import { ProductFilter, ProductService } from '../../services/product.service';
import { BehaviorSubject, catchError, debounceTime, map, Observable, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy, pick } from 'lodash';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  protected productSrv = inject(ProductService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  filters$: Observable<ProductFilter> = this.activatedRoute.queryParams
              .pipe(
                map(params => {
                  return pick(params, 'name', 'minPrice', 'maxPrice')
                }),
                map(params => {
                  return {
                    ...params,
                    minPrice: params.minPrice ? parseFloat(params.minPrice) : null,
                    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : null
                  }
                })
              );

  products$ = this.filters$
              .pipe(
                debounceTime(300),
                switchMap(filters => {
                  return this.productSrv.list(filters)
                    .pipe(
                      catchError(err => {
                        console.error(err);
                        return [];
                      })
                    )
                })
              );

  protected updateQueryParams$ = new Subject<ProductFilter>();

  protected destroyed$ = new Subject<void>();

  ngOnInit() {
    this.updateQueryParams$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(300),
        map(filters => omitBy(filters, val => val === ''))
      )
      .subscribe(filters => {
        this.router.navigate([], {queryParams: filters});
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addToCart(productId: string, quantity: number) {
    //console.log(productId, quantity);
  }

  trackById(_: any, item: Product) {
    return item.id;
  }

  setFilters(filters: ProductFilter) {
    this.updateQueryParams$.next(filters);
  }
}
