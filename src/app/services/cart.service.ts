import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems : CartItem[] = [];

  totalPrice : Subject<number> = new BehaviorSubject<number>(0);

  totalQuantity : Subject<number> =  new BehaviorSubject<number>(0);



  constructor() { }

  addToCart(theCartItem : CartItem){

    let alreadyExistCart : boolean = false  ;
    let existeCartItem! :  CartItem  ;

    if(this.cartItems.length > 0 ){
        for( let tempCartItem of this.cartItems){
            if(tempCartItem.id === theCartItem.id){
              existeCartItem = tempCartItem ;
              alreadyExistCart =true ;
              break;
            }
        }

    }
    if(alreadyExistCart){
      existeCartItem.quantity ++  ;
    }else{
     this.cartItems.push(theCartItem);
    }
    this.computeCartTotal();
  }


  computeCartTotal(){
    let totalPriceValue : number = 0 ;
    let totalItemsValue : number  = 0  ;
      for(let currentCartItem   of this.cartItems  ){
        console.log(`test2 = ${totalPriceValue}`);
        totalPriceValue = totalPriceValue + (currentCartItem.unitePrice * currentCartItem.quantity) ;
        console.log(`test2 = ${totalPriceValue}`);
        totalItemsValue +=  currentCartItem.quantity! ;
      }

      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalItemsValue);
      this.logCartData(totalPriceValue , totalItemsValue);
  }

  logCartData(totalPriceValue: number, totalItemsValue: number) {

    console.log("content of cart  : ...");

    for(let  item  of this.cartItems){
        const subTotalPrice = item.unitePrice! * item.quantity! ;
        console.log(`name :  ${item.name} unitePrice = ${item.unitePrice} subTotalprice  = ${subTotalPrice}  `);
    }
    console.log("--------1-");
    console.log(`totalPrice = ${totalPriceValue.toFixed(2)}`);
    console.log(`totalQuantity = ${totalItemsValue}`);
    console.log("----------");


  }

  decrementQuantity(cartItem :CartItem){
      cartItem.quantity-- ;
      if(cartItem.quantity == 0 ){
        this.remove(cartItem);
      }else{
        this.computeCartTotal();
      }

  }

  remove( cartItem : CartItem ){
    const indexItem = this.cartItems.findIndex(
      item=> item.id==cartItem.id
    );
    if(indexItem > -1 ){
      this.cartItems.splice(indexItem , 1 ) ;
      this.computeCartTotal();
    }
  }

}



