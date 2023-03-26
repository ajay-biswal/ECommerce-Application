import { Component, OnInit } from '@angular/core';
import { SignUp, cart, login, product } from '../datatype';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = " ";
  product: any|product;
  constructor(private user:UserService) { }
  ngOnInit(): void {
    this.user.userAuthReload(); 
  }
  signUp(data:SignUp) {
    console.warn(data);
    this.user.userSignUp(data)
    
  }

  login(data:login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn("apple", result);
      if (result) {
        this.authError= "Enter Valid details"
      } else {
        this.localCartToRemoteCart()
      }
      
    })
    
  }

  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList:product = JSON.parse(data)
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id

      cartDataList.forEach((product:product) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result:any) => {
            if (result) {
              console.warn("Item stored in db");
              
            }
          })
          // if (cartDataList.length === index + 1) {
          //   localStorage.removeItem('localCart);
          // }
        }, 500);
      });
    }
  }
}
