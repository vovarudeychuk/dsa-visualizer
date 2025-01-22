import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ArrayProblemComponent } from '../../../../shared/base/array-problem.component';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { TopKFrequentService } from './top-k-frequent-elements.service';
import { TopKFrequentDataService } from './top-k-frequent-elements-data.service';

@Component({
  selector: 'app-top-k-frequent-elements',
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

      <div step-info>
        <div class="freq-map" *ngIf="freqMap.size > 0">
          <strong>Frequency Map:</strong>
          <div class="freq-counts">
            <div class="freq-count" *ngFor="let entry of freqMap | keyvalue">
              {{ entry.key }}: {{ entry.value }}
            </div>
          </div>
        </div>
      </div>
    </app-problem>
  `,
  styles: [`
    .freq-counts {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 8px;
    }

    .freq-count {
      background-color: #2c3e50;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: monospace;
    }
  `]
})
export class TopKFrequentElementsComponent extends ArrayProblemComponent {
  freqMap = new Map<number, number>();

  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: TopKFrequentService,
    private dataService: TopKFrequentDataService
  ) {
    super(visualizationService);
    this.inputValues = {
      array: '1,1,1,2,2,3',
      k: '2'
    };
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
  }

  protected async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    const data = this.algorithmService.parseInput(this.inputValues['array']);
    const k = parseInt(this.inputValues['k']);
    this.visualizationService.setData(data);
    
    await this.algorithmService.findTopKFrequent(
      data,
      k,
      (step) => this.currentStep = step,
      (map) => this.freqMap = map,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    const data = this.algorithmService.parseInput(this.inputValues['array']);
    this.freqMap.clear();
    this.visualizationService.setData(data);
  }
}
