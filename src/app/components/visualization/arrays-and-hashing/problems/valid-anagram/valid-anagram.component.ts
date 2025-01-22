import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ArrayProblemComponent } from '../../../../shared/base/array-problem.component';
import { ArrayElement, ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { ValidAnagramService } from './valid-anagram.service';
import { ValidAnagramDataService } from './valid-anagram-data.service';

@Component({
  selector: 'app-valid-anagram',
  standalone: true,
  imports: [
    CommonModule,
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
        <div class="strings-container">
            <div #string1Container class="visualization-container"></div>
            <div #string2Container class="visualization-container"></div>
        </div>
      </div>

      <div step-info>
        <div class="char-map" *ngIf="charMap.size > 0">
          <strong>Character Count Map:</strong>
          <div class="char-counts">
            <div class="char-count" *ngFor="let entry of charMap | keyvalue">
              '{{ entry.key }}': {{ entry.value }}
            </div>
          </div>
        </div>
      </div>
    </app-problem>
  `,
  styles: [`
    .char-counts {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 8px;
    }

    .char-count {
      background-color: #2c3e50;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: monospace;
    }
  `]
})
export class ValidAnagramComponent extends ArrayProblemComponent implements OnInit, AfterViewInit {
  @ViewChild('string1Container') string1Container!: ElementRef;
  @ViewChild('string2Container') string2Container!: ElementRef;
  
  charMap = new Map<string, number>();
  string1: ArrayElement[] = [];
  string2: ArrayElement[] = [];

  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: ValidAnagramService,
    private dataService: ValidAnagramDataService
  ) {
    super(visualizationService);
    this.inputArray = 'anagram,nagaram';
    this.currentStep = 'Initial strings loaded';
  }

  ngOnInit() {
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
  }

  override ngAfterViewInit() {
    setTimeout(() => {
      this.visualizationService.initializeDualVisualization(
        this.string1Container,
        this.string2Container
      );
      this.showInitialArray();
    });
  }

  protected override async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    const [str1, str2] = this.inputArray.split(',');
    this.string1 = this.algorithmService.parseInput(str1);
    this.string2 = this.algorithmService.parseInput(str2);
    
    this.visualizationService.setDualData(this.string1, this.string2);
    
    await this.algorithmService.checkAnagram(
      this.string1,
      this.string2,
      (step) => this.currentStep = step,
      (map) => this.charMap = map,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    const [str1, str2] = this.inputArray.split(',');
    this.string1 = this.algorithmService.parseInput(str1);
    this.string2 = this.algorithmService.parseInput(str2);
    this.charMap.clear();
    this.visualizationService.setDualData(this.string1, this.string2);
  }
}
