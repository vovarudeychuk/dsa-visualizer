import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

interface ArrayElement {
  value: number;
  isDuplicate: boolean;
  isChecking: boolean;
}

@Component({
  selector: 'app-contains-duplicate',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './contains-duplicate.component.html',
  styles: [`
    .container {
      padding: 20px;
    }

    .problem-card {
      max-width: 1200px;
      margin: 0 auto;
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
      margin: 24px 0;
    }

    .controls {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 24px;
    }

    .visualization-container {
      height: 200px;
      margin: 20px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .code-block {
      background-color: #1e1e1e;
      color: #d4d4d4;
      padding: 16px;
      border-radius: 4px;
      margin: 16px 0;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      white-space: pre;
      overflow-x: auto;
    }

    .explanation-steps {
      margin-top: 16px;
      padding: 16px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }

    mat-divider {
      margin: 24px 0;
    }
  `]
})
export class ContainsDuplicateComponent implements AfterViewInit {
  @ViewChild('visualizationContainer') private visualizationContainer!: ElementRef;
  
  inputArray: string = '1,2,3,1';
  private svg: any;
  private currentData: ArrayElement[] = [];

  readonly solutionCode = `const containsDuplicate = (nums) => {
    const seen = new Set()

    for (const num of nums) {
        if (seen.has(num)) {
            return true  // Found a duplicate
        }
        seen.add(num)   // Add number to set
    }

    return false  // No duplicates found
}`;

  resetArray() {
    this.initializeVisualization();
    this.currentData = [];
  }

  ngAfterViewInit() {
    this.initializeVisualization();
    this.resetArray();
  }

  private initializeVisualization() {
    // Clear any existing SVG
    d3.select(this.visualizationContainer.nativeElement).selectAll('*').remove();

    // Create new SVG
    this.svg = d3.select(this.visualizationContainer.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');
  }

  async visualize() {
    const numbers = this.inputArray.split(',').map(n => ({
      value: parseInt(n.trim()),
      isDuplicate: false,
      isChecking: false
    }));

    this.currentData = numbers;
    await this.visualizeArray();
    await this.findDuplicates();
  }

  private async visualizeArray() {
    const width = this.visualizationContainer.nativeElement.offsetWidth;
    const height = this.visualizationContainer.nativeElement.offsetHeight;
    
    const elementWidth = Math.min(60, width / this.currentData.length - 10);
    
    // Update visualization
    const elements = this.svg.selectAll('g')
      .data(this.currentData)
      .join('g')
      .attr('transform', (d: any, i: number) => 
        `translate(${i * (elementWidth + 10) + 20}, ${height/2 - 30})`);

    // Add rectangles
    elements.selectAll('rect')
      .data((d: ArrayElement) => [d])
      .join('rect')
      .attr('width', elementWidth)
      .attr('height', elementWidth)
      .attr('rx', 5)
      .attr('fill', (d: ArrayElement) => 
        d.isDuplicate ? '#ff4444' : 
        d.isChecking ? '#ffd700' : '#4CAF50');

    // Add text
    elements.selectAll('text')
      .data((d: ArrayElement) => [d])
      .join('text')
      .attr('x', elementWidth/2)
      .attr('y', elementWidth/2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'white')
      .text((d: ArrayElement) => d.value);
  }

  private async findDuplicates() {
    const seen = new Set();
    
    for (let i = 0; i < this.currentData.length; i++) {
      this.currentData[i].isChecking = true;
      await this.visualizeArray();
      await this.delay(1000);

      if (seen.has(this.currentData[i].value)) {
        this.currentData[i].isDuplicate = true;
        // Find the first occurrence and mark it as duplicate
        const firstIndex = this.currentData.findIndex(el => el.value === this.currentData[i].value);
        this.currentData[firstIndex].isDuplicate = true;
        await this.visualizeArray();
        return;
      }

      seen.add(this.currentData[i].value);
      this.currentData[i].isChecking = false;
      await this.visualizeArray();
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  reset() {
    this.initializeVisualization();
    this.currentData = [];
  }
}
