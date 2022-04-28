import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Product } from './../../common/product';
import { ProductService } from './../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details-component',
  templateUrl: './product-details-component.component.html',
  styleUrls: ['./product-details-component.component.css']
})
export class ProductDetailsComponentComponent implements OnInit {

  product : Product = new Product() ;


  constructor(private route :ActivatedRoute ,
    private productService :  ProductService
    ,private cartService  :CartService
    ) { }




  ngOnInit(): void {
    this.route.paramMap.subscribe(
      ()=> {  this.getproduct();}
    )
  }

    getproduct(){
    const   productId : number = +this.route.snapshot.paramMap.get('id')!;

  this.productService.getProduct(productId).subscribe(
       data => {
        this.product= data ;
       }
   )

    }

    addToCart(product :Product){
      console.log(product);

      const cartItem = new CartItem(product);
      this.cartService.addToCart(cartItem);


    }

}
