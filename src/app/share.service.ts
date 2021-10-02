import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  api = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  post() {
    return this.http.get(this.api + 'posts');
  }

  add(postData: FormData) {
    return this.http.post(this.api + 'posts', postData);
  }
}
