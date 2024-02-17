import {Component, OnInit} from '@angular/core';
import {MatCardContent} from "@angular/material/card";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { SidenavAdminComponent } from './sidenav-admin/sidenav-admin.component'
import { UserPageTabAdminComponent } from './user-page-tab-admin/user-page-tab-admin.component'
import { DashboardPageTabAdminComponent } from './dashboard-page-tab-admin/dashboard-page-tab-admin.component'
import { SettingPageAdminComponent } from './setting-page-admin/setting-page-admin.component'
import { RouterOutlet } from '@angular/router'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { UserService } from './adminService/UserService'
import { EditUserAdminComponent } from './user-page-tab-admin/edit-user-admin/edit-user-admin.component'
import { FacultiesInfoComponent } from './faculties-info/faculties-info.component'

@Component({
    selector: 'app-admin-page-setting',
    standalone: true,
    imports: [
        MatCardContent,
        MatTabGroup,
        MatTab,
        SidenavAdminComponent,
        UserPageTabAdminComponent,
        DashboardPageTabAdminComponent,
        SettingPageAdminComponent,
        RouterOutlet,
        HttpClientModule,
        FacultiesInfoComponent

    ], providers: [
        UserService, EditUserAdminComponent, FacultiesInfoComponent
    ],
    template: `
        <app-sidenav-admin></app-sidenav-admin>
        <p>Страница находится в разработке</p>
        <mat-tab-group>
            // TODO: Страница управление пользователями
            <mat-tab label="Пользователи">
                <app-user-page-tab-admin></app-user-page-tab-admin>
            </mat-tab>
            // TODO: Страница управление факультетами и группами
            <mat-tab label="Факультеты">
                <app-faculties-info></app-faculties-info>
            </mat-tab>
            // TODO: Страница управление группами
            <mat-tab label="Dashboard">
                <app-dashboard-page-tab-admin></app-dashboard-page-tab-admin>
            </mat-tab>
            <mat-tab label="Settings">
                <app-setting-page-admin></app-setting-page-admin>
            </mat-tab>
        </mat-tab-group>
    `,
    styles: [`

    `]
})
export class AdminPageSettingComponent implements OnInit {
    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {

    }

}
