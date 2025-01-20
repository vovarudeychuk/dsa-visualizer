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
  
  problemData: ProblemData = {
    title: 'Contains Duplicate',
    inputLabel: 'Enter array (comma-separated)',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true'
      },
      {
        input: 'nums = [1,2,3,4]',
        output: 'false'
      }
    ],
    solutionCode: `const containsDuplicate = (nums) => {
    const seen = new Set()

    for (const num of nums) {
        if (seen.has(num)) {
            return true  // Found a duplicate
        }
        seen.add(num)   // Add number to set
    }

    return false  // No duplicates found
}`,
    timeComplexity: 'O(n) - We only need to traverse the array once',
    spaceComplexity: 'O(n) - In the worst case, we might need to store all elements in the set',
    explanationSteps: [
      'Create an empty HashSet to store numbers we\'ve seen',
      'Iterate through each number in the array',
      'For each number, check if we\'ve seen it before (is it in the set?)',
      'If we have seen it, we found a duplicate - return true',
      'If we haven\'t seen it, add it to our set',
      'If we complete the loop without finding duplicates, return false'
    ]
  };

  inputArray: string = '1,2,3,1';
  private svg: any;
  currentData: ArrayElement[] = [];
  isPlaying: boolean = false;
  isPaused: boolean = false;
  private animationSpeed: number = 1000;
  currentStep: string = 'Initial array loaded';
  seenNumbers: number[] = [];

  constructor(private visualizationService: ArrayVisualizationService) {}

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
    
    const numbers = this.inputArray.split(',').map(n => ({
      value: parseInt(n.trim()),
      isDuplicate: false,
      isChecking: false
    }));

    this.currentData = numbers;
    this.visualizationService.setData(this.currentData);
    await this.findDuplicates();
  }

  private async findDuplicates() {
    const seen = new Set();
    this.seenNumbers = [];
    
    for (let i = 0; i < this.currentData.length; i++) {
      if (this.isPaused) {
        await this.waitForResume();
      }

      await this.visualizationService.markChecking(i);
      this.currentStep = `Checking number ${this.currentData[i].value}`;
      await this.visualizationService.delay(this.animationSpeed);

      if (seen.has(this.currentData[i].value)) {
        await this.visualizationService.markDuplicate(i);
        const firstIndex = this.currentData.findIndex(el => el.value === this.currentData[i].value);
        await this.visualizationService.markDuplicate(firstIndex);
        this.currentStep = `Found duplicate! Number ${this.currentData[i].value} appears twice`;
        this.isPlaying = false;
        return;
      }

      seen.add(this.currentData[i].value);
      this.seenNumbers.push(this.currentData[i].value);
      this.currentStep = `Added ${this.currentData[i].value} to seen numbers`;
      await this.visualizationService.clearChecking(i);
    }
    
    this.currentStep = 'No duplicates found in the array';
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
    const numbers = this.inputArray.split(',').map(n => ({
      value: parseInt(n.trim()),
      isDuplicate: false,
      isChecking: false
    }));

    this.currentData = numbers;
    this.currentStep = 'Initial array loaded';
    this.seenNumbers = [];
    this.visualizationService.setData(this.currentData);
  }
}
