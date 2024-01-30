import { Component, computed, Input, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { HttpClient } from '@angular/common/http'
import { AuthenticationService } from '../../services/authentication.service'
import { Emitters } from '../../emitters/emitters'


export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],

  template: `
    <div class="sidenav-header">
      <img [width]="profilePicSize()"
           [height]="profilePicSize()"
           src="/assets/img.jpg" />

      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <div *ngIf="currentUser">
          <div class="text-3xl font-bold">{{ currentUser }}</div>
          <div>{{currentUserRole}}</div>
        </div>
      </div>
    </div>

    <mat-nav-list>
      <a mat-list-item
         class="menu-items"
         *ngFor="let item of menuItems()"
         [routerLink]="item.route"
         routerLinkActive="selected-menu-item"
         #rla="routerLinkActive"
         [class.activated]="rla.isActive">

        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>

        <span matListItemTitle *ngIf="!sideNavCollapsed()">{{ item.label }}</span>
      </a>
    </mat-nav-list>

    <div style="position: absolute; bottom: 3%; width: 100%;">
      <mat-nav-list>
        <a mat-list-item
           class="menu-items"
           *ngFor="let item of devItems()"
           [routerLink]="item.route"
           routerLinkActive="selected-menu-item"
           #rla="routerLinkActive"
           [class.activated]="rla.isActive">

          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>

          <span matListItemTitle *ngIf="!sideNavCollapsed()">{{ item.label }}</span>
        </a>
      </mat-nav-list>
    </div>

  `,
  styles: [`
      h4 {
          font-size: 1rem;
      }

      :host * {
          transition: all 500ms ease-in-out;
      }

      .sidenav-header {
          padding-top: 24px;
          text-align: center;

          > img {
              border-radius: 100%;
              object-fit: cover;
              margin-bottom: 10px;
          }

          .header-text {
              height: 3rem;

              > h2 {
                  margin: 0;
                  font-size: 1rem;
                  line-height: 1.5rem;
              }
          }

          > p {
              margin: 0;
              font-size: 0.8rem;
          }

          .hide-header-text {
              opacity: 0;
              height: 0px !important;
          }

          .menu-items {
              border-left: 5px solid;
              border-left-color: rgba(0, 0, 0, 0);
          }

          .selected-menu-item {
              border-left-color: blue;
              background: rgba(0, 0, 0, 0.1);
          }
      }
  `]
})

export class CustomSidenavComponent implements OnInit {
  //Текущий пользователь
  currentUser:any;
  currentUserRole:any;

    sideBarDataUserDisplay:string[]=[
        'id',
        'login',
        'first_name',
        'last_name',
        'middle_name',
        'user_age',
        'email',
        'gender',
        'b_days',
        'role',
    ]

    dataSource!:MatTableDataSource<any>

    constructor(
      private authService: AuthenticationService,
      private http: HttpClient
    ) {}


  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.currentUser = `${res.last_name} ${res.first_name} ${res.middle_name}`;
        this.currentUserRole=`${res.role}`
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.currentUser = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    )
  }

  sideNavCollapsed = signal(false)

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val)
  }

  menuItems = signal<MenuItem[]>([

    //наполнение меню навигации
    {
      icon: 'format_list_bulleted',
      label: 'Дисциплины',
      route: 'disciplines'
    },
    {
      icon: 'checklist',
      label: 'Тестирование',
      route: 'testing'
    },
    {
      icon: 'groups',
      label: 'Моя группа',
      route: 'mygroup'
    },
    {
      icon: 'calendar_today',
      label: 'Расписание',
      route: 'schedule'
    },
    {
      icon: 'account_circle',
      label: 'Моя личная страница',
      route: 'mypersonalpage'
    },
    {
      icon: 'cyclone',
      label: 'Сессия',
      route: '/main/session'
    }
  ])

  devItems = signal<MenuItem[]>([

    //наполнение меню навигации
    {
      icon: 'contact_page',
      label: 'Contact',
      route: 'contact-dev-page'
    },
    {
      icon: 'add_road',
      label: 'RoadMap',
      route: 'road-map-dev'
    },
    {
      icon: 'contact_support',
      label: 'Support',
      route: 'support-dev'
    }

  ])

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100')
}
