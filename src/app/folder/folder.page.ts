import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../shared/service/post.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  file: File;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  uploadFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  add() {
    const postData = new FormData();
    postData.append('title', 'title ' + Date.now());
    postData.append('content', 'content ' + Date.now());
    postData.append('image', this.file);
    this.postService.add(postData).subscribe(data => console.log(data));
  }
}
