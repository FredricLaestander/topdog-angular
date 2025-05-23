import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { List } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class TierlistService {
  http = inject(HttpClient);
  accessToken = localStorage.getItem('access-token');

  createList(name: string, description?: string) {
    return this.http.post<{ listId: string }>(
      environment.apiUrl + '/lists',
      {
        name,
        description,
      },
      { headers: { Authorization: 'Bearer ' + this.accessToken } }
    );
  }

  getAll() {
    return this.http.get<List[]>(environment.apiUrl + '/lists');
  }

  getListById(id: string) {
    return this.http.get<List>(environment.apiUrl + `/lists/${id}`);
  }

  updateList(id: string, name: string, description?: string) {
    return this.http.put<List>(
      environment.apiUrl + `/lists/${id}`,
      {
        name,
        description,
      },
      { headers: { Authorization: 'Bearer ' + this.accessToken } }
    );
  }

  deleteList(id: string) {
    return this.http.delete<List>(environment.apiUrl + `/lists/${id}`, {
      headers: { Authorization: 'Bearer ' + this.accessToken },
    });
  }
}
