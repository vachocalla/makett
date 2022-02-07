import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemodelcontentComponent } from './createmodelcontent.component';

describe('CreatemodelcontentComponent', () => {
  let component: CreatemodelcontentComponent;
  let fixture: ComponentFixture<CreatemodelcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemodelcontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemodelcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
