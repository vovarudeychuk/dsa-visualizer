import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopKFrequentElementsComponent } from './top-k-frequent-elements.component';

describe('TopKFrequentElementsComponent', () => {
  let component: TopKFrequentElementsComponent;
  let fixture: ComponentFixture<TopKFrequentElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopKFrequentElementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopKFrequentElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
