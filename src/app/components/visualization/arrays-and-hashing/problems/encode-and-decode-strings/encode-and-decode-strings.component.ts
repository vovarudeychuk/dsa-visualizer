import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ArrayProblemComponent } from '../../../../shared/base/array-problem.component';
import { ArrayVisualizationService, ArrayElement } from '../../../../../services/visualization/array-visualization.service';
import { EncodeAndDecodeStringsService } from './encode-and-decode-strings.service';
import { EncodeAndDecodeStringsDataService } from './encode-and-decode-strings-data.service';

@Component({
  selector: 'app-encode-and-decode-strings',
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
        <div #visualizationContainer class="visualization-container"></div>
      </div>

      <div step-info>
        <div class="decoded-strings" *ngIf="decodedStrings.length > 0">
          <strong>Decoded Strings:</strong>
          <div class="string-list">
            <div class="string-item" *ngFor="let str of decodedStrings">
              "{{ str }}"
            </div>
          </div>
        </div>
      </div>
    </app-problem>
  `,
  styles: [`
    .string-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 8px;
    }

    .string-item {
      background-color: #2c3e50;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: monospace;
    }
  `]
})
export class EncodeAndDecodeStringsComponent extends ArrayProblemComponent {
  protected animationSpeed = 1000;
  // @ViewChild('visualizationContainer') visualizationContainer!: ElementRef;
  
  encodedArray: ArrayElement[] = [];
  decodedStrings: string[] = [];

  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: EncodeAndDecodeStringsService,
    private dataService: EncodeAndDecodeStringsDataService
  ) {
    super(visualizationService);
    this.inputValues = {
      strings: 'Hello,World,LeetCode'
    };
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
  }

  protected override async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    this.decodedStrings = [];
    
    const strings = this.inputValues['strings'].split(',');
    
    // Encode
    this.currentStep = 'Starting encoding process...';
    this.encodedArray = await this.algorithmService.encode(
      strings,
      (step) => this.currentStep = step,
      () => this.isPaused,
      () => this.waitForResume()
    );

    await this.visualizationService.delay(this.animationSpeed);

    // Decode
    this.currentStep = 'Starting decoding process...';
    this.decodedStrings = await this.algorithmService.decode(
      this.encodedArray,
      (step) => this.currentStep = step,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    const strings = this.inputValues['strings'].split(',');
    this.encodedArray = strings.flatMap(str => this.algorithmService.parseInput(str));
    this.visualizationService.setData(this.encodedArray, true);
    this.decodedStrings = [];
  }
} 