import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http' ;
import { Routes , RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { ProductDetailsComponentComponent } from './components/product-details-component/product-details-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
 { path : "category/:id" ,component :ProductListComponent},
 { path : "category" ,component :ProductListComponent},
 { path : "checkout" ,component :CheckoutComponent},
 { path : "product" ,component :ProductListComponent},
 { path : "search/:keyword" ,component :ProductListComponent},
 { path : "products/:id" ,component : ProductDetailsComponentComponent},
 { path : "cart-details" ,component :CartDetailsComponent},

 { path : "" ,redirectTo : "/product", pathMatch : "full"},
 { path : "**" ,redirectTo : "/product" , pathMatch : "full"}



];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponentComponent,
    ProductDetailsComponentComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
