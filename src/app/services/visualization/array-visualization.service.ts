import { Injectable, ElementRef } from '@angular/core';
import { SingleArrayRenderer } from './renderers/single-array-renderer';
import { DualArrayRenderer } from './renderers/dual-array-renderer';
import { ArrayAnimationService } from './animation/array-animation.service';
import { ArrayElement, VisualizationOptions, VisualizationSeparators } from './types/visualization.types';

@Injectable({
  providedIn: 'root'
})
export class ArrayVisualizationService {
  private renderer: SingleArrayRenderer | DualArrayRenderer | null = null;
  private currentData: ArrayElement[] = [];

  constructor(private animationService: ArrayAnimationService) {}

  initializeVisualization(container: ElementRef): void {
    this.renderer = new SingleArrayRenderer(container);
  }

  initializeDualVisualization(container1: ElementRef, container2: ElementRef): void {
    this.renderer = new DualArrayRenderer(container1, container2);
  }

  setData(data: ArrayElement[], showAsChars: boolean = false, separators?: VisualizationSeparators): void {
    this.currentData = data;
    if (this.renderer instanceof SingleArrayRenderer) {
      this.renderer.render(data, { showAsChars, separators });
    }
  }

  setDualData(data1: ArrayElement[], data2: ArrayElement[], options: VisualizationOptions = {}): void {
    if (this.renderer instanceof DualArrayRenderer) {
      this.renderer.render(data1, data2, options);
    }
  }

  private cloneData(data: ArrayElement[]): ArrayElement[] {
    return data.map(({ value, isDuplicate, isChecking, isHighlighted }) => ({
      value,
      isDuplicate,
      isChecking,
      isHighlighted
    }));
  }

  async markChecking(index: number) {
    const data = this.currentData.map((item, i) => 
      i === index ? { ...item, isChecking: true } : item
    );
    this.setData(data);
  }

  async markDuplicate(index: number) {
    const data = this.currentData.map((item, i) => 
      i === index ? { ...item, isDuplicate: true } : item
    );
    this.setData(data);
  }

  async clearChecking(index: number) {
    const data = this.currentData.map((item, i) => 
      i === index ? { ...item, isChecking: false } : item
    );
    this.setData(data);
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 