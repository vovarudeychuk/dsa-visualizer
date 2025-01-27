import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ArrayProblemComponent } from '../../../../shared/base/array-problem.component';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { LongestConsecutiveService } from './longest-consecutive-sequence.service';
import { LongestConsecutiveDataService } from './longest-consecutive-sequence-data.service';

@Component({
  selector: 'app-longest-consecutive-sequence',
  standalone: true,
  imports: [
    CommonModule,
    ProblemComponent
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
    </app-problem>
  `
})
export class LongestConsecutiveSequenceComponent extends ArrayProblemComponent {
  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: LongestConsecutiveService,
    private dataService: LongestConsecutiveDataService
  ) {
    super(visualizationService);
    this.inputValues = {
      numbers: '100,4,200,1,3,2'
    };
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
  }

  protected async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    const data = this.algorithmService.parseInput(this.inputValues['numbers']);
    this.visualizationService.setData(data);
    
    await this.algorithmService.findLongestSequence(
      data,
      (step) => this.currentStep = step,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    const data = this.algorithmService.parseInput(this.inputValues['numbers']);
    this.visualizationService.setData(data);
  }
}
