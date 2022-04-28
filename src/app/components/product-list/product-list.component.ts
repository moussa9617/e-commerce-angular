import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Product } from './../../common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
 // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',

  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[]  = [];
  currentCategory : number =1   ;
  privousCategory : number = 1  ;
  searchMode : boolean = false ;

  thepage : number = 1 ;
  thesize : number = 5 ;
  thetotalElements  : number  =  0 ;
  thePrivoisKeyWord?  : string    ;



  constructor( private  productService : ProductService,
       private route : ActivatedRoute,
       private cartService : CartService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
    this.listProduct();
    });
  }

  listProduct(){
     this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log(this.searchMode);
      if(this.searchMode){
        this.handleSearchKyword();
      }else{
        this.handleListProduct();
      }
     //  this.handleListProduct();

  }


  handleSearchKyword(){
    const keyword : string = this.route.snapshot.paramMap.get('keyword')!;

      if(this.thePrivoisKeyWord != keyword){
        this.thepage = 1 ;
      }
      this.thePrivoisKeyWord = keyword ;
      console.log(`keyword  = ${keyword} and size = ${this.thesize}`);
    this.productService.getProductPaginationSearch(this.thepage -1  , this.thesize , keyword).subscribe(
      data => {
        this.products = data._embedded.products ;
        this.thepage = data.page.number +1;
        this.thesize = data.page.size ;
        this.thetotalElements = data.page.totalElements;
      }
    )

  }

  handleListProduct(){
     //check  if the id param has avraible
     const hasCategory : boolean = this.route.snapshot.paramMap.has('id');

     if(hasCategory){
       this.currentCategory = +this.route.snapshot.paramMap.get('id')!;
     }else{
       this.currentCategory = 1 ;
     }
     if(this.privousCategory != this.currentCategory){
       this.thepage = 1 ;
     }
     this.privousCategory = this.currentCategory ;
       console.log(`currentCategory  = ${this.currentCategory} and page = ${this.thepage}`);


    var a =   this.productService.getProductPagination(
                            this.thepage - 1  ,this.thesize , this.currentCategory
                           ).subscribe(
                            data => {
                              this.products = data._embedded.products ;
                              this.thepage = data.page.number +1;
                              this.thesize = data.page.size ;
                              this.thetotalElements = data.page.totalElements;
                              }
                           );

  }

  UpadatePageSize( value : number){
    console.log(value);
      this.thesize = value ;
      this.thepage = 1 ;
      this.listProduct();
  }

  addToCart(product :Product){
    console.log(product);

    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);


  }


}



