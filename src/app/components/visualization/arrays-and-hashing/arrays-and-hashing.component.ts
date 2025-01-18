import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';

interface Problem {
  status: boolean;
  starred: boolean;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hasSolution: boolean;
}

@Component({
  selector: 'app-arrays-and-hashing',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckbox,
    RouterLink
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Arrays & Hashing Problems</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="problems" class="mat-elevation-z2">
          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef> Status </th>
            <td mat-cell *matCellDef="let problem">
              <mat-checkbox [checked]="problem.status" disabled></mat-checkbox>
            </td>
          </ng-container>

          <!-- Star Column -->
          <ng-container matColumnDef="starred">
            <th mat-header-cell *matHeaderCellDef> Star </th>
            <td mat-cell *matCellDef="let problem">
              <mat-icon [class.starred]="problem.starred">
                {{problem.starred ? 'star' : 'star_border'}}
              </mat-icon>
            </td>
          </ng-container>

          <!-- Problem Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Problem </th>
            <td mat-cell *matCellDef="let problem">
              <a [routerLink]="[problem.name.toLowerCase().split(' ').join('-')]">
                {{problem.name}}
                <mat-icon class="external-link">open_in_new</mat-icon>
              </a>
            </td>
          </ng-container>

          <!-- Difficulty Column -->
          <ng-container matColumnDef="difficulty">
            <th mat-header-cell *matHeaderCellDef> Difficulty </th>
            <td mat-cell *matCellDef="let problem">
              <mat-chip [class]="problem.difficulty.toLowerCase()">
                {{problem.difficulty}}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Solution Column -->
          <ng-container matColumnDef="solution">
            <th mat-header-cell *matHeaderCellDef> Solution </th>
            <td mat-cell *matCellDef="let problem">
              <button mat-icon-button *ngIf="problem.hasSolution">
                <mat-icon>play_circle_outline</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
    }
    table {
      width: 100%;
    }
    .starred {
      color: #ffd700;
    }
    .external-link {
      font-size: 16px;
      vertical-align: middle;
      margin-left: 4px;
    }
    a {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
    }
    .mat-column-status,
    .mat-column-starred,
    .mat-column-solution {
      width: 80px;
      text-align: center;
    }
    .mat-column-difficulty {
      width: 120px;
    }
    mat-chip.easy {
      background-color: #00ff00;
      color: white;
    }
    mat-chip.medium {
      background-color: #ffa500;
      color: white;
    }
    mat-chip.hard {
      background-color: #ff0000;
      color: white;
    }
  `]
})
export class ArraysAndHashingComponent {
  displayedColumns: string[] = ['status', 'starred', 'name', 'difficulty', 'solution'];
  
  problems: Problem[] = [
    {
      status: false,
      starred: true,
      name: 'Contains Duplicate',
      difficulty: 'Easy',
      hasSolution: true
    },
    {
      status: false,
      starred: true,
      name: 'Valid Anagram',
      difficulty: 'Easy',
      hasSolution: true
    },
    {
      status: false,
      starred: true,
      name: 'Two Sum',
      difficulty: 'Easy',
      hasSolution: true
    },
    {
      status: false,
      starred: true,
      name: 'Group Anagrams',
      difficulty: 'Medium',
      hasSolution: true
    },
    {
      status: false,
      starred: true,
      name: 'Top K Frequent Elements',
      difficulty: 'Medium',
      hasSolution: true
    },
    {
      status: false,
      starred: true,
      name: 'Encode and Decode Strings',
      difficulty: 'Medium',
      hasSolution: true
    },
    {
      status: false,
      starred: true,
      name: 'Product of Array Except Self',
      difficulty: 'Medium',
      hasSolution: true
    },
    {
      status: false,
      starred: true,
      name: 'Valid Sudoku',
      difficulty: 'Medium',
      hasSolution: true
    },
    {
      status: false,
      starred: true,
      name: 'Longest Consecutive Sequence',
      difficulty: 'Medium',
      hasSolution: true
    }
  ];
} 