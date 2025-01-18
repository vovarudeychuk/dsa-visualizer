import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedGraphsComponent } from './advanced-graphs.component';

describe('AdvancedGraphsComponent', () => {
  let component: AdvancedGraphsComponent;
  let fixture: ComponentFixture<AdvancedGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedGraphsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
