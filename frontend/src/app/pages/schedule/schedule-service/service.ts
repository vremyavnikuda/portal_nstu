import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  constructor(private http: HttpClient) { }

  getEvents(calendarId: string) {
    return this.http.get<any>(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`);
  }
}
