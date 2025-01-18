import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidSudokuComponent } from './valid-sudoku.component';

describe('ValidSudokuComponent', () => {
  let component: ValidSudokuComponent;
  let fixture: ComponentFixture<ValidSudokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidSudokuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidSudokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
