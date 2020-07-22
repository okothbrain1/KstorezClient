import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { first } from 'rxjs/operators';
interface CategoryList{
  name:string;
  imageUrl:string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items: Observable<any[]>;
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

 //Declaring an array to hold the product items
 public itemList: any[];
 
 CategoryData: CategoryList[] = [
  { name: 'Men', imageUrl:'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_1080/https://www.kstorez.com/wp-content/uploads/2020/06/WhatsApp-Image-2020-06-22-at-15.59.20.jpeg' },
  { name: 'Women', imageUrl:'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_626/https://www.kstorez.com/wp-content/uploads/2020/06/foot-heels-shoe-girl-women_1203-6517.jpg'},
  { name: 'Bag', imageUrl:''},
  { name: 'Cosmetics', imageUrl:''},
  { name: 'Sports', imageUrl:''},
  { name: 'Smart Phones', imageUrl:'https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_765/https://www.kstorez.com/wp-content/uploads/2020/05/apple-iphone-xr-64gb.jpg'},    
];

 
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  color: string;
 
  constructor(private cartService: CartService, private modalCtrl: ModalController,private firestore: AngularFirestore) {
    
  }

 
  async ngOnInit() {
    //this.items = this.cartService.retrieve_products();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.itemList = await this.initializeItems();
  }
//function to fetch the items when a query is to be performed
  async initializeItems(): Promise <any>{
    const itemList = await this.firestore.collection('items').valueChanges().pipe(first()).toPromise();
    return itemList;
    
  }
//function to filter the items when the user starts the search task
async filterList(evt){
  this.itemList = await this.initializeItems();
  const searchTerm = evt.srcElement.value;
  if(!searchTerm){
    return;
  }
  this.itemList = this.itemList.filter(currentItem => {
    if (currentItem.ProductName && searchTerm) {
      return (currentItem.ProductName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }
  });
} 

  addToCart(product) {
    this.cartService.addProduct(product);
  
  }
  //function to change button color (heart) onclick
public ionicNamedColor: string = 'primary';
public toggleNamedColor(event): void{
  if(this.ionicNamedColor === 'primary'){
    this.ionicNamedColor ='secondary'
  }else{
    this.ionicNamedColor ='primary'
  }
}


 

}
