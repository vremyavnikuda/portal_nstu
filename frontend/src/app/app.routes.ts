import {Routes} from '@angular/router';
import {DisciplinesComponent} from "./pages/disciplines/disciplines.component";
import {TestingComponent} from "./pages/testing/testing.component";
import {MygroupComponent} from "./pages/mygroup/mygroup.component";
import {ScheduleComponent} from "./pages/schedule/schedule.component";
import {MypersonalpageComponent} from "./pages/mypersonalpage/mypersonalpage.component";
import {SessionComponent} from "./pages/session/session.component";
import {LoginPageComponent} from "./pages/login/login-pages/login-page.component";
import {MainComponent} from "./pages/main/main.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {
    UserPersonalPagePortalComponent
} from "./pages/mypersonalpage/user-personal-page-portal/user-personal-page-portal.component";
import {ContactPageDevComponent} from "./pages/contact-page-dev/contact-page-dev.component";
import {RoadMapDevComponent} from "./pages/road-map-dev/road-map-dev.component";
import {SupportDevComponent} from "./pages/support-dev/support-dev.component";
import { AdminPageSettingComponent } from './pages/admin-page-setting/admin-page-setting.component';
import { HomePageComponent } from './pages/home-page/home-page.component'

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent
    },
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'disciplines',
                component: DisciplinesComponent,
            },
            {
                path: 'testing',
                component: TestingComponent,
            },
            {
                path: 'mygroup',
                component: MygroupComponent
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
            },
            {
                path: 'mypersonalpage',
                component: MypersonalpageComponent,
                children: [
                    {
                        path: 'user-personal-page-portal',
                        component: UserPersonalPagePortalComponent
                    },
                ],


            },
            {
                path: 'session',
                component: SessionComponent,
            },

            //DEV раздел

            {
                path: 'contact-dev-page',
                component: ContactPageDevComponent,
            },
            {
                path: 'road-map-dev',
                component: RoadMapDevComponent
            },
            {
                path: 'support-dev',
                component: SupportDevComponent
            },
        ],
    },

    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'registration',
        component: RegistrationComponent,
    },
    {
        path: 'admin',
        component:AdminPageSettingComponent,
    },
];
