import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  backgrounds = [
    'assets/imgs/background/background-1.jpg',
    'assets/imgs/background/background-2.jpg',
    'assets/imgs/background/background-3.jpg',
    'assets/imgs/background/background-4.jpg'
  ];
  public loginForm: any;

  constructor(public formBuilder: FormBuilder,
              private navCtrl:NavController,
            private auth: AuthService) {
    this.loginForm = formBuilder.group({
      email: ['test@gmail.com', Validators.required],
      password: ['123456',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('Hello LoginBackgroundSlider Page');
  }

  openResetPassword() {
    console.log('Reset password clicked');
  }

  login() {
      this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password'])
      .then(data => {
        var pageRoot = 'ListPointPage';
        if (true) {
          pageRoot = 'UserPage';
        }
        this.navCtrl.setRoot(pageRoot);
      })
      .catch(error => console.log(error));  
  }

}
