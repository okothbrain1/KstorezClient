import { CartService, Product } from '../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import {Router} from'@angular/router';
declare var window;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cart: Product[] = [];
 
  constructor(public router:Router,private cartService: CartService, private modalCtrl: ModalController, private alertCtrl: AlertController) { 
    window.home = this;
  }
 
  ngOnInit() {
    this.cart = this.cartService.getCart();
  } 
  RedirectToPayments(){
    this.router.navigateByUrl('/payments');
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.Price * j.Amount, 0);
  }
  
  
 
  close() {
    this.modalCtrl.dismiss();
  }
 

}
