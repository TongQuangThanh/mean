import { PostService } from './shared/service/post.service';
import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';
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
  userIsAuthenticated = false;
  constructor(private postService: PostService, private authService: AuthService) {
    authService.getAuthStatusListener().subscribe(authStatus => {
    });
    this.postService.get()
      .subscribe((data: any) => {
        this.labels = data;
        console.log(data);
      });
    authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    authService.autoLogin();
  }

  post() { }

  delete(id: string) {
    this.postService.delete(id).subscribe((data: any) => {
      console.log(data);
    });
  }

  signup() {
    this.authService.signup(new Date() + '@gmail.com' ,'123456').subscribe((res: any) => {
      // this.token = res.token;
      // this.authStatusListener.next(true);
    });
  }
}
