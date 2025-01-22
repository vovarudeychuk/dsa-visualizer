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
      [inputValues]="inputValues"
      [isPlaying]="isPlaying"
      [isPaused]="isPaused"
      [currentStep]="currentStep"
      (onInputChange)="handleInputChange($event)"
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
  // inputValues: { [key: string]: string } = {};

  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: TwoSumService,
    private dataService: TwoSumDataService
  ) {
    super(visualizationService);
    this.inputValues = {
      array: '2,7,11,15',
      target: '9'
    };
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
  }

  // override handleInputChange(event: {key: string, value: string}) {
  //   this.inputValues[event.key] = event.value;
  //   this.reset();
  // }

  protected async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    const data = this.algorithmService.parseInput(this.inputValues['array']);
    const target = parseInt(this.inputValues['target']);
    this.visualizationService.setData(data);
    
    await this.algorithmService.findTwoSum(
      data,
      target,
      (step) => this.currentStep = step,
      (map) => this.hashMap = map,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    const data = this.algorithmService.parseInput(this.inputValues['array']);
    this.visualizationService.setData(data);
  }

  displayHashMap(): string {
    return JSON.stringify(Object.fromEntries(this.hashMap));
  }
}
