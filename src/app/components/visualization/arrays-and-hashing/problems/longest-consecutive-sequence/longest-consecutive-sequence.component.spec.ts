import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongestConsecutiveSequenceComponent } from './longest-consecutive-sequence.component';

describe('LongestConsecutiveSequenceComponent', () => {
  let component: LongestConsecutiveSequenceComponent;
  let fixture: ComponentFixture<LongestConsecutiveSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongestConsecutiveSequenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongestConsecutiveSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
