import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidAnagramComponent } from './valid-anagram.component';

describe('ValidAnagramComponent', () => {
  let component: ValidAnagramComponent;
  let fixture: ComponentFixture<ValidAnagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidAnagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidAnagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
