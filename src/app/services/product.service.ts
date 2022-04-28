import { ProductCategory } from './../common/product-category';
import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private urlBase = 'http://localhost:8080/api/products' ;
  private categoryUrl = 'http://localhost:8080/api/product-category' ;

  constructor( private httpClient  : HttpClient) {
   }
   getProductList ( categoryId : number) : Observable<Product[]> {

    const searchUrl = `${this.urlBase}/search/findByCategoryId?id=${categoryId}`;


    return  this.getProducts(searchUrl);
  }


  getSearchProduct ( keyword : string) : Observable<Product[]> {

    console.log(keyword);
    const searchUrl = `${this.urlBase}/search/findByNameContaining?name=${keyword}`;

    return  this.getProducts(searchUrl);
  }

   private getProducts( uri : string ) :Observable<Product[]> {
     return this.httpClient.get<GetProductResponse>(uri).pipe
     (
       map( Response => Response._embedded.products)
     );
   }


  /*****
   *
   */
   getProduct ( productId : number) : Observable<Product> {

    const uri = `${this.urlBase}/${productId}` ;

    return this.httpClient.get<Product>(uri);

  }
  getProductCategory() :  Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe
    (
      map( Response => Response._embedded.ProductCategory)
    );

  }

  getProductPagination(
                  thePage : number ,
                  theSize : number ,
                  theCategoryId : number
                                ) :  Observable<GetProductResponse> {

     const uri = `${this.urlBase}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetProductResponse>(uri) ;

  }




  getProductPaginationSearch(
    thePage : number ,
    theSize : number ,
    theKeyWord : string
                  ) :  Observable<GetProductResponse> {
                      console.log("test");
const uri = `${this.urlBase}/search/findByNameContaining?name=${theKeyWord}&page=${thePage}&size=${theSize}`;

return this.httpClient.get<GetProductResponse>(uri) ;

}

}





interface GetResponseProductCategory{
  _embedded :{
    ProductCategory : ProductCategory[];
  }
}

interface GetProductResponse{
  _embedded :{
    products : Product[];
  },
    page : {
    size :number ,
    totalElements : number,
    totalPages : number,
    number : number
  }

}

