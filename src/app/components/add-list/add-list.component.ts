import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
})
export class AddListComponent {
  constructor(private taskService: TasksService) {}
  @Input()
  display: boolean = false;
  @Output()
  saveList = new EventEmitter<object>();
  @Output()
  cancel = new EventEmitter<string>();
  listName = new FormControl('');
  listForm = new FormGroup({
    listName: this.listName,
  });
  notUnique: boolean = false;
  onSubmit() {
    const listId = this.listName.value.toLowerCase().replace(' ', '-');
    const result = this.taskService.saveList({
      id: listId,
      name: this.listName.value,
      tasks: [],
    });
    result.subscribe({
      next: (data) => {
        this.saveList.emit(data);
      },
      error: (error) => {
        console.log(error);
        if (error.error.indexOf('duplicate id') > -1) {
          this.notUnique = true;
        }
      },
    });
  }
  closeModal() {
    this.cancel.emit();
  }
}
