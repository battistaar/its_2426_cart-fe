import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { productFiltersResolver } from './resolvers/product-filters.resolver';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductContainerComponent } from './pages/product-container/product-container.component';
import { productDetailResolver } from './resolvers/product-detail.resolver';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './utils/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
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
