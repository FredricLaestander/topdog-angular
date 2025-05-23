import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  createUser(username: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/signup', {
      username,
      email,
      password,
    });
  }

  logInUser(email: string, password: string) {
    return this.http.post<{ accessToken: string }>(
      environment.apiUrl + '/auth/login',
      {
        email,
        password,
      }
    );
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('access-token', accessToken);
  }
}
