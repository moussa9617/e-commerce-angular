import { OrderItem } from './../../common/order-item';
import { Order } from './../../common/order';
import { Router } from '@angular/router';
import { CheckoutServiceService } from './../../services/checkout-service.service';
import { CartService } from './../../services/cart.service';
import { State } from './../../common/state';
import { Country } from './../../common/country';
import { ServiceShopFormService } from './../../services/service-shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerValidators } from 'src/app/validators/customer-validators';
import { Purchase } from 'src/app/common/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  totalPrice : number = 0 ;
  totalQuantity : number =0 ;

  creditCardMonth : number[] = [] ;
  creditCardYear : number[] = [] ;

  countries : Country[] = [] ;
  statesShipping : State[] = [] ;
  statesbilling : State[] = [] ;




  checkoutFormGroup! : FormGroup ;


  constructor(private formGroup : FormBuilder ,
              private serviceShopFormService : ServiceShopFormService,
              private cartService : CartService,
              private checkoutService: CheckoutServiceService ,
              private Router : Router
    ) { }

  ngOnInit(): void {
    this.reviwCartDetails();
    this.checkoutFormGroup = this.formGroup.group({
      customer : this.formGroup.group({
        firstName : new FormControl('',[Validators.required ,
                                        Validators.minLength(2),
                                        CustomerValidators.notOnlyWhiteSpace]),
        lastName : new FormControl('',[Validators.required ,Validators.minLength(2) ,CustomerValidators.notOnlyWhiteSpace]),
        email :new FormControl('',[Validators.required ,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), CustomerValidators.notOnlyWhiteSpace]),

      }),
      shippingAddress : this.formGroup.group({
        country :new FormControl('',[Validators.required ]),
        street : new FormControl('',[Validators.required ,
          Validators.minLength(2),
          CustomerValidators.notOnlyWhiteSpace]),
        city : new FormControl('',[Validators.required ,
          Validators.minLength(2),
          CustomerValidators.notOnlyWhiteSpace]),
        state : new FormControl('',[Validators.required ]),
        zipCode :new FormControl('',[Validators.required ,
          Validators.minLength(2),
          CustomerValidators.notOnlyWhiteSpace]),
      }),
      billingAddress : this.formGroup.group({
        country :new FormControl('',[Validators.required ]),
        street : new FormControl('',[Validators.required ,
          Validators.minLength(2),
          CustomerValidators.notOnlyWhiteSpace]),
        city : new FormControl('',[Validators.required ,
          Validators.minLength(2),
          CustomerValidators.notOnlyWhiteSpace]),
        state : new FormControl('',[Validators.required ]),
        zipCode :new FormControl('',[Validators.required ,
          Validators.minLength(2),
          CustomerValidators.notOnlyWhiteSpace]),
      }),
      creditCard : this.formGroup.group({
        cardType : new FormControl('',[Validators.required ]),
        nameOnCard : new FormControl('',[Validators.required , Validators.minLength(2),
          CustomerValidators.notOnlyWhiteSpace]),
        cardNumber :new FormControl('',[Validators.required , Validators.pattern('[0-9]{16}')]),
        securityCode : new FormControl('',[Validators.required , Validators.pattern('[0-9]{3}')]),
        ExpriationMonth : [''],
        ExpriationYear : ['']

      })
    });
    this.getMonthAndYearCreditCard();
    this.getCountries();
  }
  reviwCartDetails() {
      this.cartService.totalQuantity.subscribe(
       totalQuantity =>{
         this.totalQuantity =totalQuantity ;
       }
      ) ;
      this.cartService.totalPrice.subscribe(
        totalPrice => this.totalPrice =totalPrice
      ) ;

    }
    getMonthAndYearCreditCard(){
      const startMonth : number = new Date().getMonth() + 1 ;
      console.log(`start month  = ${startMonth}`);

      this.serviceShopFormService.getCreditCardMonths(startMonth).subscribe(
        data => {
          console.log(`retrevied credit card month  = ${JSON.stringify(data)}`);
          this.creditCardMonth = data ;
        }
      ) ;

      this.serviceShopFormService.getCreditCartYear().subscribe(
        data => {
          console.log(`retrevied credit card Year  = ${JSON.stringify(data)}`);
          this.creditCardYear = data ;
        }
      )

    }



