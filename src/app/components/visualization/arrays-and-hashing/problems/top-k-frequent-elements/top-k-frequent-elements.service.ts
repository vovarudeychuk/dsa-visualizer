import { Injectable } from '@angular/core';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { ArrayElement } from '../../../../../services/visualization/types/visualization.types';

@Injectable({
  providedIn: 'root'
})
export class TopKFrequentService {
  private animationSpeed = 1000;

  constructor(private visualizationService: ArrayVisualizationService) {}

  async findTopKFrequent(
    data: ArrayElement[],
    k: number,
    onStepUpdate: (step: string) => void,
    onMapUpdate: (map: Map<number, number>) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<void> {
    const freqMap = new Map<number, number>();
    
    // Count frequencies
    for (let i = 0; i < data.length; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }

      await this.visualizationService.markChecking(i);
      const num = data[i].value;
      const count = freqMap.get(num) || 0;
      freqMap.set(num, count + 1);
      onMapUpdate(freqMap);
      onStepUpdate(`Counting frequency of ${num}: ${count + 1}`);
      await this.visualizationService.delay(this.animationSpeed);
      await this.visualizationService.clearChecking(i);
    }

    // Sort by frequency
    const sortedEntries = [...freqMap.entries()]
      .sort((a, b) => b[1] - a[1]);
    
    onStepUpdate('Sorted elements by frequency');
    await this.visualizationService.delay(this.animationSpeed);

    // Mark top K elements
    const topK = sortedEntries.slice(0, k);
    for (let i = 0; i < data.length; i++) {
      if (topK.some(([num]) => num === data[i].value)) {
        data[i].isDuplicate = true;
      }
    }
    this.visualizationService.setData([...data]);
    
    onStepUpdate(`Found top ${k} frequent elements: ${topK.map(([num]) => num).join(', ')}`);
  }

  parseInput(input: string): ArrayElement[] {
    return input.split(',').map(n => ({
      value: parseInt(n.trim()),
      isDuplicate: false,
      isChecking: false
    }));
  }
} 