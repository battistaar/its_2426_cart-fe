import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product.entity';
import { isNil, omitBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected http = inject(HttpClient);

  list(filters: any = {}) {
    const q = omitBy(filters, isNil);
    return this.http.get<Product[]>('/api/products', { params: q});
  }
}
