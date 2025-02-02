import { Injectable } from '@angular/core';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { ArrayElement } from '../../../../../services/visualization/types/visualization.types';

@Injectable({
  providedIn: 'root'
})
export class ProductExceptSelfService {
  private animationSpeed = 1000;

  constructor(private visualizationService: ArrayVisualizationService) {}

  async calculateProducts(
    data: ArrayElement[],
    onStepUpdate: (step: string) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<void> {
    const n = data.length;
    const answer = new Array(n).fill(1);
    
    // Calculate prefix products
    for (let i = 1; i < n; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }

      await this.visualizationService.markChecking(i - 1);
      answer[i] = data[i - 1].value * answer[i - 1];
      onStepUpdate(`Calculating prefix product at position ${i}`);
      await this.visualizationService.delay(this.animationSpeed);
      await this.visualizationService.clearChecking(i - 1);
    }

    // Calculate suffix products and combine
    let suffixProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
      if (isPaused()) {
        await onWaitForResume();
      }

      await this.visualizationService.markChecking(i);
      const oldAnswer = answer[i];
      answer[i] = answer[i] * suffixProduct;
      suffixProduct *= data[i].value;
      
      data[i].value = answer[i];
      data[i].isDuplicate = true;
      
      onStepUpdate(`Calculating final product at position ${i}: ${oldAnswer} * ${suffixProduct / data[i].value} = ${answer[i]}`);
      this.visualizationService.setData([...data]);
      await this.visualizationService.delay(this.animationSpeed);
      await this.visualizationService.clearChecking(i);
    }
  }

  parseInput(input: string): ArrayElement[] {
    return input.split(',').map(n => ({
      value: parseInt(n.trim()),
      isDuplicate: false,
      isChecking: false
    }));
  }
} 