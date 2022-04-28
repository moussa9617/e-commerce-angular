import { ProductService } from './../../services/product.service';
import { ProductCategory } from './../../common/product-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories? : ProductCategory[];
  constructor(
    private productService :  ProductService
  ) { }

  ngOnInit() {
    console.log("goooooooooo");
    this.listProductCategories();
  }

  listProductCategories(){
    this.productService.getProductCategory().subscribe(
      data => {
        this.productCategories = data ;
      }
    )
  }

}
