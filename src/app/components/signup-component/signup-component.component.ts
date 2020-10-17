import { Router } from '@angular/router';
import { AuthServicesService } from './../../services/auth-services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SignInModel } from 'src/app/models/signin-model';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css'],
})
export class SignupComponentComponent implements OnInit {
  public registerForm = this.formbuilder.group({
    //Inicializando el form builder para el sign up
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    roles: [['user', 'mod']],
  });

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createUser() {
    if (this.registerForm.invalid) {
      // console.log('Error on Registering Form');
      return;
    } else {
      const data: SignInModel = {
        username: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value,
      };

      this.authService
        .signUp(this.registerForm.value)
        .subscribe((response: any) => {
          console.log(response);
          if (response.error) {
            console.log('Sorry something went wrong ');
          } else {
            console.log('user created');
            this.authService.signIn(data).subscribe((result) => {
              console.log(result);
              console.log('token placed');
            });
            this.routerMethod();
          }
        });
    }
  }

  async routerMethod(){
    await  this.router.navigate(['/']);
    setTimeout(() => {
      location.reload()
    }, 500);

  }
}
