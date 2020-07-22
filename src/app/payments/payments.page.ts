import { Component, OnInit } from '@angular/core';
import { NgForm ,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { Product,CartService } from '../services/cart.service';
import { FirebaseService } from '../services/firebase.service';

declare var window;

declare let Email : any;
declare var makePayment: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})

export class PaymentsPage implements OnInit {  
  cart = this.cartService.getCart(); 
  
  
  //from the form  
  name :string; 
  town :string;
  phone :string;
  email:string;
  ship_address:string;
  pay_method :string;
   
  //cart: Product[] = [];
  constructor( private cartService: CartService,public alertController: AlertController,private fbs:FirebaseService) {
   
   }
  ngOnInit() {  
    this.cart = this.cartService.getCart(); 
    //adding order values to orders array
   
  }
 
//creating the product list containing the name and the number 
//of items
ProductList = [];



  total():number{
    return window.home.getTotal();
  }
  //payment amoiunt
  pay_amount:number=this.total();

  //getting today's date
  pipe = new DatePipe('en-RW');
  today:string = new Date().toDateString();
    //for email
  body_mail_order:string;    
    //function for alert
    async presentAlert(noti_header:string,noti_subheader:string,noti_message:string){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: noti_header,
        subHeader: noti_subheader,
        message: noti_message,
        buttons: ['OK']
      });  
       alert.present();
    }
    //general function for sending emails
    email_customer(receiver_email:string,subject:string, body:string){
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "alexnewzniyo@gmail.com",
        Password : "C18C89757270B98191EE45EAB7FB47A7ABE7",
        To : receiver_email,
        From : "alexnewzniyo@gmail.com",
        Subject : subject,
        Body : body
        });
    }
    //function for sending order email
    orderEmail(){                
      this.email_customer(this.email,'Your Order',this.body_mail_order);
    }    
    //function that manages payment and orders
  pay() { 
    //the body of order email    
  this.body_mail_order="<table><thead><tr style='background-color: maroon;color: white;'>"+
  "<th colspan='2'><h1><br>Thank you for your order</h1></th></tr></thead><tbody><tr>"+
   "<td colspan='2'><br>Hi <b>"+this.name+",</b> <br><br>Just to let you know — we've received "+
   "your order <b>#9412</b> ,and it is now being processed:<br><br>Payment Method : <b>"+this.pay_method+".</b><br>"+
   "<h2><b>[Order #9412] ("+this.today+")</b></h2></td></tr><tr><td><b>Products</b></td>"+
   "<td>Denim Jeans(3in1) - 32 [x 2] <br><br></td></tr> <b><br><tr><td><b>Amount</b></td>"+
   "<td>30,000 Frw <br><br></td></tr><tr><td><b>Shipping</b></td><td>Free Shipping <br><br></td>"+
   "</tr><tr><td><b>Total</b></td><td>30,000 Frw <br><br></td></tr><tr><td><b>Shipping Address</b></td>"+
   "<td>"+this.ship_address+" <br><br></td></tr></tbody><tfoot><tr><th colspan='2'>Thank you for shopping with"+
   "<a href='https://kstorez.com'>Kstorez</a></th></tr></tfoot></table>";   

   //checking the payment method chosen by the customer
    if(this.pay_method == "mobile Money / credit card"){
      //this.presentAlert("Order Received","Dear,"+ this.name, "We have received your order. we are now processing it.");
      //saving the order details in the database
      this.fbs.createOrder( { 
        amount:this.pay_amount,
        cust_email: this.email,
        cust_name: this.name,
        cust_phone:this.phone,
        products: this.cartService.getCart(),
        ref:"23436565",
        ship_address:this.ship_address,
        status:"unpaid"          
      });
      //email customer
      this.orderEmail();
      //proceeding with payment
      makePayment(this.pay_amount,this.email,this.phone,this.name);
    } else{
      //sending order email
      this.orderEmail();
      //saving the order details in the database
      this.fbs.createOrder( { 
        amount:this.pay_amount,
        cust_email: this.email,
        cust_name: this.name,
        cust_phone:this.phone,
        products:"rice [x 2]",
        ref:"23436565",
        ship_address:this.ship_address,
        status:"unpaid"          
      });
      //sending an alert
      //this.presentAlert("Order Received","Dear,"+ this.name, "We have received your order. we are now processing it.");
    }    
  }
  
  sendSms(){ 
      }
        
}
