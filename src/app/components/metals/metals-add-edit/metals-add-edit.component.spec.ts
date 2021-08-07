import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalsAddEditComponent } from './metals-add-edit.component';

describe('MetalsAddEditComponent', () => {
  let component: MetalsAddEditComponent;
  let fixture: ComponentFixture<MetalsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetalsAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
