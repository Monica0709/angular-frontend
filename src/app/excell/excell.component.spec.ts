import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellComponent } from './excell.component';

describe('ExcellComponent', () => {
  let component: ExcellComponent;
  let fixture: ComponentFixture<ExcellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
