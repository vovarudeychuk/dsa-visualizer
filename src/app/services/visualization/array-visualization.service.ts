import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';

export interface ArrayElement {
  value: number;
  isHighlighted?: boolean;
  isChecking?: boolean;
  isDuplicate?: boolean;
  isSwapping?: boolean;
  // Add other states as needed for different problems
}

@Injectable({
  providedIn: 'root'
})
export class ArrayVisualizationService {
  private svg: any;
  private container: ElementRef | undefined;
  private currentData: ArrayElement[] = [];

  initializeVisualization(container: ElementRef) {
    this.container = container;
    d3.select(this.container.nativeElement).selectAll('*').remove();
    this.svg = d3.select(this.container.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');
  }

  setData(data: ArrayElement[]) {
    this.currentData = [...data];
    this.visualizeArray(this.currentData);
  }

  async visualizeArray(
    data: ArrayElement[] = this.currentData,
    options: {
      highlightColor?: string;
      checkingColor?: string;
      duplicateColor?: string;
      defaultColor?: string;
    } = {}
  ) {
    if (!this.container || !this.svg) return;

    const {
      highlightColor = '#ffd700',
      checkingColor = '#ffd700',
      duplicateColor = '#ff4444',
      defaultColor = '#4CAF50'
    } = options;

    const width = this.container.nativeElement.offsetWidth;
    const height = this.container.nativeElement.offsetHeight;
    const elementWidth = Math.min(60, width / data.length - 10);

    const elements = this.svg.selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', (d: any, i: number) => 
        `translate(${i * (elementWidth + 10) + 20}, ${height/2 - 30})`);

    // Update rectangles
    elements.selectAll('rect')
      .data((d: ArrayElement) => [d])
      .join('rect')
      .attr('width', elementWidth)
      .attr('height', elementWidth)
      .attr('rx', 5)
      .attr('fill', (d: ArrayElement) => {
        if (d.isDuplicate) return duplicateColor;
        if (d.isChecking) return checkingColor;
        if (d.isHighlighted) return highlightColor;
        return defaultColor;
      });

    // Update text
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

  // Animation helpers
  async animateSwap(index1: number, index2: number) {
    // Implement swap animation
  }

  async animateComparison(index1: number, index2: number) {
    // Implement comparison animation
  }

  async animateHighlight(index: number) {
    // Implement highlight animation
  }

  // Common array operations with animations
  async markDuplicate(index: number) {
    if (!this.currentData[index]) return;
    this.currentData[index].isDuplicate = true;
    await this.visualizeArray(this.currentData);
  }

  async markChecking(index: number) {
    if (!this.currentData[index]) return;
    this.currentData[index].isChecking = true;
    await this.visualizeArray(this.currentData);
  }

  async clearChecking(index: number) {
    if (!this.currentData[index]) return;
    this.currentData[index].isChecking = false;
    await this.visualizeArray(this.currentData);
  }

  // Utility methods
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 