import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakestructprojectComponent } from './makestructproject.component';

describe('MakestructprojectComponent', () => {
  let component: MakestructprojectComponent;
  let fixture: ComponentFixture<MakestructprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakestructprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakestructprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
