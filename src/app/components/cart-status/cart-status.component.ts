import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

   totalPrice : number  = 0.00 ;
   quantity : number  = 0 ;

  constructor( private cartService  :CartService) { }

  ngOnInit(): void {
    this.upDateCart();
  }
  upDateCart() {


// total price

    this.cartService.totalPrice.subscribe(
        data => this.totalPrice = data
    );

    //subcribe quantity

    this.cartService.totalQuantity.subscribe(
      data  => this.quantity = data
    )


  }

}
