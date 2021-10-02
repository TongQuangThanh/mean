import { PostService } from './shared/service/post.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Trang chủ', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Games', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Văn hóa', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Khoa học', url: '/folder/Archived', icon: 'archive' },
    { title: 'Giáo dục', url: '/folder/Trash', icon: 'trash' },
    { title: 'Kinh tế', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = [];
  constructor(private postService: PostService) {
    this.postService.get()
      .subscribe((data: any) => {
        this.labels = data;
        console.log(data);
      });
  }

  post() { this.postService.post(); }

  delete(id: string) {
    this.postService.delete(id).subscribe((data: any) => {
      console.log(data);
    });
  }
}
