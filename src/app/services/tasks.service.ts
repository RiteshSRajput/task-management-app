import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task, TaskList } from '../models/task-list';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseAPIURL: string | undefined;
  constructor(private httpClient: HttpClient) {
    this.baseAPIURL = environment.apiUrl;
  }

  getList() {
    const url = `${this.baseAPIURL}/lists`;
    return this.httpClient.get(url);
  }
  saveList(data: TaskList) {
    const url = `${this.baseAPIURL}/lists`;
    console.log(url);
    return this.httpClient.post(url, {
      id: data.id,
      name: data.name,
      tasks: [],
    });
  }
}
