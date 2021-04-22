import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  constructor() {}

  private postsUpdated = new Subject<Post[]>();

  // Not edited from outside
  private posts: Post[] = [];

  getPosts() {
    return [...this.posts]; // Immutable
  }

  getPostUpdated() {
    return this.postsUpdated.asObservable();
  }

  savePost(post: Post) {
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
