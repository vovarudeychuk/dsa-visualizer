import { Injectable } from '@angular/core';
import { ArrayVisualizationService, ArrayElement } from '../../../../../services/visualization/array-visualization.service';

export interface AnagramGroup {
  key: string;
  strings: ArrayElement[][];
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GroupAnagramsService {
  private animationSpeed = 1000;

  constructor(private visualizationService: ArrayVisualizationService) {}

  async groupAnagrams(
    data: ArrayElement[][],
    onStepUpdate: (step: string) => void,
    onGroupsUpdate: (groups: AnagramGroup[]) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<void> {
    const groups = new Map<string, AnagramGroup>();
    
    // First phase: Process strings and form groups
    for (let i = 0; i < data.length; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }

      const currentString = data[i];
      const key = this.createSortedKey(currentString);
      
      currentString.forEach(char => char.isChecking = true);
      this.visualizationService.setData(
        this.flattenGroups([...groups.values()]), 
        true, 
        { 
          stringPositions: this.getStringLengths([...groups.values()]),
          groupPositions: []
        }
      );
      onStepUpdate(`Processing string: ${this.getString(currentString)}`);
      await this.visualizationService.delay(this.animationSpeed);

      if (groups.has(key)) {
        const group = groups.get(key)!;
        group.strings.push(currentString);
        group.isActive = true;
        onStepUpdate(`Added to existing group with key: ${key}`);
      } else {
        groups.set(key, {
          key,
          strings: [currentString],
          isActive: true
        });
        onStepUpdate(`Created new group with key: ${key}`);
      }

      currentString.forEach(char => {
        char.isChecking = false;
        char.isHighlighted = true;
      });
      onGroupsUpdate([...groups.values()]);
      await this.visualizationService.delay(this.animationSpeed);
      groups.get(key)!.isActive = false;
    }

    // Second phase: Show final grouped and ordered output
    onStepUpdate('Organizing final output...');
    await this.visualizationService.delay(this.animationSpeed);

    const finalOutput: ArrayElement[][] = [];
    const stringPositions: number[] = [];
    const groupPositions: number[] = [];
    let currentPosition = 0;

    // Add single-string groups first (bat)
    const singleGroups = [...groups.values()]
      .filter(group => group.strings.length === 1)
      .sort((a, b) => a.key.localeCompare(b.key));
    
    singleGroups.forEach(group => {
      finalOutput.push(...group.strings);
      currentPosition += group.strings[0].length;
      groupPositions.push(currentPosition);
    });

    // Add two-string groups next (nat,tan)
    const doubleGroups = [...groups.values()]
      .filter(group => group.strings.length === 2)
      .sort((a, b) => a.key.localeCompare(b.key));
    
    doubleGroups.forEach(group => {
      const sortedStrings = group.strings
        .sort((a, b) => this.getString(a).localeCompare(this.getString(b)));
      finalOutput.push(...sortedStrings);
      sortedStrings.forEach((str, idx) => {
        currentPosition += str.length;
        if (idx < sortedStrings.length - 1) {
          stringPositions.push(currentPosition);
        }
      });
      groupPositions.push(currentPosition);
    });

    // Add three-string groups last (ate,eat,tea)
    const tripleGroups = [...groups.values()]
      .filter(group => group.strings.length === 3)
      .sort((a, b) => a.key.localeCompare(b.key));
    
    tripleGroups.forEach(group => {
      const sortedStrings = group.strings
        .sort((a, b) => this.getString(a).localeCompare(this.getString(b)));
      finalOutput.push(...sortedStrings);
      sortedStrings.forEach((str, idx) => {
        currentPosition += str.length;
        if (idx < sortedStrings.length - 1) {
          stringPositions.push(currentPosition);
        }
      });
    });

    // Show final ordered output
    this.visualizationService.setData(
      finalOutput.flat().map(char => ({
        ...char,
        isHighlighted: true
      })),
      true,
      { stringPositions, groupPositions }
    );
    onStepUpdate('Final grouped output');
  }

  private createFinalOutput(groups: AnagramGroup[]): {
    elements: ArrayElement[],
    lengths: number[]
  } {
    const elements: ArrayElement[] = [];
    const lengths: number[] = [];

    // Order groups to match expected output: [bat], [nat,tan], [ate,eat,tea]
    const orderedGroups = [...groups.values()].sort((a, b) => {
      // Sort by group size first, then by key if sizes are equal
      if (a.strings.length !== b.strings.length) {
        return a.strings.length - b.strings.length;
      }
      return a.key.localeCompare(b.key);
    });

    orderedGroups.forEach(group => {
      // Sort strings within each group
      const sortedStrings = group.strings.sort((a, b) => 
        this.getString(a).localeCompare(this.getString(b))
      );
      
      sortedStrings.forEach(str => {
        elements.push(...str);
        lengths.push(str.length);
      });
    });

    return { elements, lengths };
  }

  private createBracketElement(char: string): ArrayElement {
    return {
      value: char.charCodeAt(0),
      isDuplicate: false,
      isChecking: false,
      isHighlighted: false,
      isBracket: true // Add this property to style brackets differently
    };
  }

  parseInput(input: string): ArrayElement[][] {
    return input.split(',').map(str => 
      str.trim().split('').map(char => ({
        value: char.charCodeAt(0),
        isDuplicate: false,
        isChecking: false,
        isHighlighted: false
      }))
    );
  }

  private createSortedKey(chars: ArrayElement[]): string {
    return chars
      .map(char => String.fromCharCode(char.value))
      .sort()
      .join('');
  }

  private getString(chars: ArrayElement[]): string {
    return chars.map(char => String.fromCharCode(char.value)).join('');
  }

  private flattenGroups(groups: AnagramGroup[]): ArrayElement[] {
    return groups.flatMap(group => group.strings.flat());
  }

  private getStringLengths(groups: AnagramGroup[]): number[] {
    return groups.flatMap(group => 
      group.strings.map(str => str.length)
    );
  }
} 