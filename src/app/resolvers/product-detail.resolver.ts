import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.entity';
import { catchError, of } from 'rxjs';

export const productDetailResolver: ResolveFn<Product> = (route, state) => {
  const productSrv = inject(ProductService);
  const router = inject(Router);

  const id = route.paramMap.get('id');
  if (!id) {
    return new RedirectCommand(router.parseUrl('/products'));
  }

  return productSrv.getById(id)
    .pipe(
      catchError(_ => {
        return of(new RedirectCommand(router.parseUrl('/products')));
      })
    );

  // const id = route.paramMap.get('id')!;
  // return productSrv.getById(id);
};
