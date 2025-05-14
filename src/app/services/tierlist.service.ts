import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { List } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class TierlistService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<List[]>(environment.apiUrl + '/lists');
  }

  getListById(id: string) {
    return this.http.get<List>(environment.apiUrl + `/lists/${id}`);
  }
}
