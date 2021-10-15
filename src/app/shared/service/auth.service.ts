import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private apiUrl = `${environment.url}/user`;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer;
  private userId: string;

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/signup`, { email, password });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = true;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  login(email: string, password: string) {
    this.http.post(`${this.apiUrl}/login`, { email, password }).subscribe((res: any) => {
      if (res.token) {
        this.setAuthTimer(res.expiresIn / 1000);
        this.token = res.token;
        this.authStatusListener.next(true);
        this.userId = res.userId;
        const expiration = new Date(new Date().getTime() + res.expiresIn * 1000);
        this.saveAuthData(this.token, expiration, res.userId);
      }
    });
  }

  saveAuthData(token: string, expiration: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('userId', userId);
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  autoLogin() {
    const authInfo = this.getAuthData();
    if (authInfo) {
      const now = new Date();
      const expireIn = authInfo.expiration.getTime();
      if (expireIn > now.getTime()) {
        this.token = this.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.userId = authInfo.userId;
        this.setAuthTimer(expireIn / 1000);
      }
    }
  }

  setAuthTimer(expiration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiration * 1000);
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expiration: new Date(expiration),
      userId
    };
  }
}
