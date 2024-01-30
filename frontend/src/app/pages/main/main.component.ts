import {Component, computed, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CustomSidenavComponent} from "../../components/custom-sidenav/custom-sidenav.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthenticationService} from "../../services/authentication.service";
import {LandingComponent} from "../landing/landing.component";
import {HttpClient} from "@angular/common/http";
import {Emitters} from "../../emitters/emitters";
import {MygroupComponent} from "../mygroup/mygroup.component";
import { MatTableDataSource } from '@angular/material/table'


//Основная страница отображения контента
@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        RouterOutlet,
        CustomSidenavComponent,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterLink,
        RouterLinkActive,
        AsyncPipe,
        NgIf,
        LandingComponent,
        MygroupComponent
    ],
    template: `
      {{ message }}
      <app-landing></app-landing>
    `,
    styles: [`

    `]
})

export class MainComponent implements OnInit {
    constructor(public authService: AuthenticationService, private router: Router, private http: HttpClient) {
    }

    //Пока точно не знаю надо мне оно тут или нет ,но пока что оставлю
    dataSourceApi:string[]=[
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
    dataSource!: MatTableDataSource<any>;
    message = ''

    ngOnInit(): void {
        this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
            (res: any) => {
                this.message = `${res.last_name} ${res.first_name} ${res.middle_name}`;
                Emitters.authEmitter.emit(true);
            },
            err => {
                this.message = 'You are not logged in';
                Emitters.authEmitter.emit(false);
            }
        )
    }
}
