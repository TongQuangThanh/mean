/* eslint-disable no-underscore-dangle */
import { Post } from '../model/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http
    .get(`${url}/posts`)
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

  post() {
    this.http.post(`${url}/posts`, {}).subscribe(data => {
      console.log(data);
    });
  }

  update(id: string, post: Post) {
    return this.http.put(`${url}/posts/${id}`, {post});
  }

  delete(id: string) {
    return this.http.delete(`${url}/posts/${id}`, {});
  }
}
