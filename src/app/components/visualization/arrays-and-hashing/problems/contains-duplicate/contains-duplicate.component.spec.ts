import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContainsDuplicateComponent } from './contains-duplicate.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

describe('ContainsDuplicateComponent', () => {
  let component: ContainsDuplicateComponent;
  let fixture: ComponentFixture<ContainsDuplicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDividerModule,
        MatIconModule,
        MatExpansionModule
      ],
      declarations: [ContainsDuplicateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContainsDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default input array', () => {
    expect(component.inputArray).toBe('1,2,3,1');
    expect(component.currentData.length).toBeGreaterThan(0);
  });

  it('should visualize the initial array', () => {
    component.showInitialArray();
    expect(component.currentData.length).toBe(4); // Based on default input
  });

  it('should update current step when checking numbers', async () => {
    component.visualize();
    await fixture.whenStable();
    expect(component.currentStep).toContain('Checking number');
  });

  it('should find duplicates and update current step', async () => {
    component.inputArray = '1,2,3,1';
    await component.visualize();
    expect(component.currentStep).toContain('Found duplicate! Number 1 appears twice');
  });

  it('should add numbers to seenNumbers array', async () => {
    component.inputArray = '1,2,3,4';
    await component.visualize();
    expect(component.seenNumbers).toEqual([1, 2, 3, 4]);
  });

  it('should reset the component state', () => {
    component.reset();
    expect(component.isPlaying).toBeFalse();
    expect(component.currentStep).toBe('Initial array loaded');
    expect(component.seenNumbers.length).toBe(0);
  });

  it('should toggle play/pause state', () => {
    component.togglePlayPause();
    expect(component.isPlaying).toBeTrue();
    component.togglePlayPause();
    expect(component.isPaused).toBeTrue();
  });

  it('should handle input changes', () => {
    component.inputArray = '5,6,7,8';
    component.onInputChange();
    expect(component.currentData.length).toBe(4);
  });
});
