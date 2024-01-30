import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import { NgForOf, NgIf } from '@angular/common'
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";


@Component({
    selector: 'app-mygroup',
    standalone: true,
    imports: [
        MatCardModule,
        NgForOf,
        MatTableModule,
        NgIf
    ],
    template: `
      <p>
        Страница для отображение моей группы на факультете
      </p>
      <p>
        Страница находится в разработке
      </p>
      <div class="spacer" style="padding: 16px" *ngIf="dataSource && dataSource.data && dataSource.data.length > 0">
        <mat-card *ngFor="let user of dataSource.data" class="user-card">
          <mat-card-content>
            <p>ФИО: {{ user.last_name }} {{ user.first_name }}  {{ user.middle_name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>ID номер: {{ user.id }}</p>
          </mat-card-content>
        </mat-card>
      </div>
      <div *ngIf="!dataSource || !dataSource.data || dataSource.data.length === 0">
        Данные загружаются...
      </div>
    `,
    styles: [`
      .user-card {
        margin-bottom: 16px;
      }

      spacer {
        margin-bottom: 10px;
      }
    `]
})

export class MygroupComponent implements OnInit {

    displayedColumns: string[] = [
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
    ];

    dataSource!: MatTableDataSource<any>;

    constructor(
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.http.get<any[]>('http://localhost:8000/api/allUser').subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
        });
    }
}
