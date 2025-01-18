import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitManipulationComponent } from './bit-manipulation.component';

describe('BitManipulationComponent', () => {
  let component: BitManipulationComponent;
  let fixture: ComponentFixture<BitManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitManipulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BitManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
