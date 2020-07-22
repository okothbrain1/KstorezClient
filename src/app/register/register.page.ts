import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
export class User{
  email:string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User = new User();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public fAuth: AngularFireAuth,
    private router: Router ) { }

  ngOnInit() {
  }
  async register(){
    try{
      var r = await this.fAuth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if(r){
        console.log("Successfully registered !");
        //this.navCtrl.setRoot('LoginPage');
        this.router.navigate(['LoginPage']);
      }
    }catch(err){
      console.error(err);
    }
  }

}
