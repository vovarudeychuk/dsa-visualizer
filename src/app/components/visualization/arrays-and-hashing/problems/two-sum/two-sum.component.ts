import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ArrayProblemComponent } from '../../../../shared/base/array-problem.component';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { TwoSumService } from './two-sum.service';
import { TwoSumDataService } from './two-sum-data.service';

@Component({
  selector: 'app-two-sum',
  standalone: true,
  imports: [
    CommonModule,
    ProblemComponent,
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
        <div class="hash-map" *ngIf="hashMap.size > 0">
          <strong>Hash Map:</strong> {{ displayHashMap() }}
        </div>
      </div>
    </app-problem>
  `
})
export class TwoSumComponent extends ArrayProblemComponent {
  hashMap = new Map<number, number>();
  target: number = 9;

  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: TwoSumService,
    private dataService: TwoSumDataService
  ) {
    super(visualizationService);
    this.inputArray = '2,7,11,15';
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
  }

  protected async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    const data = this.algorithmService.parseInput(this.inputArray);
    this.visualizationService.setData(data);
    
    await this.algorithmService.findTwoSum(
      data,
      this.target,
      (step) => this.currentStep = step,
      (map) => this.hashMap = map,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    const data = this.algorithmService.parseInput(this.inputArray);
    this.currentStep = 'Initial array loaded';
    this.hashMap.clear();
    this.visualizationService.setData(data);
  }

  displayHashMap(): string {
    return JSON.stringify(Object.fromEntries(this.hashMap));
  }
}
