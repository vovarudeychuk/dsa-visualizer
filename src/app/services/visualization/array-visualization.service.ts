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

  // New properties for multiple visualizations
  private svgs: any[] = [];
  private containers: ElementRef[] = [];
  private isMultipleMode = false;

  initializeVisualization(container: ElementRef) {
    this.isMultipleMode = false;
    this.container = container;
    d3.select(this.container.nativeElement).selectAll('*').remove();
    this.svg = d3.select(this.container.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');
  }

  initializeDualVisualization(container1: ElementRef, container2: ElementRef) {
    this.isMultipleMode = true;
    this.containers = [container1, container2];
    this.svgs = this.containers.map(container => {
      d3.select(container.nativeElement).selectAll('*').remove();
      return d3.select(container.nativeElement)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%');
    });
  }

  setData(data: ArrayElement[]) {
    if (this.isMultipleMode) {
      console.error('Service is in multiple visualization mode');
      return;
    }
    this.currentData = [...data];
    this.visualizeArray(this.currentData);
  }

  setDualData(data1: ArrayElement[], data2: ArrayElement[]) {
    if (!this.isMultipleMode) {
      console.error('Service is in single visualization mode');
      return;
    }
    this.visualizeDualArrays(data1, data2);
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
    if (!this.container || !this.svg || this.isMultipleMode) return;

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

  private visualizeDualArrays(data1: ArrayElement[], data2: ArrayElement[]) {
    if (!this.isMultipleMode || this.svgs.length !== 2) return;

    [data1, data2].forEach((data, index) => {
      const svg = this.svgs[index];
      const container = this.containers[index];
      const width = container.nativeElement.offsetWidth;
      const height = container.nativeElement.offsetHeight;
      const elementWidth = Math.min(60, width / data.length - 10);

      const elements = svg.selectAll('g')
        .data(data)
        .join('g')
        .attr('transform', (d: any, i: number) => 
          `translate(${i * (elementWidth + 10) + 20}, ${height/2 - 30})`);

      elements.selectAll('rect')
        .data((d: ArrayElement) => [d])
        .join('rect')
        .attr('width', elementWidth)
        .attr('height', elementWidth)
        .attr('rx', 5)
        .attr('fill', (d: ArrayElement) => {
          if (d.isDuplicate) return '#ff4444';
          if (d.isChecking) return '#ffd700';
          if (d.isHighlighted) return '#ffd700';
          return '#4CAF50';
        });

      elements.selectAll('text')
        .data((d: ArrayElement)  => [d])
        .join('text')
        .attr('x', elementWidth/2)
        .attr('y', elementWidth/2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'white')
        .text((d: ArrayElement) => String.fromCharCode(d.value));
    });
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
    if (!this.isMultipleMode) {
      await this.visualizeArray(this.currentData);
    }
  }

  async markChecking(index: number) {
    if (!this.currentData[index]) return;
    this.currentData[index].isChecking = true;
    if (!this.isMultipleMode) {
      await this.visualizeArray(this.currentData);
    }
  }

  async clearChecking(index: number) {
    if (!this.currentData[index]) return;
    this.currentData[index].isChecking = false;
    if (!this.isMultipleMode) {
      await this.visualizeArray(this.currentData);
    }
  }

  // Utility methods
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 