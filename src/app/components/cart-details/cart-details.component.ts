import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  cartItems : CartItem[] = [];
  totalPrice : number = 0 ;
  totalQuantiry : number = 0 ;

  constructor(private cartservice :CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get a handle to cart items
    this.cartItems = this.cartservice.cartItems ;

    // subscribe to cart Total price
    this.cartservice.totalPrice.subscribe(
      data => this.totalPrice = data
  );

    //subscribe to cart total price

    this.cartservice.totalQuantity.subscribe(
      data => this.totalQuantiry = data
    )

    //compute cart total price and quantity
        this.cartservice.computeCartTotal();
  }
  incrementQuantity(cartItem : CartItem){
   this.cartservice.addToCart(cartItem);
  }

  decrementQuantity(cartItem : CartItem){
    this.cartservice.decrementQuantity(cartItem);
   }

   removeItem(cartItem : CartItem){
    this.cartservice.remove(cartItem);
   }



}