onSubmit(){
      console.log(" information ");
      if(this.checkoutFormGroup.invalid){
        this.checkoutFormGroup.markAllAsTouched();
        return;
      }
      // set up order
      let order = new Order();
      order.totalPrice = this.totalPrice;
      order.totalQuantity = this.totalQuantity ;


      //get cart items

      const cartItem = this.cartService.cartItems ;

      //create orderItems form CartItems
      //long way
    /*  let orderItems : OrderItem[] = [] ;

      for (let i = 0; i < orderItems.length; i++) {
       orderItems[i] = new OrderItem(cartItem[i]);

      }*/

      //-short way

      let orderItems: OrderItem[] = cartItem.map(tempCartItem =>
        new OrderItem(tempCartItem)
        );

      //set up purchase

      let purchase = new Purchase();

      //populate purtache - customer
      purchase.customer = this.checkoutFormGroup.controls['customer'].value ;

      //populate purtache - shipping address
      purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
      const shippingAddressState : State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
      const shippingAddressCountry : Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
      purchase.shippingAddress!.state = shippingAddressState.name ;
      purchase.shippingAddress!.country = shippingAddressCountry.name ;



      //populate purtache - billingAddress
      purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
      const billingAddressState : State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
      const billingAddressCountry : Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
      purchase.billingAddress!.state = billingAddressState.name ;
      purchase.billingAddress!.country = billingAddressCountry.name ;


      //populate purtache - order and orderItems
      purchase.order = order ;
      purchase.orderItems = orderItems ;




      //call Rest API

        this.checkoutService.placeOrder(purchase).subscribe({
            next : response => {
              alert(`Your order has been recieved .\nOrder tracking number is  : ${response.orderTrackingNumber}`);
              this.resetCart();

            },
            error : err  => {
                 alert(`There was an error : ${err.message}`);
            }
          }
        );


}

 /*
  getter valisator
 */
get firstName(){return this.checkoutFormGroup.get('customer.firstName') ;}
get lastName(){return this.checkoutFormGroup.get('customer.lastName') ;}
get email(){return this.checkoutFormGroup.get('customer.email') ;}

/* shipping Address  */
get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country') ;}
get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street') ;}
get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city') ;}
get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode') ;}
get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state') ;}

/* billing address */
get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country') ;}
get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street') ;}
get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city') ;}
get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode') ;}
get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state') ;}

/*credit  card */
get cardType(){return this.checkoutFormGroup.get('creditCard.cardType') ;}
get nameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard') ;}
get cardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber') ;}
get securityCode(){return this.checkoutFormGroup.get('creditCard.securityCode') ;}



resetCart(){

  //reset cart data

  this.cartService.cartItems = [];
  this.cartService.totalPrice.next(0);
  this.cartService.totalQuantity.next(0);
 // reste form

 this.checkoutFormGroup.reset();

 // navigate to main page

 this.Router.navigateByUrl("/product");


}


copyShippingAddressToBillingAddress(event : any ){

  if(event.target.checked){
      this.checkoutFormGroup.get("billingAddress")?.setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      console.log( this.checkoutFormGroup.get("billingAddress")?.value);
      this.statesbilling=this.statesShipping;
  }else{
    this.checkoutFormGroup.controls['billingAddress'].reset();
  }

}

handleMonthAndYear(){
  const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
  const currentYear :  number  = new Date().getFullYear();
  const selectedYear  : number = Number(creditCardFormGroup?.value.ExpriationYear);


  let startMonth : number ;
  if(currentYear===selectedYear){
    startMonth = new Date().getMonth()+1 ;
  }else{
    startMonth =  1 ;
  }
  this.serviceShopFormService.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log(`retrevied credit card month  = ${JSON.stringify(data)}`);
      this.creditCardMonth = data ;
    }
  ) ;
}


getCountries(){
  this.serviceShopFormService.getCountries().subscribe(
    data=>{
      this.countries = data._embedded.countries;
      console.log(`countries  = ${JSON.stringify(this.countries)}`);
    }
  )


}

handleCountryAndState( form : string ){

  const formGroup = this.checkoutFormGroup.get(form);

  console.log(form);

  const codeCountry = formGroup?.value.country.code ;
  const nameCountry = formGroup?.value.country.name ;

  console.log(codeCountry);

  this.serviceShopFormService.getStateByCodeCountry(codeCountry).subscribe(
    data => {

        if(form==='shippingAddress'){
          this.statesShipping = data._embedded.states ;
        }else{
          this.statesbilling = data._embedded.states ;
        }

     formGroup?.get('state')?.setValue(data._embedded.states[0]);

    }
  )

}


}


