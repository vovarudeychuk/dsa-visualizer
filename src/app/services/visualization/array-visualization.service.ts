import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';

export interface ArrayElement {
  value: number;
  isDuplicate?: boolean;
  isChecking?: boolean;
  isHighlighted?: boolean;
  isBracket?: boolean;
  isSeparator?: boolean;
  noBackground?: boolean;
  separators?: VisualizationSeparators;
}

export interface VisualizationSeparators {
  stringPositions: number[];  // Positions for thin separators between strings
  groupPositions: number[];   // Positions for thick separators between groups
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
    // Clear any existing content
    d3.select(this.container.nativeElement).selectAll('*').remove();
    this.svg = d3.select(this.container.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '150px'); // Set fixed height
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

  setData(data: ArrayElement[], showAsChars: boolean = false, separators?: VisualizationSeparators) {
    this.currentData = data.map(({ value, isDuplicate, isChecking, isHighlighted }) => ({
      value,
      isDuplicate,
      isChecking,
      isHighlighted
    }));

    this.visualizeArray(this.currentData, { showAsChars, separators, defaultColor: '#4CAF50' });
  }

  setDualData(data1: ArrayElement[], data2: ArrayElement[]) {
    if (!this.isMultipleMode) {
      console.error('Service is in single visualization mode');
      return;
    }
    this.visualizeDualArrays(data1, data2);
  }

  async visualizeArray(data: ArrayElement[] = this.currentData, options: {
    highlightColor?: string;
    checkingColor?: string;
    duplicateColor?: string;
    defaultColor?: string;
    showAsChars?: boolean;
    separators?: VisualizationSeparators;
  } = {}) {
    if (!this.container || !this.svg) return;

    this.svg.selectAll('*').remove(); // Clear existing content

    const {
      highlightColor = '#ffd700',
      checkingColor = '#ffd700',
      duplicateColor = '#ff4444',
      defaultColor = '#4CAF50',
      showAsChars = false,
      separators
    } = options;

    const containerWidth = this.container.nativeElement.offsetWidth;
    const containerHeight = 150; // Fixed height
    const padding = 40;
    const minSpacing = 5;

    const availableWidth = containerWidth - padding;
    const elementWidth = Math.max(20, Math.min(50, (availableWidth / data.length) - minSpacing));
    const spacing = Math.max(minSpacing, Math.min(10, (availableWidth - (elementWidth * data.length)) / Math.max(1, data.length - 1)));

    this.svg
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // Calculate exact positions
    const startX = 20; // Initial padding
    
    // Function to calculate the middle position between nodes
    const getMiddlePosition = (position: number) => {
      return startX + (position * (elementWidth + spacing)) + elementWidth + (spacing / 2);
    };

    // Add separators with enhanced styling
    if (separators) {
      // String separators (thin lines)
      separators.stringPositions.forEach(position => {
        const xPos = getMiddlePosition(position - 1); // Adjust position calculation
        
        // Add glow effect
        this.svg.append('line')
          .attr('class', 'separator-glow')
          .attr('x1', xPos)
          .attr('y1', containerHeight/2 - 35)
          .attr('x2', xPos)
          .attr('y2', containerHeight/2 + 15)
          .attr('stroke', '#4CAF50')
          .attr('stroke-width', 3)
          .attr('stroke-opacity', '0.2')
          .attr('filter', 'url(#glow)');

        // Add main separator line
        this.svg.append('line')
          .attr('class', 'separator')
          .attr('x1', xPos)
          .attr('y1', containerHeight/2 - 35)
          .attr('x2', xPos)
          .attr('y2', containerHeight/2 + 15)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .attr('stroke-dasharray', '4,3')
          .style('opacity', '0.6');
      });

      // Group separators (thick lines)
      separators.groupPositions.forEach(position => {
        const xPos = getMiddlePosition(position - 1); // Adjust position calculation
        
        // Add glow effect
        this.svg.append('line')
          .attr('class', 'group-separator-glow')
          .attr('x1', xPos)
          .attr('y1', containerHeight/2 - 45)
          .attr('x2', xPos)
          .attr('y2', containerHeight/2 + 25)
          .attr('stroke', '#4CAF50')
          .attr('stroke-width', 6)
          .attr('stroke-opacity', '0.3')
          .attr('filter', 'url(#glow)');

        // Add main group separator line
        this.svg.append('line')
          .attr('class', 'group-separator')
          .attr('x1', xPos)
          .attr('y1', containerHeight/2 - 45)
          .attr('x2', xPos)
          .attr('y2', containerHeight/2 + 25)
          .attr('stroke', '#fff')
          .attr('stroke-width', 2.5)
          .style('opacity', '0.8');
      });
    }

    // Add SVG filters for glow effect
    const defs = this.svg.append('defs');
    
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');

    // Update elements with new positioning
    const elements = this.svg.selectAll('g.element')
      .data(data)
      .join('g')
      .attr('class', 'element')
      .attr('transform', (d: any, i: number) => 
        `translate(${startX + (i * (elementWidth + spacing))}, ${containerHeight/2 - 25})`);

    // Add subtle shadow to nodes
    elements.selectAll('rect')
      .data((d: ArrayElement) => [d])
      .join('rect')
      .attr('width', elementWidth)
      .attr('height', elementWidth)
      .attr('rx', 4)  // Slightly rounded corners
      .attr('filter', 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))')
      .attr('fill', (d: ArrayElement) => {
        if (d.isSeparator) return 'transparent';  // Just use isSeparator for empty nodes
        if (d.isDuplicate) return duplicateColor;
        if (d.isChecking) return checkingColor;
        if (d.isHighlighted) return highlightColor;
        return defaultColor;
      });

    // Adjust text with better contrast
    const fontSize = Math.max(12, Math.min(16, elementWidth * 0.6));
    
    elements.selectAll('text')
      .data((d: ArrayElement) => [d])
      .join('text')
      .attr('x', elementWidth/2)
      .attr('y', elementWidth/2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')  // Make text bold
      .style('font-size', `${fontSize}px`)
      .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.3)')  // Text shadow
      .text((d: ArrayElement) => showAsChars ? String.fromCharCode(d.value) : d.value);
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
          if (d.isSeparator) return 'transparent';  // Just use isSeparator for empty nodes
          if (d.isBracket) return '#888';
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