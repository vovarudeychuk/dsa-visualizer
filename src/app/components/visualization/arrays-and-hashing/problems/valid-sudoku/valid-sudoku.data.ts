import { ProblemData } from '../../../../shared/problem/problem.interface';

export const VALID_SUDOKU_DATA: ProblemData = {
  title: 'Valid Sudoku',
  inputs: [
    {
      label: 'Enter Sudoku board (use dots for empty cells)',
      value: '53..7....,6..195...,.98....6.,8...6...3,4..8.3..1,7...2...6,.6....28.,....419..,...8..79.',
      key: 'board'
    }
  ],
  description: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
  1. Each row must contain the digits 1-9 without repetition.
  2. Each column must contain the digits 1-9 without repetition.
  3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
  
  Note:
  - A Sudoku board (partially filled) could be valid but is not necessarily solvable.
  - Only the filled cells need to be validated according to the mentioned rules.`,
  examples: [
    {
      input: `board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]`,
      output: 'true'
    },
    {
      input: `board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]`,
      output: 'false (contains duplicate 8 in first column)'
    }
  ],
  solutionCode: `function isValidSudoku(board) {
    // Initialize sets for rows, columns, and boxes
    const rows = Array(9).fill().map(() => new Set());
    const cols = Array(9).fill().map(() => new Set());
    const boxes = Array(9).fill().map(() => new Set());
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const num = board[i][j];
            if (num === '.') continue;
            
            // Calculate box index
            const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            
            // Check if number already exists
            if (rows[i].has(num) || 
                cols[j].has(num) || 
                boxes[boxIndex].has(num)) {
                return false;
            }
            
            // Add number to sets
            rows[i].add(num);
            cols[j].add(num);
            boxes[boxIndex].add(num);
        }
    }
    
    return true;
}`,
  timeComplexity: 'O(1) - The board size is fixed at 9x9',
  spaceComplexity: 'O(1) - Using fixed size sets for validation',
  explanationSteps: [
    'Create sets to track numbers in each row, column, and 3x3 box',
    'Iterate through each cell in the board',
    'For each number, check if it already exists in its row, column, or box',
    'If a duplicate is found, the board is invalid',
    'If no duplicates are found, the board is valid'
  ]
}; 