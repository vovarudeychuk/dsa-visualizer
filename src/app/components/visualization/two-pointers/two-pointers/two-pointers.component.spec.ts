import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPointersComponent } from './two-pointers.component';

describe('TwoPointersComponent', () => {
  let component: TwoPointersComponent;
  let fixture: ComponentFixture<TwoPointersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoPointersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoPointersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
