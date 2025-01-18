import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contains-duplicate',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Contains Duplicate</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="problem-description">
          <h3>Problem Description</h3>
          <p>Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.</p>
          
          <h3>Examples</h3>
          <pre>
Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false
          </pre>
        </div>

        <div class="solution-workspace">
          <h3>Solution Workspace</h3>
          <!-- Add visualization content here -->
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
    }
    .problem-description {
      margin-bottom: 24px;
    }
    pre {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
    }
    .solution-workspace {
      margin-top: 24px;
    }
  `]
})
export class ContainsDuplicateComponent {
  // Component logic will go here
}
