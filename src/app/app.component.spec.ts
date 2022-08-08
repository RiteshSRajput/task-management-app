import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksService } from './services/tasks.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let taskService: TasksService;
  let fixture: any;
  let app: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    taskService = TestBed.inject(TasksService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
    spyOn(taskService, 'getList').and.returnValue(
      of([
        {
          id: '1',
          name: 'test',
          tasks: [
            {
              name: 'task1',
            },
          ],
        },
      ])
    );
    app.ngOnInit();
    expect(app.taskListData.length).toBe(1);
  });

  it(`should render list form'`, () => {
    app.addList();
    expect(app.showListForm).toEqual(true);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#addListModal')).toBeDefined();
  });

  it('should render task form', () => {
    app.addTask('to-do');
    expect(app.showAddCard).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#addTaskModal')).toBeDefined();
  });
  it('should save list and task', () => {
    app.saveList({ id: 'test', name: 'test', tasks: [] });
    expect(app.taskListData.length).toBe(2);
    app.addTask('test');
    app.saveTask({ taskName: 'task1' });
    expect(app.taskListData[0].tasks.length).toBe(1);
  });
  it('should unsubscribe', () => {
    app.ngOnInit();
    expect(app.taskSubcribtion).toBeDefined();
    spyOn(app.taskSubcribtion, 'unsubscribe').and.callThrough();
    app.ngOnDestroy();
    expect(app.taskSubcribtion.unsubscribe).toHaveBeenCalled();
  });
  it('should emit closeModal', () => {
    app.showAddCard = true;
    app.closeModal();
    expect(app.showAddCard).toBe(false);
    app.showListForm = true;
    app.closeModal();
    expect(app.showListForm).toBe(false);
  });
});
