import { Component, OnInit } from '@angular/core';
import {PaymentsPage} from 'src/app/payments/payments.page';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.page.html',
  styleUrls: ['./payment-confirm.page.scss'],
})
export class PaymentConfirmPage  implements OnInit {
  payment_results : string;
  
  //constructor() { }
  //function that checks the payment status
  check_payment_status():string{    
    const url= new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('status');    
  }
  //verifying the payment if the status is success full
  
  verify_payment(){
    //if(this.check_payment_status()!= null){
    if(this.check_payment_status()=="successful"){
      //verify payment on flutterwave

     //save payment data in the database

     //alert for successfull payment
     this.payment_results="Payment successfull";

    }else{
      //alert a failed payment
      this.payment_results = "Payment declined";
    }
  //}  
 }
  ngOnInit() {
  }

}
