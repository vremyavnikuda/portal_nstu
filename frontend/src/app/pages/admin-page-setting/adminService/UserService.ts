// user.service.ts

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) {
  }


  //Получить информацию о пользователе
  getUserInfo(id: string): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/user-auth-controller/getUserInfo/' + id)
  }

  //Обновить пользовательские данные
  //пока что данная функция не используется ,после рефакторинга добавим
  updateUserPortal(id: number, data: any): Observable<any> {
    return this.http.put<any>('http://localhost:8000/api/user-auth-controller/updateUser/' + id, data)
  }
}
