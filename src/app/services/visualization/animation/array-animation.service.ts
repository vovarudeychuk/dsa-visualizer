import { Injectable } from '@angular/core';
import { ArrayElement } from '../types/visualization.types';

@Injectable({
  providedIn: 'root'
})
export class ArrayAnimationService {
  async animateSwap(index1: number, index2: number): Promise<void> {
    // Implementation   
  }

  async animateComparison(index1: number, index2: number): Promise<void> {
        // Implementation
  }

  async animateHighlight(index: number): Promise<void> {
    // Implementation
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 