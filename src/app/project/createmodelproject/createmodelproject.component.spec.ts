import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemodelprojectComponent } from './createmodelproject.component';

describe('CreatemodelprojectComponent', () => {
  let component: CreatemodelprojectComponent;
  let fixture: ComponentFixture<CreatemodelprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemodelprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemodelprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
