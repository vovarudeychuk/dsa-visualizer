import { Component, ElementRef, ViewChild, AfterViewInit, Directive, OnInit } from '@angular/core';
import { ArrayVisualizationService } from '../../../services/visualization/array-visualization.service';
import { ProblemData } from '../problem/problem.interface';

@Directive()
export abstract class ArrayProblemComponent implements OnInit, AfterViewInit {
  @ViewChild('visualizationContainer') protected visualizationContainer!: ElementRef;
  
  protected problemData!: ProblemData;
  protected isPlaying: boolean = false;
  protected isPaused: boolean = false;
  protected currentStep: string = 'Initial array loaded';
  protected inputValues: { [key: string]: string } = {};
  protected isDualVisualization: boolean = false;

  constructor(
    protected visualizationService: ArrayVisualizationService
  ) {}

  ngOnInit() {
    this.currentStep = 'Initial array loaded';
  }

  ngAfterViewInit() {
    this.visualizationService.initializeVisualization(this.visualizationContainer);
    setTimeout(() => {
      this.showInitialArray();
    });
  }

  handleInputChange(event: {key: string, value: string}) {
    this.inputValues[event.key] = event.value;
    this.reset();
  }

  togglePlayPause() {
    if (!this.isPlaying) {
      this.visualize();
    } else {
      this.isPaused = !this.isPaused;
    }
  }

  reset() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = 'Initial array loaded';
    this.showInitialArray();
  }

  protected async waitForResume(): Promise<void> {
    return new Promise((resolve) => {
      const checkPaused = () => {
        if (!this.isPaused) {
          resolve();
        } else {
          setTimeout(checkPaused, 100);
        }
      };
      checkPaused();
    });
  }

  protected abstract visualize(): Promise<void>;
  protected abstract showInitialArray(): void;
} 