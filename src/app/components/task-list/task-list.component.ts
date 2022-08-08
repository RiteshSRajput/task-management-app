import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  constructor() {}
  @Input()
  taskList: any;
  @Output()
  addTaskEvent = new EventEmitter<string>();
  addCard(id: string) {
    this.addTaskEvent.emit(id);
  }
}
