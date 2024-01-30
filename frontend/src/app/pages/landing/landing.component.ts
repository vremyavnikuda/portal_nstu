import { Component, computed, OnInit, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { AsyncPipe, NgIf } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Emitters } from '../../emitters/emitters'
import { MatMenuModule } from '@angular/material/menu'
import { CustomSidenavComponent } from '../../components/custom-sidenav/custom-sidenav.component'
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav'

/**TODO:
 *  Меню навигации
 *  <app-landing></app-landing>
 * */
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    NgIf,
    HttpClientModule,
    MatMenuModule,
    CustomSidenavComponent,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon"
              (click)="callapsed.set(!callapsed())">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Student Portal NSTU </span>
      <span class="example-spacer"></span>

      <div *ngIf="menuVisibility">
        <button mat-button [matMenuTriggerFor]="menu">Menu</button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item (click)="goToUserPersonalPagePortal()">Профиль</button>
          <div>
            <button mat-menu-item (click)="goToAdminPage()">Admin</button>
          </div>
          <div *ngIf="authenticated">
            <button mat-menu-item (click)="logout()">Выйти</button>
          </div>
        </mat-menu>
      </div>

      <div *ngIf="!authenticated">
        <button mat-button (click)="whayUser()">
          <mat-icon>login</mat-icon>
          Login
        </button>
      </div>

    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="callapsed()"></app-custom-sidenav>
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>

  `,
  styles: [`
      .example-spacer {
          flex: 1 1 auto;
      }

      mat-toolbar {
          justify-content: space-between;
      }

      content {
          padding: 32px;
      }

      /* Размещаем содержимое в правой части toolbar */
      .mat-toolbar .right-content {
          margin-left: auto; /* Перемещаем содержимое в правый край */
      }

      right-section {
          display: flex;
          align-items: center;
      }

      content {
          padding: 24px;
      }


      mat-toolbar {
          position: relative;
          z-index: 5;
      }

      mat-sidenav-container {
          height: calc(100vh - 64px)
      }

      mat-sidenav, mat-sidenav-contant {
          transition: all 400ms ease-in-out
      }
  `]
})

export class LandingComponent implements OnInit {

  //Флаг отображение кнопки login\logout на topbar page авторизован ли пользователь
  authenticated = false
  //Меню topbar
  menuVisibility = false

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth
      }
    )
    if (this.currentUrl == '/login') {
      this.menuVisibility = false
      this.authenticated = false
      this.http.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
        .subscribe(() => this.authenticated = false)
      this.router.navigate(['/login']).then(r => true)
      console.log('logout() == true -> Пользователь вышел из системы')
    } else {
      this.menuVisibility = true
    }
  }


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  logout() {
    this.http.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .subscribe(() => this.authenticated = false)
    this.router.navigate(['/login']).then(r => true)
    console.log('logout() == true -> Пользователь вышел из системы')
  }

  // TODO: whayUser() -> проверка на какой странице находится пользователь
  currentUrl = this.router.url
  heck = signal<any | null>(null)

  whayUser() {
    if (this.currentUrl === '/login') {
      console.log('whayUser() -> Пользователь находится на странице /login')
      this.authenticated == true
      this.router.navigate(['/login']).then(r => true)
    } else {
      this.router.navigate(['/login']).then(r => true)
      console.log('whayUser() -> Пользователь перенаправлен на страницу /login')
    }
    return
  }

  goToUserPersonalPagePortal() {
    this.router.navigate(['/main/mypersonalpage/user-personal-page-portal']).then(r => true)
  }

  //Перейти на страницу администратора
  goToAdminPage() {
    this.router.navigate(['/admin']).then(r => true)
  }

  callapsed = signal(false)
  sidenavWidth = computed(() => this.callapsed() ? '65px' : '250px')
}
