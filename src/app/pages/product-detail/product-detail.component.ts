import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  protected activatedRoute = inject(ActivatedRoute);
  protected productSrv = inject(ProductService);

  product$ = this.activatedRoute.paramMap
              .pipe(
                map(params => params.get('id')),
                switchMap(id => this.productSrv.getById(id!))
              );

  ngOnInit() {
    // this.activatedRoute.paramMap
    //   .pipe(
    //     map(params => params.get('id'))
    //   )
    //   .subscribe(id => {
    //     console.log(id);
    //   });
  }
}
