import { Injectable } from '@angular/core';
import { ArrayVisualizationService, ArrayElement } from '../../../../../services/visualization/array-visualization.service';

@Injectable({
  providedIn: 'root'
})
export class ContainsDuplicateService {
  private animationSpeed = 1000;

  constructor(private visualizationService: ArrayVisualizationService) {}

  async findDuplicates(
    data: ArrayElement[],
    onStepUpdate: (step: string) => void,
    onSeenUpdate: (seen: number[]) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<void> {
    const seen = new Set();
    const seenNumbers: number[] = [];
    
    for (let i = 0; i < data.length; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }

      await this.visualizationService.markChecking(i);
      onStepUpdate(`Checking number ${data[i].value}`);
      await this.visualizationService.delay(this.animationSpeed);

      if (seen.has(data[i].value)) {
        await this.visualizationService.markDuplicate(i);
        const firstIndex = data.findIndex(el => el.value === data[i].value);
        await this.visualizationService.markDuplicate(firstIndex);
        onStepUpdate(`Found duplicate! Number ${data[i].value} appears twice`);
        return;
      }

      seen.add(data[i].value);
      seenNumbers.push(data[i].value);
      onSeenUpdate(seenNumbers);
      onStepUpdate(`Added ${data[i].value} to seen numbers`);
      await this.visualizationService.clearChecking(i);
    }
    
    onStepUpdate('No duplicates found in the array');
  }

  parseInput(input: string): ArrayElement[] {
    return input.split(',').map(n => ({
      value: parseInt(n.trim()),
      isDuplicate: false,
      isChecking: false
    }));
  }
}
