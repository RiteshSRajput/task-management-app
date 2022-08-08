import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TasksService', () => {
  let httpService: HttpClient;
  let taskService: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    taskService = TestBed.inject(TasksService);
    httpService = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });
  it('should get lists data', () => {
    const result = [
      {
        id: '1',
        name: 'test',
        tasks: [],
      },
    ];
    spyOn(httpService, 'get').and.returnValue(of(result));
    taskService.getList().subscribe({
      next: (data) => {
        expect(data).toEqual(result);
      },
    });
  });
  it('should save lists data', () => {
    const result = {
      id: '1',
      name: 'test',
      tasks: [
        {
          name: 'task1',
        },
      ],
    };
    spyOn(httpService, 'post').and.returnValue(of(result));
    taskService.saveList(result).subscribe({
      next: (data) => {
        expect(data).toBe(result);
      },
    });
  });
});
