import { Injectable } from '@angular/core';
import { ArrayVisualizationService, ArrayElement } from '../../../../../services/visualization/array-visualization.service';

@Injectable({
  providedIn: 'root'
})
export class LongestConsecutiveService {
  private animationSpeed = 1000;

  constructor(private visualizationService: ArrayVisualizationService) {}

  async findLongestSequence(
    data: ArrayElement[],
    onStepUpdate: (step: string) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<number> {
    if (data.length === 0) return 0;

    const numSet = new Set(data.map(n => n.value));
    let longest = 0;
    let longestStart = 0;
    let longestEnd = 0;

    for (let i = 0; i < data.length; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }

      await this.visualizationService.markChecking(i);
      const num = data[i].value;

      // Only check sequences starting from the smallest number
      if (!numSet.has(num - 1)) {
        onStepUpdate(`Found potential sequence start: ${num}`);
        await this.visualizationService.delay(this.animationSpeed);

        let currentNum = num;
        let currentStreak = 1;
        data[i].isDuplicate = true;
        this.visualizationService.setData([...data]);

        // Count consecutive numbers
        while (numSet.has(currentNum + 1)) {
          if (isPaused()) {
            await onWaitForResume();
          }

          currentNum++;
          currentStreak++;

          // Mark current number in sequence
          const currentIndex = data.findIndex(n => n.value === currentNum);
          if (currentIndex !== -1) {
            data[currentIndex].isDuplicate = true;
            this.visualizationService.setData([...data]);
          }

          onStepUpdate(`Found consecutive number: ${currentNum}, current streak: ${currentStreak}`);
          await this.visualizationService.delay(this.animationSpeed);
        }

        // Update longest sequence if current is longer
        if (currentStreak > longest) {
          // Reset previous sequence
          data.forEach(n => n.isDuplicate = false);
          
          // Mark new longest sequence
          for (let val = num; val <= currentNum; val++) {
            const index = data.findIndex(n => n.value === val);
            if (index !== -1) {
              data[index].isDuplicate = true;
            }
          }
          
          longest = currentStreak;
          longestStart = num;
          longestEnd = currentNum;
          
          this.visualizationService.setData([...data]);
          onStepUpdate(`New longest sequence found: ${longestStart} to ${longestEnd} (length: ${longest})`);
        }
      }

      await this.visualizationService.clearChecking(i);
    }

    onStepUpdate(`Final longest sequence: ${longestStart} to ${longestEnd} (length: ${longest})`);
    return longest;
  }

  parseInput(input: string): ArrayElement[] {
    return input.split(',').map(n => ({
      value: parseInt(n.trim()),
      isDuplicate: false,
      isChecking: false
    }));
  }
} 