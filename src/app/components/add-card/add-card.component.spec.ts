import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { AddCardComponent } from './add-card.component';

describe('AddCardComponent', () => {
  let component: AddCardComponent;
  let fixture: ComponentFixture<AddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call form submit', () => {
    component.cardForm = new FormGroup({
      taskName: new FormControl('test'),
    });
    spyOn(component.saveTask, 'emit');
    component.onSubmit();
    expect(component.saveTask.emit).toHaveBeenCalledTimes(1);
  });
  it('should emit closeModal', () => {
    spyOn(component.cancel, 'emit');
    component.closeModal();
    expect(component.cancel.emit).toHaveBeenCalledTimes(1);
  });
});
