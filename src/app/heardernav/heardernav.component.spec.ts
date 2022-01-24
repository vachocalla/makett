import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeardernavComponent } from './heardernav.component';

describe('HeardernavComponent', () => {
  let component: HeardernavComponent;
  let fixture: ComponentFixture<HeardernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeardernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeardernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
