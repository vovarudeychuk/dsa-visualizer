import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDDpComponent } from './two-d-dp.component';

describe('TwoDDpComponent', () => {
  let component: TwoDDpComponent;
  let fixture: ComponentFixture<TwoDDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoDDpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoDDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
