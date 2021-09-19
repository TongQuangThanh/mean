import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http: HttpClient) { }

  post() {
    this.http.get('http://localhost:3000/api/posts').subscribe(data => {
      console.log(data);
    });
  }
}
