import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProblemData } from './problem.interface';

@Component({
    selector: 'app-problem',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDividerModule,
        MatIconModule,
        MatExpansionModule,
        FormsModule
    ],
    template: `
    <div class="container">
      <mat-card class="problem-card">
  
        <mat-card-content>
          <div class="problem-description">
            <h3>Problem Description</h3>
            <p>{{ problemData.description }}</p>
            
            <h3>Examples</h3>
            <pre *ngFor="let example of problemData.examples">
Input: {{ example.input }}
Output: {{ example.output }}</pre>
          </div>

          <mat-divider></mat-divider>

          <div class="solution-workspace">
            <h3>Solution Workspace</h3>
            
            <div class="controls">
              <div class="inputs-container">
                <mat-form-field *ngFor="let input of problemData.inputs">
                  <mat-label>{{ input.label }}</mat-label>
                  <input matInput 
                         [value]="inputValues[input.key] || ''"
                         (ngModelChange)="onInputChange.emit({key: input.key, value: $event})"
                         [(ngModel)]="inputValues[input.key]">
                </mat-form-field>
              </div>
              
              <button mat-raised-button color="primary" 
                      (click)="onPlay.emit()"
                      [disabled]="isPlaying && !isPaused">
                <mat-icon>{{(!isPlaying || isPaused) ? 'play_arrow' : 'pause'}}</mat-icon>
                {{(!isPlaying || isPaused) ? 'Play' : 'Pause'}}
              </button>
              
              <button mat-raised-button color="accent" (click)="onReset.emit()">
                <mat-icon>restart_alt</mat-icon>
                Reset
              </button>
            </div>

            <div class="visualization-section">
              <div class="visualization-container">
                <ng-content select="[visualization]"></ng-content>
              </div>
              
              <div class="step-info">
                <div class="step-status">
                  <strong>Current Step:</strong> {{ currentStep }}
                </div>
                <ng-content select="[step-info]"></ng-content>
              </div>
            </div>
          </div>

          <mat-divider></mat-divider>

          <mat-accordion>
            <mat-expansion-panel class="solution-explanation">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  Solution Explanation
                </mat-panel-title>
              </mat-expansion-panel-header>

              <p>This problem can be solved efficiently using a HashSet. Here's how it works:</p>
              <div class="code-block">
                <pre><code>{{ problemData.solutionCode }}</code></pre>
              </div>
              <p><strong>Time Complexity:</strong> {{ problemData.timeComplexity }}</p>
              <p><strong>Space Complexity:</strong> {{ problemData.spaceComplexity }}</p>
              
              <div class="explanation-steps">
                <h4>How it works:</h4>
                <ol>
                  <li *ngFor="let step of problemData.explanationSteps">{{ step }}</li>
                </ol>
              </div>
            </mat-expansion-panel>
          </mat-accordion>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styleUrls: ['./problem.component.scss']
})
export class ProblemComponent {
    @Input() problemData!: ProblemData;
    @Input() inputValues: { [key: string]: string } = {};
    @Input() isPlaying: boolean = false;
    @Input() isPaused: boolean = false;
    @Input() currentStep: string = '';

    @Output() onInputChange = new EventEmitter<{key: string, value: string}>();
    @Output() onPlay = new EventEmitter<void>();
    @Output() onReset = new EventEmitter<void>();
} 