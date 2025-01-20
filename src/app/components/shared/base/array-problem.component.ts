import { Component, ElementRef, ViewChild, AfterViewInit, Directive } from '@angular/core';
import { ArrayVisualizationService } from '../../../services/visualization/array-visualization.service';
import { ProblemData } from '../problem/problem.interface';

@Directive()
export abstract class ArrayProblemComponent implements AfterViewInit {
  @ViewChild('visualizationContainer') protected visualizationContainer!: ElementRef;
  
  problemData!: ProblemData;
  inputArray: string = '';
  currentStep: string = 'Initial array loaded';
  isPlaying: boolean = false;
  isPaused: boolean = false;

  constructor(
    protected visualizationService: ArrayVisualizationService
  ) {}

  ngAfterViewInit() {
    this.visualizationService.initializeVisualization(this.visualizationContainer);
    this.showInitialArray();
  }

  onInputChange(value: string) {
    this.inputArray = value;
    if (!this.isPlaying) {
      this.showInitialArray();
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.isPaused = !this.isPaused;
    } else {
      this.visualize();
    }
  }

  reset() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = 'Initial array loaded';
    this.visualizationService.initializeVisualization(this.visualizationContainer);
    this.showInitialArray();
  }

  protected async waitForResume(): Promise<void> {
    return new Promise(resolve => {
      const checkPause = () => {
        if (!this.isPaused) {
          resolve();
        } else {
          setTimeout(checkPause, 100);
        }
      };
      checkPause();
    });
  }

  protected abstract visualize(): Promise<void>;
  protected abstract showInitialArray(): void;
} 