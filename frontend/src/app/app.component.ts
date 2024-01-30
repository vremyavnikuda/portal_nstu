import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {CustomSidenavComponent} from "./components/custom-sidenav/custom-sidenav.component";
import {MainComponent} from "./pages/main/main.component";
import {DisciplinesComponent} from "./pages/disciplines/disciplines.component";
import {TestingComponent} from "./pages/testing/testing.component";
import {MygroupComponent} from "./pages/mygroup/mygroup.component";
import {ScheduleComponent} from "./pages/schedule/schedule.component";
import {MypersonalpageComponent} from "./pages/mypersonalpage/mypersonalpage.component";
import {SessionComponent} from "./pages/session/session.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        CustomSidenavComponent,
        MainComponent,
    ],
    providers: [
        MainComponent,
        DisciplinesComponent,
        TestingComponent,
        MygroupComponent,
        ScheduleComponent,
        MypersonalpageComponent,
        SessionComponent
    ],
    template: `
        <router-outlet></router-outlet>
    `,
    styles: [],

})
export class AppComponent {
    title = 'NSTU Student Portal';
}
