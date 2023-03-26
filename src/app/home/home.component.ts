import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../datatype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  popularProduct: undefined | product[]
  trendyProducts: undefined | product[]
  constructor(private product:ProductService) { }
  ngOnInit(): void{
    this.product.popularProduct().subscribe((data) => {
      console.warn(data);
      this.popularProduct = data;
      
    });
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    })
  }
}
