import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ArrayProblemComponent } from '../../../../shared/base/array-problem.component';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { ContainsDuplicateService } from './contains-duplicate.service';
import { ContainsDuplicateDataService } from './contains-duplicate-data.service';

@Component({
  selector: 'app-contains-duplicate',
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
        <div class="seen-numbers" *ngIf="seenNumbers.length > 0">
          <strong>Numbers seen so far:</strong> [{{ seenNumbers.join(', ') }}]
        </div>
      </div>
    </app-problem>
  `,
})
export class ContainsDuplicateComponent extends ArrayProblemComponent {
  seenNumbers: number[] = [];

  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: ContainsDuplicateService,
    private dataService: ContainsDuplicateDataService
  ) {
    super(visualizationService);
    this.inputArray = '1,2,3,1';
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
    
    await this.algorithmService.findDuplicates(
      data,
      (step) => this.currentStep = step,
      (seen) => this.seenNumbers = seen,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    const data = this.algorithmService.parseInput(this.inputArray);
    this.currentStep = 'Initial array loaded';
    this.seenNumbers = [];
    this.visualizationService.setData(data);
  }
}
