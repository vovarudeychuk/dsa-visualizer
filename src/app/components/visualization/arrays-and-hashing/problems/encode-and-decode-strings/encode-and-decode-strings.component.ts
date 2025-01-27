import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { EncodeDecodeStringsService, StringElement } from './encode-and-decode-strings.service';
import { EncodeDecodeStringsDataService } from './encode-and-decode-strings-data.service';

@Component({
  selector: 'app-encode-decode-strings',
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
        <div class="strings-container">
          <div class="strings-list">
            <div *ngFor="let str of strings" 
                 class="string-element"
                 [class.checking]="str.isChecking"
                 [class.encoded]="str.isEncoded">
              <div class="original-string">{{ str.value }}</div>
              <div *ngIf="str.encodedValue" class="encoded-value">
                {{ str.encodedValue }}
              </div>
            </div>
          </div>
          
          <div *ngIf="encodedString" class="encoded-result">
            <strong>Encoded:</strong> {{ encodedString }}
          </div>
          
          <div *ngIf="isDecoding" class="decoded-list">
            <strong>Decoded:</strong>
            <div *ngFor="let str of decodedStrings" 
                 class="string-element"
                 [class.checking]="str.isChecking">
              {{ str.value }}
            </div>
          </div>
        </div>
      </div>
    </app-problem>
  `,
  styles: [`
    .strings-container {
      padding: 20px;
      font-family: monospace;
    }

    .strings-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }

    .string-element {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .checking {
      /* background-color: #e3f2fd; */
      border-color: #2196f3;
    }

    .encoded {
      /* background-color: #f5f5f5; */
    }

    .encoded-value {
      margin-top: 5px;
      /* color: #2196f3; */
      font-size: 0.9em;
    }

    .encoded-result {
      margin: 20px 0;
      padding: 10px;
      /* background-color: #f5f5f5; */
      border-radius: 4px;
      word-break: break-all;
    }

    .decoded-list {
      margin-top: 20px;
    }
  `]
})
export class EncodeDecodeStringsComponent {
  problemData: any;
  inputValues: { [key: string]: string } = {
    strings: 'Hello,World,How,Are,You'
  };
  isPlaying = false;
  isPaused = false;
  currentStep = '';
  strings: StringElement[] = [];
  encodedString = '';
  decodedStrings: StringElement[] = [];
  isDecoding = false;

  constructor(
    private algorithmService: EncodeDecodeStringsService,
    private dataService: EncodeDecodeStringsDataService
  ) {
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
    this.showInitialStrings();
  }

  async togglePlayPause() {
    if (!this.isPlaying) {
      this.visualize();
    } else {
      this.isPaused = !this.isPaused;
    }
  }

  handleInputChange(values: { [key: string]: string }) {
    this.inputValues = values;
    this.showInitialStrings();
  }

  reset() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = '';
    this.encodedString = '';
    this.decodedStrings = [];
    this.isDecoding = false;
    this.showInitialStrings();
  }

  private async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    // Encode
    this.encodedString = await this.algorithmService.encodeStrings(
      this.strings,
      (step) => this.currentStep = step,
      () => this.isPaused,
      () => this.waitForResume()
    );

    await this.delay(1000);
    
    // Decode
    this.isDecoding = true;
    this.decodedStrings = await this.algorithmService.decodeString(
      this.encodedString,
      (step) => this.currentStep = step,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  private showInitialStrings() {
    this.strings = this.algorithmService.parseInput(this.inputValues['strings']);
  }

  private async waitForResume(): Promise<void> {
    return new Promise((resolve) => {
      const checkPaused = () => {
        if (!this.isPaused) {
          resolve();
        } else {
          setTimeout(checkPaused, 100);
        }
      };
      checkPaused();
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
