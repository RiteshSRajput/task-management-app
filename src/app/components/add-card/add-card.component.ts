import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent {
  constructor() {}
  @Input()
  display: boolean = false;
  @Output()
  saveTask = new EventEmitter<string>();
  @Output()
  cancel = new EventEmitter<string>();

  cardForm = new FormGroup({
    taskName: new FormControl(''),
  });
  onSubmit() {
    this.saveTask.emit(this.cardForm.value);
  }
  closeModal() {
    this.cancel.emit();
  }
}
