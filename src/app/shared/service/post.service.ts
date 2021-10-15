/* eslint-disable no-underscore-dangle */
import { Post } from '../model/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postUrl = `${environment.url}/posts`;
  constructor(private http: HttpClient) { }

  get() {
    return this.http
    .get(`${this.postUrl}`)
    .pipe(
      map((res: any) => {
        console.log(res);
        return res.data;
        // res.data.map(post => ({
        //   id: post._id,
        //   title: post.title,
        //   content: post.content
        // }));
      }));
  }

  update(id: string, post: Post) {
    return this.http.put(`${this.postUrl}/${id}`, {post});
  }

  delete(id: string) {
    return this.http.delete(`${this.postUrl}/${id}`, {});
  }

  add(postData: FormData) {
    return this.http.post(`${this.postUrl}`, postData);
  }
}
