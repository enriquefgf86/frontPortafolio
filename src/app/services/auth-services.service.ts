import { SignInModel } from './../models/signin-model';
import { SignUpModel } from './../models/signup-model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

// const mongoUrl = 'http://localhost:9000/portafolio/version1';
const mongoUrl = 'https://portafolioback.herokuapp.com/portafolio/version1/';

export class User {
  constructor(public status: string) {}
}

export class JwtResponse {
  constructor(public jwttoken: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  public authDetection: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  signUp(signedUpUser: SignUpModel) {
    return this.httpClient.post<any>(`${mongoUrl}/signup`, signedUpUser).pipe(
      map((userData) => {
        // console.log(userData);
        return userData;
      })
    );
  }

  signIn(signedinUser: SignInModel) {
    return this.httpClient.post<any>(`${mongoUrl}/signin`, signedinUser).pipe(
      map((userData) => {
        // console.log(userData);
        sessionStorage.setItem('username', signedinUser.username);
        let tokenStr = 'Bearer ' + userData.accessToken;
        sessionStorage.setItem('token', tokenStr);
        return userData;
      })
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    let userStatus: boolean = false;
    if (user == null) {
      userStatus = false;
      this.authDetection.emit(userStatus);
    } else {
      userStatus = true;
      this.authDetection.emit(userStatus);
    }
    return !(user === null);
  }

  async logOut() {
    await sessionStorage.removeItem('username');
    await sessionStorage.removeItem('token');
    let userStatus: boolean = await false;
    this.authDetection.emit(userStatus);
  }

  emittingAuthState(status: boolean) {
    this.authDetection.emit(status);
  }
}
