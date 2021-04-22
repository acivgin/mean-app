import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  constructor(private http: HttpClient) {}

  private postsUpdated = new Subject<Post[]>();

  // Not edited from outside
  private posts: Post[] = [];

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next(this.posts);
      });
  }

  getPostUpdated() {
    return this.postsUpdated.asObservable();
  }

  savePost(post: Post) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
