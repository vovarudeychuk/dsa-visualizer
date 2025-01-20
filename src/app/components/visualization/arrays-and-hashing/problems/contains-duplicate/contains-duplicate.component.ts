import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ProblemData } from '../../../../shared/problem/problem.interface';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { ContainsDuplicateService } from './contains-duplicate.service';
import { CONTAINS_DUPLICATE_DATA } from './contains-duplicate.data';
import { ContainsDuplicateDataService } from './contains-duplicate-data.service';

interface ArrayElement {
  value: number;
  isDuplicate: boolean;
  isChecking: boolean;
}

@Component({
  selector: 'app-contains-duplicate',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatExpansionModule,
    ProblemComponent
  ],
  providers: [
    ContainsDuplicateService,
    ContainsDuplicateDataService
  ],
  template: `
    <app-problem
      [problemData]="problemData"
      [inputValue]="inputArray"
      [isPlaying]="isPlaying"
      [isPaused]="isPaused"
      [currentStep]="currentStep"
      (onInputChange)="onInputChange($event)"
      (onPlay)="togglePlayPause()"
      (onReset)="reset()">
      
      <div visualization>
        <div #visualizationContainer></div>
      </div>

      <div step-info>
        <div class="seen-numbers" *ngIf="seenNumbers.length > 0">
          <strong>Numbers seen so far:</strong> [{{ seenNumbers.join(', ') }}]
        </div>
      </div>
    </app-problem>
  `,
})
export class ContainsDuplicateComponent implements AfterViewInit {
  @ViewChild('visualizationContainer') private visualizationContainer!: ElementRef;
  
  problemData!: ProblemData;
  inputArray: string = '1,2,3,1';
  private svg: any;
  currentData: ArrayElement[] = [];
  isPlaying: boolean = false;
  isPaused: boolean = false;
  private animationSpeed: number = 1000;
  currentStep: string = 'Initial array loaded';
  seenNumbers: number[] = [];

  constructor(
    private visualizationService: ArrayVisualizationService,
    private algorithmService: ContainsDuplicateService,
    private dataService: ContainsDuplicateDataService
  ) {
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
  }

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

  async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    const data = this.algorithmService.parseInput(this.inputArray);
    this.visualizationService.setData(data);
    
    await this.algorithmService.findDuplicates(
      data,
      (step) => this.currentStep = step,
      (seen) => this.seenNumbers = seen,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  private async waitForResume(): Promise<void> {
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

  reset() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = 'Initial array loaded';
    this.seenNumbers = [];
    this.visualizationService.initializeVisualization(this.visualizationContainer);
    this.showInitialArray();
  }

  private showInitialArray() {
    const data = this.algorithmService.parseInput(this.inputArray);
    this.currentStep = 'Initial array loaded';
    this.seenNumbers = [];
    this.visualizationService.setData(data);
  }
}
