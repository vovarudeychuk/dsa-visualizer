import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import * as d3 from 'd3';

interface ArrayElement {
  value: number;
  index: number;
  isPointerLeft?: boolean;
  isPointerRight?: boolean;
  isSwapping?: boolean;
}

@Component({
  selector: 'app-two-pointers',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule],
  template: `
    <div class="container">
      <mat-card class="visualization-card">
        <mat-card-header>
          <mat-card-title>Two Pointers Visualization</mat-card-title>
          <mat-card-subtitle>Sorting array by moving zeros to the end</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="visualization-container">
            <svg #svg></svg>
          </div>
          <div class="controls">
            <button mat-raised-button color="primary" (click)="resetArray()">Reset</button>
            <button mat-raised-button color="accent" (click)="nextStep()">Next Step</button>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="code-card">
        <mat-card-header>
          <mat-card-title>Solution Code</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <pre><code>{{solutionCode}}</code></pre>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      display: flex;
      gap: 20px;
      flex-direction: column;
    }

    .visualization-card, .code-card {
      width: 100%;
    }

    .visualization-container {
      width: 100%;
      height: 300px;
      margin: 20px 0;
    }

    .controls {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
    }

    code {
      font-family: 'Courier New', Courier, monospace;
    }
  `]
})
export class TwoPointersComponent implements OnInit {
  private svg: any;
  private width = 0;
  private height = 0;
  private margin = { top: 20, right: 20, bottom: 20, left: 20 };
  private data: ArrayElement[] = [];
  private currentStep = 0;
  private leftPointer = 0;
  private rightPointer = 0;

  readonly solutionCode = `function moveZeros(nums: number[]): void {
    let left = 0;
    let right = 0;
    
    while (right < nums.length) {
        if (nums[right] !== 0) {
            // Swap elements
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }
        right++;
    }
}`;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initializeSvg();
    this.resetArray();
  }

  private initializeSvg() {
    const container = this.elementRef.nativeElement.querySelector('.visualization-container');
    this.width = container.offsetWidth - this.margin.left - this.margin.right;
    this.height = container.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(this.elementRef.nativeElement.querySelector('svg'))
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  resetArray() {
    this.data = [0, 1, 0, 3, 12, 0, 5].map((value, index) => ({
      value,
      index,
      isPointerLeft: index === 0,
      isPointerRight: index === 0
    }));
    this.currentStep = 0;
    this.leftPointer = 0;
    this.rightPointer = 0;
    this.updateVisualization();
  }

  nextStep() {
    if (this.rightPointer >= this.data.length) return;

    if (this.data[this.rightPointer].value !== 0) {
      // Mark elements for swapping
      this.data[this.leftPointer].isSwapping = true;
      this.data[this.rightPointer].isSwapping = true;

      // Perform swap
      const temp = this.data[this.leftPointer].value;
      this.data[this.leftPointer].value = this.data[this.rightPointer].value;
      this.data[this.rightPointer].value = temp;

      // Update pointers
      this.data[this.leftPointer].isPointerLeft = false;
      this.leftPointer++;
      this.data[this.leftPointer].isPointerLeft = true;
    }

    // Move right pointer
    this.data[this.rightPointer].isPointerRight = false;
    this.rightPointer++;
    if (this.rightPointer < this.data.length) {
      this.data[this.rightPointer].isPointerRight = true;
    }

    this.currentStep++;
    this.updateVisualization();
  }

  private updateVisualization() {
    const elementWidth = this.width / this.data.length;
    const elementHeight = this.height / 2;

    // Remove existing elements
    this.svg.selectAll('*').remove();

    // Create array elements
    const elements = this.svg.selectAll('g')
      .data(this.data)
      .enter()
      .append('g')
      .attr('transform', (d: ArrayElement) => 
        `translate(${d.index * elementWidth + elementWidth/4},${this.height/2 - elementHeight/2})`);

    // Add rectangles
    elements.append('rect')
      .attr('width', elementWidth/2)
      .attr('height', elementHeight)
      .attr('rx', 5)
      .attr('ry', 5)
      .style('fill', (d: ArrayElement) => {
        if (d.isSwapping) return '#ffd740';
        if (d.isPointerLeft || d.isPointerRight) return '#c2185b';
        return '#3f51b5';
      });

    // Add text
    elements.append('text')
      .attr('x', elementWidth/4)
      .attr('y', elementHeight/2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('fill', 'white')
      .text((d: ArrayElement) => d.value);

    // Add pointer labels
    elements.filter((d: ArrayElement) => d.isPointerLeft)
      .append('text')
      .attr('x', elementWidth/4)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text('Left');

    elements.filter((d: ArrayElement) => d.isPointerRight)
      .append('text')
      .attr('x', elementWidth/4)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text('Right');
  }
}