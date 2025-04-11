import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';

import localeIt from '@angular/common/locales/it';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';
import { CartSourceService } from './services/cart-source.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { SideCartComponent } from './components/side-cart/side-cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductContainerComponent } from './pages/product-container/product-container.component';
import { LoginComponent } from './pages/login/login.component';
import { authInterceptor } from './utils/auth.interceptor';
import { logoutInterceptor } from './utils/logout.interceptor';
import { IfAuthenticatedDirective } from './utils/if-authenticated.directive';
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    CartItemComponent,
    DiscountAmountPipe,
    SummaryComponent,
    CheckoutComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductFilterComponent,
    SideCartComponent,
    ProductDetailComponent,
    ProductContainerComponent,
    LoginComponent,
    IfAuthenticatedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: LOCALE_ID, useValue: 'it-IT' },
    CurrencyPipe,
    CartSourceService,
    provideHttpClient(
      withInterceptors([authInterceptor, logoutInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
