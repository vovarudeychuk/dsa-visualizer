import { Injectable } from '@angular/core';

export interface SudokuCell {
  value: string;
  isChecking: boolean;
  isInvalid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidSudokuService {
  private animationSpeed = 500;

  async validateSudoku(
    board: SudokuCell[][],
    onStepUpdate: (step: string) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<boolean> {
    const rows = Array(9).fill(null).map(() => new Set());
    const cols = Array(9).fill(null).map(() => new Set());
    const boxes = Array(9).fill(null).map(() => new Set());

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (isPaused()) {
          await onWaitForResume();
        }

        const num = board[i][j].value;
        if (num === '.') continue;

        // Mark current cell as checking
        board[i][j].isChecking = true;
        
        const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        onStepUpdate(`Checking number ${num} at position (${i}, ${j})`);
        
        await this.delay(this.animationSpeed);

        if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
          board[i][j].isInvalid = true;
          
          // Mark the conflicting cells
          for (let k = 0; k < 9; k++) {
            if (board[i][k].value === num && k !== j) {
              board[i][k].isInvalid = true; // Same row
            }
            if (board[k][j].value === num && k !== i) {
              board[k][j].isInvalid = true; // Same column
            }
          }

          // Mark conflicting box
          const boxStartRow = Math.floor(i / 3) * 3;
          const boxStartCol = Math.floor(j / 3) * 3;
          for (let row = boxStartRow; row < boxStartRow + 3; row++) {
            for (let col = boxStartCol; col < boxStartCol + 3; col++) {
              if (board[row][col].value === num && (row !== i || col !== j)) {
                board[row][col].isInvalid = true;
              }
            }
          }

          onStepUpdate(`Invalid! Found duplicate ${num} in ${
            rows[i].has(num) ? 'row' : 
            cols[j].has(num) ? 'column' : 'box'
          }`);
          return false;
        }

        rows[i].add(num);
        cols[j].add(num);
        boxes[boxIndex].add(num);
        
        board[i][j].isChecking = false;
      }
    }

    onStepUpdate('Valid Sudoku! No duplicates found.');
    return true;
  }

  parseInput(input: string): SudokuCell[][] {
    return input.split(',').map(row => 
      row.split('').map(cell => ({
        value: cell,
        isChecking: false,
        isInvalid: false
      }))
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 