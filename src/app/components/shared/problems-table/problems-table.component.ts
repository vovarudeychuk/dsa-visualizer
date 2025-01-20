import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';

export interface Problem {
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

@Component({
  selector: 'app-problems-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    RouterLink
  ],
  template: `
    <mat-card>
      <mat-card-content>
        <table mat-table [dataSource]="problems" class="mat-elevation-z2">
          <!-- Problem Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Problem </th>
            <td mat-cell *matCellDef="let problem" [routerLink]="[baseRoute, problem.name.toLowerCase().split(' ').join('-')]">
            {{problem.name}}
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
    .mat-column-difficulty {
      width: 120px;
    }
    td {
        cursor: pointer;
    }

  `]
})
export class ProblemsTableComponent {
  @Input() problems: Problem[] = [];
  @Input() categoryTitle: string = '';
  @Input() baseRoute: string = '';
  
  displayedColumns: string[] = ['name', 'difficulty'];
} 