import { Component } from '@angular/core';
import { ProblemsTableComponent, Problem } from '../../shared/problems-table/problems-table.component';

@Component({
  selector: 'app-arrays-and-hashing',
  standalone: true,
  imports: [ProblemsTableComponent],
  template: `
    <app-problems-table
      [problems]="problems"
      categoryTitle="Arrays & Hashing"
      baseRoute="./">
    </app-problems-table>
  `
})
export class ArraysAndHashingComponent {
  problems: Problem[] = [
    {
      name: 'Contains Duplicate',
      difficulty: 'Easy'
    },
    {
      name: 'Valid Anagram',
      difficulty: 'Easy'
    },
    {
      name: 'Two Sum',
      difficulty: 'Easy'
    },
    {
      name: 'Group Anagrams',
      difficulty: 'Medium'
    },
    {
      name: 'Top K Frequent Elements',
      difficulty: 'Medium'
    },
    {
      name: 'Product of Array Except Self',
      difficulty: 'Medium'
    },
    {
      name: 'Valid Sudoku',
      difficulty: 'Medium'
    },
    {
      name: 'Encode and Decode Strings',
      difficulty: 'Medium'
    },
    {
      name: 'Longest Consecutive Sequence',
      difficulty: 'Medium'
    }
  ];
} 