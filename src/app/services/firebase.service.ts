import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {  

  constructor(private firestore: AngularFirestore,private alertController:AlertController) { }
  
 //function that sends an alert
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
//function that inserts orders in a database
  createOrder(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("Orders")
            .add(data)
            .then(res => {
             this.presentAlert("Order Received","Successfully ordered","We have received your order. we are now processing it.");
            }, err => reject(err));
    });
}
}
