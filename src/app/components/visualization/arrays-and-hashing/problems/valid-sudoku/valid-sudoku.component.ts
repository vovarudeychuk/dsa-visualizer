import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from '../../../../shared/problem/problem.component';
import { ValidSudokuService, SudokuCell } from './valid-sudoku.service';
import { ValidSudokuDataService } from './valid-sudoku-data.service';

@Component({
  selector: 'app-valid-sudoku',
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
        <div class="sudoku-board">
          <div *ngFor="let row of board; let i = index" class="sudoku-row">
            <div *ngFor="let cell of row; let j = index" 
                 class="sudoku-cell"
                 [class.checking]="cell.isChecking"
                 [class.invalid]="cell.isInvalid"
                 [class.box-border-right]="(j + 1) % 3 === 0 && j !== 8"
                 [class.box-border-bottom]="(i + 1) % 3 === 0 && i !== 8">
              {{ cell.value === '.' ? '' : cell.value }}
            </div>
          </div>
        </div>
      </div>
    </app-problem>
  `,
  styles: [`
    .sudoku-board {
      display: inline-block;
      border: 2px solid #333;
      padding: 2px;
      background: #fff;
    }

    .sudoku-row {
      display: flex;
    }

    .sudoku-cell {
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      font-family: monospace;
    }

    .box-border-right {
      border-right: 2px solid #333;
    }

    .box-border-bottom {
      border-bottom: 2px solid #333;
    }

    .checking {
      background-color: #e3f2fd;
    }

    .invalid {
      background-color: #ffebee;
      color: #d32f2f;
    }
  `]
})
export class ValidSudokuComponent {
  problemData: any;
  inputValues: { [key: string]: string } = {
    board: '53..7....,6..195...,.98....6.,8...6...3,4..8.3..1,7...2...6,.6....28.,....419..,...8..79.'
  };
  isPlaying = false;
  isPaused = false;
  currentStep = '';
  board: SudokuCell[][] = [];

  constructor(
    private algorithmService: ValidSudokuService,
    private dataService: ValidSudokuDataService
  ) {
    this.dataService.getProblemData().subscribe(data => {
      this.problemData = data;
    });
    this.showInitialBoard();
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
    this.showInitialBoard();
  }

  reset() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = '';
    this.showInitialBoard();
  }

  private async visualize() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    
    await this.algorithmService.validateSudoku(
      this.board,
      (step) => this.currentStep = step,
      () => this.isPaused,
      () => this.waitForResume()
    );
    
    this.isPlaying = false;
  }

  private showInitialBoard() {
    this.board = this.algorithmService.parseInput(this.inputValues['board']);
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
}
