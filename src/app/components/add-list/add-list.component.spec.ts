import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { AddListComponent } from './add-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksService } from 'src/app/services/tasks.service';
import { of, throwError } from 'rxjs';

describe('AddListComponent', () => {
  let component: AddListComponent;
  let fixture: ComponentFixture<AddListComponent>;
  let taskService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddListComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    taskService = TestBed.inject(TasksService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call form submit', () => {
    spyOn(taskService, 'saveList').and.returnValue(
      of({
        id: '1',
        name: 'test',
        tasks: [],
      })
    );
    component.listForm = new FormGroup({
      listName: new FormControl('test'),
    });
    spyOn(component.saveList, 'emit');
    component.onSubmit();
    expect(component.saveList.emit).toHaveBeenCalledTimes(1);
  });
  it('should show error for duplicate list', () => {
    spyOn(taskService, 'saveList').and.returnValue(
      throwError({ error: 'duplicate id', status: 500 })
    );
    component.listName.setValue('test');
    component.onSubmit();
  });
});
