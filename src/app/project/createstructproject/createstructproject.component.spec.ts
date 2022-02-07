import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestructprojectComponent } from './createstructproject.component';

describe('CreatestructprojectComponent', () => {
  let component: CreatestructprojectComponent;
  let fixture: ComponentFixture<CreatestructprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatestructprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatestructprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
