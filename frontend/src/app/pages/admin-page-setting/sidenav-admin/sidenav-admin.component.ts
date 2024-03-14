import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-admin',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  template: `
    <div>
      <mat-toolbar color="primary">
        <button (click)="goHomePageProject()" mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
          <mat-icon>home</mat-icon>
        </button>
        <span>Панель управления NSTU Portal  </span>
        <span class="example-spacer"></span>
        <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
          <mat-icon>favorite</mat-icon>
        </button>
        <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
          <mat-icon>share</mat-icon>
        </button>
      </mat-toolbar>
    </div>
  `,
  styles: [`
      .example-spacer {
          flex: 1 1 auto;
      }
  `]
})
export class SidenavAdminComponent {

  constructor(private router: Router) {

  }
  //Метод перенаправления на домашнюю страницу проекта
  goHomePageProject(){
    this.router.navigate(['main']).then(r => true)
  }
}
