import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ArrayProblemComponent } from '../../../../shared/base/array-problem.component';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { ProductExceptSelfService } from './product-of-array-except-self.service';
import { ProductExceptSelfDataService } from './product-of-array-except-self-data.service';

@Component({
  selector: 'app-product-of-array-except-self',
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
export class ProductOfArrayExceptSelfComponent extends ArrayProblemComponent {
  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: ProductExceptSelfService,
    private dataService: ProductExceptSelfDataService
  ) {
    super(visualizationService);
    this.inputValues = {
      array: '1,2,3,4'
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
    this.visualizationService.setData(data);
    
    await this.algorithmService.calculateProducts(
      data,
      (step) => this.currentStep = step,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    const data = this.algorithmService.parseInput(this.inputValues['array']);
    this.visualizationService.setData(data);
  }
}
