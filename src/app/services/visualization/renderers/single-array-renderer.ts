import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { BaseArrayRenderer } from './base-renderer';
import { ArrayElement, VisualizationOptions } from '../types/visualization.types';

@Injectable()
export class SingleArrayRenderer extends BaseArrayRenderer {
  private readonly CELL_WIDTH = 40;
  private readonly CELL_PADDING = 4;
  private readonly FONT_SIZE = 14;

  constructor(container: ElementRef) {
    super(container);
    this.initializeSVG('150px');
  }

  render(data: ArrayElement[], options: VisualizationOptions): void {
    const defaultOptions: VisualizationOptions = {
      highlightColor: '#ffd700',
      checkingColor: '#87ceeb',
      duplicateColor: '#ff6b6b',
      defaultColor: '#ffffff',
      showAsChars: false,
      ...options
    };

    // Clear previous content
    this.svg.selectAll('*').remove();

    // Calculate total width needed
    const totalWidth = data.length * (this.CELL_WIDTH + this.CELL_PADDING);
    this.svg.attr('width', totalWidth);

    // Create group for each array element
    const cells = this.svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d: ArrayElement, i: number) => 
        `translate(${i * (this.CELL_WIDTH + this.CELL_PADDING)}, 10)`);

    // Add rectangles (cells)
    cells.append('rect')
      .attr('width', this.CELL_WIDTH)
      .attr('height', this.CELL_WIDTH)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('fill', (d: ArrayElement) => this.getCellColor(d, defaultOptions))
      .attr('stroke', '#000')
      .attr('stroke-width', 1);

    // Add text (values)
    cells.append('text')
      .attr('x', this.CELL_WIDTH / 2)
      .attr('y', this.CELL_WIDTH / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', this.FONT_SIZE)
      .text((d: ArrayElement) => this.getDisplayValue(d, defaultOptions));

    // Add separators if specified
    if (options.separators) {
      this.addSeparators(data, options.separators);
    }

    // Add glow effect for highlighted elements
    this.addGlowEffect();
  }

  private getCellColor(element: ArrayElement, options: VisualizationOptions): string {
    if (element.isHighlighted) return options.highlightColor!;
    if (element.isChecking) return options.checkingColor!;
    if (element.isDuplicate) return options.duplicateColor!;
    if (element.noBackground) return 'transparent';
    return options.defaultColor!;
  }

  private getDisplayValue(element: ArrayElement, options: VisualizationOptions): string {
    if (options.showAsChars) {
      return String.fromCharCode(element.value);
    }
    return element.value.toString();
  }

  private addSeparators(data: ArrayElement[], separators: any): void {
    const height = this.CELL_WIDTH + 20;

    // Add string separators
    if (separators.stringPositions) {
      separators.stringPositions.forEach((pos: number) => {
        const x = (pos + 0.5) * (this.CELL_WIDTH + this.CELL_PADDING);
        this.svg.append('line')
          .attr('x1', x)
          .attr('y1', 0)
          .attr('x2', x)
          .attr('y2', height)
          .attr('stroke', '#666')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '4,4');
      });
    }

    // Add group separators
    if (separators.groupPositions) {
      separators.groupPositions.forEach((pos: number) => {
        const x = (pos + 0.5) * (this.CELL_WIDTH + this.CELL_PADDING);
        this.svg.append('line')
          .attr('x1', x)
          .attr('y1', 0)
          .attr('x2', x)
          .attr('y2', height)
          .attr('stroke', '#333')
          .attr('stroke-width', 2);
      });
    }
  }

  private addGlowEffect(): void {
    // Define glow filter
    const defs = this.svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // Apply glow to highlighted elements
    this.svg.selectAll('rect')
      .filter((d: ArrayElement) => d.isHighlighted)
      .style('filter', 'url(#glow)');
  }
} 