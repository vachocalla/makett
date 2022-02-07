import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaketesisComponent } from './maketesis.component';

describe('MaketesisComponent', () => {
  let component: MaketesisComponent;
  let fixture: ComponentFixture<MaketesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaketesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaketesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
