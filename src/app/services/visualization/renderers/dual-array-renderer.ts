import { ElementRef, Injectable } from '@angular/core';
import { BaseArrayRenderer } from './base-renderer';
import { ArrayElement, VisualizationOptions } from '../types/visualization.types';
import { SingleArrayRenderer } from './single-array-renderer';

@Injectable()
export class DualArrayRenderer {
  private renderers: BaseArrayRenderer[];

  constructor(container1: ElementRef, container2: ElementRef) {
    this.renderers = [
      new SingleArrayRenderer(container1),
      new SingleArrayRenderer(container2)
    ];
  }

  render(data1: ArrayElement[], data2: ArrayElement[], options: VisualizationOptions): void {
    // Render both arrays with their respective renderers
    this.renderers[0].render(data1, {
      ...options,
      height: '75px' // Adjust height for dual view
    });
    
    this.renderers[1].render(data2, {
      ...options,
      height: '75px' // Adjust height for dual view
    });
  }

  // Helper method to update specific array
  updateArray(index: number, data: ArrayElement[], options: VisualizationOptions): void {
    if (index >= 0 && index < this.renderers.length) {
      this.renderers[index].render(data, {
        ...options,
        height: '75px'
      });
    }
  }
} 