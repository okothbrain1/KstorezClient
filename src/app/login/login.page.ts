import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

export  class User{
  email:string;
  password:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User = new User();
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public fAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
  }

  async login(){
    try{
      var r = await this.fAuth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if(r){
        console.log("Successfully logged in !");
        //this.navCtrl.setRoot('LoginPage');
        this.router.navigate(['TabsPage']);
      }
    }catch(err){
      console.error(err);
    }
  }

}
