import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { MatCard, MatCardContent } from '@angular/material/card'
import { NgClass } from '@angular/common'
import { Network } from 'vis-network/standalone'

@Component({
  selector: 'app-road-dev',
  template: `
    <mat-card>
      <mat-card-content>
        <p class="centered-icon">Road Map Development NSTU Student Portal</p>
        <p>Обозначения:</p>
        <ul>
          <li>✅ - выполнено</li>
          <li>🔄 - для будущей реализации</li>
          <li>⚙️ - в работе</li>
        </ul>
      </mat-card-content>
    </mat-card>

    <div id="mynetwork" style="height: 100vh; width: 100%;"></div>
  `,
  styles: [`
    .centered-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    #mynetwork {
      width: 100%;
      height: 100%;
      border: 1px solid lightgray;
      background: white;
    }
  `],
  imports: [
    MatCard,
    MatCardContent,
    NgClass
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})


export class RoadDevComponent implements OnInit {
  ngOnInit(): void {
    this.draw()
  }

  draw(): void {
    // Ваши данные для графа
    const nodes = [
      { id: 0, label: 'Project ⚙️', group: '0', size: 40 },


      //admin control panel
      { id: 3, label: 'admin control panel 🔄', group: '2', size: 25 },
      { id: 20, label: 'interface 🔄', group: '2' },

      //User control panel
      { id: 21, label: 'User ✅', group: '2' },
      //Таблица пользователей
      { id: 24, label: 'UserList ✅', group: '2' },
      //upd Пользователя
      { id: 25, label: 'UpdUser ✅', group: '2' },
      //delete User
      { id: 26, label: 'DeleteUser ✅', group: '2' },
      //Info User
      { id: 27, label: 'InfoUser ✅', group: '2' },

      //Dasboard constrol panel
      { id: 22, label: 'Dashboard 🔄', group: '2' },
      //Settings control panel
      { id: 23, label: 'Settings 🔄', group: '2' },

      //Статус пользователя (online/offline)
      { id: 4, label: 'user status portal 🔄', group: '3' },
      { id: 5, label: 'online 🔄', group: '3' },
      { id: 6, label: 'offline 🔄', group: '3' },

      //UI Интерфейс назначения и изменение ролей пользователей
      { id: 7, label: 'ROLE ✅', group: '5', size: 20 },
      //USER/ADMIN/STUDENT/EDUCATOR
      { id: 8, label: 'ROLE:USER ✅', group: '5' },
      { id: 9, label: 'ROLE:ADMIN ✅', group: '5' },
      { id: 10, label: 'ROLE:STUDENT ✅', group: '5' },
      { id: 11, label: 'ROLE:EDUCATOR ✅', group: '5' },

      //roadMap dev
      { id: 12, label: 'roadMap dev ✅', group: '6' },

      //Логика назначения ролей пользователей
      { id: 13, label: 'Добавление данных в db ✅', group: '5' },
      { id: 14, label: 'Изменение ролей пользователей ✅', group: '5' },

      //Мадальные окна для каждой дисциплины
      { id: 15, label: 'Discipline modal window 🔄', group: '7' },

      //API SideBad Get INFO DataBase
      { id: 16, label: 'API SideBad Get INFO DataBase ✅', group: '8' },
      { id: 17, label: 'Backend API ✅', group: '8' },
      { id: 18, label: 'Frontend API ✅', group: '8' },

      //Страница пользователя (профиль)
      { id: 19, label: 'Profile User 🔄', group: '9', size: 25 },
      { id: 28, label: 'UserPhoto 🔄', group: '2' },

      //journal #13
      //frontend & backend
      //backend
      { id: 50, label: 'backend 🔄', group: '10', size: 20 },
      { id: 51, label: 'frontend 🔄', group: '10' ,size: 20},

      { id: 29, label: 'journal #13 ⚙️', group: '10', size: 25 },
      { id: 30, label: 'Структура данных🔄', group: '10' },
      { id: 31, label: 'id strudent🔄', group: '10' },
      { id: 32, label: 'Предмет🔄', group: '10' },
      { id: 33, label: 'Оценка🔄', group: '10' },
      { id: 34, label: 'Дата выставления🔄', group: '10' },
      { id: 35, label: 'API-методы🔄', group: '10' },
      { id: 36, label: 'GET-записи🔄', group: '10' },
      { id: 37, label: 'POST-записи🔄', group: '10' },
      { id: 38, label: 'UPDATE-записи🔄', group: '10' },
      //frontend
      { id: 39, label: 'Интерфейс пользователя🔄', group: '10', },
      { id: 40, label: 'Студент 🔄', group: '10' },
      { id: 41, label: 'Преподаватель 🔄', group: '10' },
      { id: 42, label: 'Администратор 🔄', group: '10' },

      { id: 43, label: 'Данные 🔄', group: '10' },
      { id: 44, label: 'Добавления🔄', group: '10' },
      { id: 45, label: 'Изменения🔄', group: '10' },
      { id: 46, label: 'Удаления🔄', group: '10' },
      //Графическое представление данных: Реализовать графическое представление успеваемости, такое как диаграммы и статистика.
      { id: 47, label: 'Графическое представление данных 🔄', group: '10' },
      { id: 48, label: 'Статистика 🔄', group: '10' },
      { id: 49, label: 'Диаграммы 🔄', group: '10' },
    ]

    const edges = [
      //journal #13
      //frontend & backend
      //backend
      { from: 50, to: 29, arrows: 'to' },
      { from: 51, to: 29, arrows: 'to' },
      { from: 47, to: 51, arrows: 'to' },
      { from: 48, to: 47, arrows: 'to' },
      { from: 49, to: 47, arrows: 'to' },

      { from: 43, to: 51, arrows: 'to' },
      { from: 44, to: 43, arrows: 'to' },
      { from: 45, to: 43, arrows: 'to' },
      { from: 46, to: 43, arrows: 'to' },

      { from: 31, to: 30, arrows: 'to' },
      { from: 32, to: 30, arrows: 'to' },
      { from: 33, to: 30, arrows: 'to' },
      { from: 34, to: 30, arrows: 'to' },
      { from: 35, to: 30, arrows: 'to' },
      { from: 36, to: 35, arrows: 'to' },
      { from: 37, to: 35, arrows: 'to' },
      { from: 38, to: 35, arrows: 'to' },
      { from: 30 ,to: 50, arrows: 'to' },
      { from: 39, to: 51, arrows: 'to' },
      //frontend
      { from: 40, to: 39, arrows: 'to' },
      { from: 41, to: 39, arrows: 'to' },
      { from: 42, to: 39, arrows: 'to' },

      { from: 1, to: 0, arrows: 'to' },
      { from: 2, to: 0, arrows: 'to' },
      // admin control panel
      { from: 3, to: 0, arrows: 'to' },
      //
      // Статус пользователя (online/offline)
      { from: 4, to: 0, arrows: 'to' },
      { from: 5, to: 4, arrows: 'to' },
      { from: 6, to: 4, arrows: 'to' },
      // UI Интерфейс назначения и изменение ролей пользователей
      { from: 7, to: 20, arrows: 'to' },
      // USER/ADMIN/STUDENT/EDUCATOR
      { from: 8, to: 14, arrows: 'to' },
      { from: 9, to: 14, arrows: 'to' },
      { from: 10, to: 14, arrows: 'to' },
      // roadMap dev
      { from: 11, to: 14, arrows: 'to' },

      //Логика назначения ролей пользователей ->(frontend\backend)
      { from: 12, to: 0, arrows: 'to' },
      { from: 13, to: 7, arrows: 'to' },

      //Мадальные окна для каждой дисциплины
      { from: 14, to: 13, arrows: 'to' },

      //API SideBad Get INFO DataBase
      { from: 15, to: 0, arrows: 'to' },
      { from: 16, to: 0, arrows: 'to' },
      { from: 17, to: 16, arrows: 'to' },
      //Страница пользователя (профиль)
      { from: 18, to: 16, arrows: 'to' },
      { from: 19, to: 0, arrows: 'to' },
      //UserPhoto -> Profile User
      { from: 28, to: 19, arrows: 'to' },
      //interface -> admon control panel
      { from: 20, to: 3, arrows: 'to' },
      //User ->Interface ->Admon control panel
      { from: 21, to: 20, arrows: 'to' },
      //Dashboard ->Interface ->Admon control panel
      { from: 22, to: 20, arrows: 'to' },
      //Student ->Interface ->Admon control panel
      { from: 23, to: 20, arrows: 'to' },

      //User control panel
      { from: 24, to: 21, arrows: 'to' },
      { from: 25, to: 21, arrows: 'to' },
      { from: 26, to: 21, arrows: 'to' },
      { from: 27, to: 21, arrows: 'to' },
      //journal #13
      { from: 29, to: 0, arrows: 'to' }
    ]

    var data = {
      nodes: nodes,
      edges: edges
    }

    // Опции для графа
    const options = {
      nodes: {
        shape: 'dot',
        size: 16
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -70,
          centralGravity: 0.005,
          springLength: 150,
          springConstant: 0.18
        },
        maxVelocity: 200,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: { iterations: 1000 }
      }
    }

    // Создание графа
    const container = document.getElementById('mynetwork') as HTMLElement
    const network = new Network(container, data, options)
  }
}

