import { Component, inject } from '@angular/core';
import { Product } from '../../services/product.entity';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  protected productSrv = inject(ProductService);

  products$ = this.productSrv.list();

  addToCart(productId: string, quantity: number) {
    console.log(productId, quantity);
  }

  trackById(_: any, item: Product) {
    return item.id;
  }
}
