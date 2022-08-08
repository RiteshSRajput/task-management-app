import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskList } from './models/task-list';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'task-management-app';
  showAddCard: boolean = false;
  showListForm: boolean = false;
  saveTaskListID: string = '';
  taskListData: Array<TaskList> = [
    {
      id: 'to-do',
      name: 'To Do',
      tasks: [
        {
          name: 'Sample Task',
        },
      ],
    },
  ];
  taskSubcribtion: Subscription | undefined;
  constructor(private taskService: TasksService) {}
  ngOnInit(): void {
    this.taskSubcribtion = this.taskService.getList().subscribe((data: any) => {
      this.taskListData = data;
    });
  }

  saveTask(item: any) {
    this.showAddCard = false;
    // Save task also should perform using API. Curretnly i am updating in existing avriable
    this.taskListData.forEach((obj) => {
      if (obj.id === this.saveTaskListID) {
        obj.tasks.push({ name: item.taskName });
        this.saveTaskListID = '';
      }
    });
  }
  addTask(id: any) {
    this.showAddCard = true;
    this.saveTaskListID = id;
  }
  saveList(item: any) {
    this.taskListData.push(item);
    this.showListForm = false;
  }
  addList() {
    this.showListForm = true;
  }
  ngOnDestroy(): void {
    if (this.taskSubcribtion) {
      this.taskSubcribtion.unsubscribe();
    }
  }
  closeModal() {
    this.showAddCard = false;
    this.showListForm = false;
  }
}
