import { Component, OnInit } from '@angular/core'
import {LandingComponent} from "../../landing/landing.component";
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import {
  EditUserAdminComponent
} from '../../admin-page-setting/user-page-tab-admin/edit-user-admin/edit-user-admin.component'

@Component({
  selector: 'app-user-personal-page-portal',
  standalone: true,
  imports: [
    LandingComponent,
    MatCard,
    MatCardContent,
    MatGridList,
    MatGridTile,
    EditUserAdminComponent
  ],
  template: `
      <p>DEV</p>
  `,
  styles: [`
      
  `]
})
/*Проработать профиль студента
* добавить необходимые данные
* */
export class UserPersonalPagePortalComponent implements OnInit {
  ngOnInit() {

  }
}
