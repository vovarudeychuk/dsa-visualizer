import { Injectable } from '@angular/core';
import { ArrayVisualizationService, ArrayElement } from '../../../../../services/visualization/array-visualization.service';

@Injectable({
  providedIn: 'root'
})
export class TwoSumService {
  private animationSpeed = 1000;

  constructor(private visualizationService: ArrayVisualizationService) {}

  async findTwoSum(
    data: ArrayElement[],
    target: number,
    onStepUpdate: (step: string) => void,
    onMapUpdate: (map: Map<number, number>) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<void> {
    const hashMap = new Map<number, number>();
    
    for (let i = 0; i < data.length; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }

      await this.visualizationService.markChecking(i);
      onStepUpdate(`Looking for ${target - data[i].value} in hash map`);
      await this.visualizationService.delay(this.animationSpeed);

      const complement = target - data[i].value;
      if (hashMap.has(complement)) {
        const j = hashMap.get(complement)!;
        await this.visualizationService.markDuplicate(i);
        await this.visualizationService.markDuplicate(j);
        onStepUpdate(`Found solution! nums[${j}] + nums[${i}] = ${target}`);
        return;
      }

      hashMap.set(data[i].value, i);
      onMapUpdate(hashMap);
      onStepUpdate(`Added ${data[i].value} -> ${i} to hash map`);
      await this.visualizationService.clearChecking(i);
    }
    
    onStepUpdate('No solution found');
  }

  parseInput(input: string): ArrayElement[] {
    return input.split(',').map(n => ({
      value: parseInt(n.trim()),
      isDuplicate: false,
      isChecking: false
    }));
  }
} 