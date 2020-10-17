import { AuthServicesService } from './../../services/auth-services.service';
import { SignInModel } from './../../models/signin-model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  userIsLogged:boolean;
  
  public loginForm = this.formbuilder.group({
    //Inicializando el form builder para el sign up
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', Validators.required],
  });

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser() {
    if (this.loginForm.invalid) {
      // console.log('Error on Registering Form');
      return;
    } else {
      this.authService.signIn(this.loginForm.value).subscribe((result) => {
        console.log(result);
        if (result.error) {
          console.log('Sorry something went wrong ');
          this.authService.emittingAuthState(this.userIsLogged=false)
        } else {
          this.authService.emittingAuthState(this.userIsLogged=true)
          this.routerMethod();
        }
      });
    }
  }

  async routerMethod() {
    await this.router.navigate(['/']);
  }
}
