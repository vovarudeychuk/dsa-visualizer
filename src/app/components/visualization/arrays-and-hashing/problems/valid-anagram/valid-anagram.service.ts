import { Injectable } from '@angular/core';
import { ArrayVisualizationService } from '../../../../../services/visualization/array-visualization.service';
import { ArrayElement } from '../../../../../services/visualization/types/visualization.types';

@Injectable({
  providedIn: 'root'
})
export class ValidAnagramService {
  private animationSpeed = 1000;

  constructor(private visualizationService: ArrayVisualizationService) {}

  async checkAnagram(
    data1: ArrayElement[],
    data2: ArrayElement[],
    onStepUpdate: (step: string) => void,
    onMapUpdate: (map: Map<string, number>) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<void> {
    if (data1.length !== data2.length) {
      onStepUpdate('Strings have different lengths - not anagrams');
      return;
    }

    const charMap = new Map<string, number>();
    
    // First pass: count characters from first string
    for (let i = 0; i < data1.length; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }

      data1[i].isChecking = true;
      this.visualizationService.setDualData([...data1], [...data2]);
      const char = String.fromCharCode(data1[i].value);
      const count = charMap.get(char) || 0;
      charMap.set(char, count + 1);
      onMapUpdate(charMap);
      onStepUpdate(`Adding '${char}' to character count map`);
      await this.visualizationService.delay(this.animationSpeed);
      
      data1[i].isChecking = false;
      data1[i].isHighlighted = true;
      this.visualizationService.setDualData([...data1], [...data2]);
    }

    // Second pass: check characters from second string
    for (let i = 0; i < data2.length; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }
      
      data2[i].isChecking = true;
      this.visualizationService.setDualData([...data1], [...data2]);
      const char = String.fromCharCode(data2[i].value);
      onStepUpdate(`Checking '${char}' in character count map`);
      await this.visualizationService.delay(this.animationSpeed);

      if (!charMap.has(char) || charMap.get(char) === 0) {
        data2[i].isDuplicate = true;
        this.visualizationService.setDualData([...data1], [...data2]);
        onStepUpdate(`Character '${char}' not found in first string - not anagrams`);
        return;
      }

      const count = charMap.get(char)!;
      charMap.set(char, count - 1);
      onMapUpdate(charMap);
      data2[i].isChecking = false;
      data2[i].isHighlighted = true;
      this.visualizationService.setDualData([...data1], [...data2]);
      await this.visualizationService.delay(this.animationSpeed/2);
    }

    onStepUpdate('Strings are anagrams!');
  }

  parseInput(input: string): ArrayElement[] {
    return input.split('').map(char => ({
      value: char.charCodeAt(0),
      isDuplicate: false,
      isChecking: false,
      isHighlighted: false
    }));
  }
} 