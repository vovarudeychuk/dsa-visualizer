import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ArrayProblemComponent } from '../../../../shared/base/array-problem.component';
import { ArrayVisualizationService, ArrayElement } from '../../../../../services/visualization/array-visualization.service';
import { GroupAnagramsService, AnagramGroup } from './group-anagrams.service';
import { GroupAnagramsDataService } from './group-anagrams-data.service';

@Component({
  selector: 'app-group-anagrams',
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
        <div class="visualization-container">
          <div #visualizationContainer></div>
          <div class="groups-container">
            <div 
              *ngFor="let group of anagramGroups" 
              class="anagram-group"
              [class.active]="group.isActive">
              <div class="group-key">Key: {{ group.key }}</div>
              <div class="group-strings">
                {{ getGroupStrings(group) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-problem>
  `,
  styles: [`
    .visualization-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      height: 100%;
    }

    .groups-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    .anagram-group {
      padding: 10px;
      background: rgba(76, 175, 80, 0.1);
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .anagram-group.active {
      background: rgba(76, 175, 80, 0.3);
      transform: scale(1.02);
    }

    .group-key {
      font-family: monospace;
      color: #4CAF50;
      margin-bottom: 5px;
    }

    .group-strings {
      font-family: monospace;
      color: #fff;
    }
  `]
})
export class GroupAnagramsComponent extends ArrayProblemComponent {
  // @ViewChild('visualizationContainer') visualizationContainer!: ElementRef;
  
  anagramGroups: AnagramGroup[] = [];
  strings: ArrayElement[][] = [];

  constructor(
    visualizationService: ArrayVisualizationService,
    private algorithmService: GroupAnagramsService,
    private dataService: GroupAnagramsDataService
  ) {
    super(visualizationService);
    this.inputArray = 'eat,tea,tan,ate,nat,bat';
    this.currentStep = 'Initial strings loaded';
    
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
  }

  protected async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    await this.algorithmService.groupAnagrams(
      this.strings,
      (step) => this.currentStep = step,
      (groups) => this.anagramGroups = groups,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  protected showInitialArray() {
    this.strings = this.algorithmService.parseInput(this.inputArray);
    this.anagramGroups = [];

    // Calculate string positions for initial visualization
    let currentPosition = 0;
    const stringPositions = this.strings.map(str => {
      currentPosition += str.length;
      return currentPosition;
    }).slice(0, -1); // Remove last separator as we don't need it after the last string

    // Initial visualization should only have string separators, no group separators
    this.visualizationService.setData(
      this.strings.flat(),
      true,
      { 
        stringPositions,
        groupPositions: [] 
      }
    );
  }

  getGroupStrings(group: AnagramGroup): string {
    return group.strings
      .map(chars => chars.map(char => String.fromCharCode(char.value)).join(''))
      .join(', ');
  }
}
