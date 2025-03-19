import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { productFiltersResolver } from './resolvers/product-filters.resolver';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductContainerComponent } from './pages/product-container/product-container.component';
import { productDetailResolver } from './resolvers/product-detail.resolver';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'products',
    component: ProductContainerComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
        resolve: {
          filters: productFiltersResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: {
          product: productDetailResolver
        }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
