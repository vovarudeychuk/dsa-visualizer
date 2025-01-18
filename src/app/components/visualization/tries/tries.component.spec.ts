import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriesComponent } from './tries.component';

describe('TriesComponent', () => {
  let component: TriesComponent;
  let fixture: ComponentFixture<TriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
