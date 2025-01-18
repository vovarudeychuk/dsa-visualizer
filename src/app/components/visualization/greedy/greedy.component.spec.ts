import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreedyComponent } from './greedy.component';

describe('GreedyComponent', () => {
  let component: GreedyComponent;
  let fixture: ComponentFixture<GreedyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreedyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreedyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
