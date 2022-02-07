import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprojectsetepsComponent } from './createprojectseteps.component';

describe('CreateprojectsetepsComponent', () => {
  let component: CreateprojectsetepsComponent;
  let fixture: ComponentFixture<CreateprojectsetepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateprojectsetepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprojectsetepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
