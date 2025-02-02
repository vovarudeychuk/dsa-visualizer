import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { ArrayElement, VisualizationOptions } from '../types/visualization.types';

export abstract class BaseArrayRenderer {
  protected svg: any;
  protected container: ElementRef;

  constructor(container: ElementRef) {
    this.container = container;
  }

  protected initializeSVG(height: string): void {
    d3.select(this.container.nativeElement).selectAll('*').remove();
    this.svg = d3.select(this.container.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height);
  }

  abstract render(data: ArrayElement[], options: VisualizationOptions): void;
}