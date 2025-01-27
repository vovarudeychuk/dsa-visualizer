import { Injectable } from '@angular/core';
import { ArrayVisualizationService, ArrayElement, VisualizationSeparators } from '../../../../../services/visualization/array-visualization.service';

@Injectable({
  providedIn: 'root'
})
export class EncodeAndDecodeStringsService {
  private animationSpeed = 1000;

  constructor(private visualizationService: ArrayVisualizationService) {}

  async encode(
    strings: string[],
    onStepUpdate: (step: string) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<ArrayElement[]> {
    let result: ArrayElement[] = [];
    let separators: VisualizationSeparators = {
      stringPositions: [],
      groupPositions: []
    };

    onStepUpdate('Starting encoding process...');
    await this.visualizationService.delay(this.animationSpeed);

    let currentPosition = 0;
    for (let i = 0; i < strings.length; i++) {
      if (isPaused()) await onWaitForResume();

      const currentString = strings[i];
      onStepUpdate(`Processing string ${i + 1}: "${currentString}"`);
      await this.visualizationService.delay(this.animationSpeed/2);

      // Add string elements one by one
      const stringElements = this.parseInput(currentString);
      for (let j = 0; j < stringElements.length; j++) {
        if (isPaused()) await onWaitForResume();
        
        // Add element and mark it as checking
        stringElements[j].isChecking = true;
        result.push(stringElements[j]);
        
        onStepUpdate(`Adding character '${String.fromCharCode(stringElements[j].value)}' to encoded string`);
        this.visualizationService.setData(result, true, separators);
        await this.visualizationService.delay(this.animationSpeed/2);
        
        // Mark as processed
        stringElements[j].isChecking = false;
        stringElements[j].isHighlighted = true;
      }

      currentPosition += stringElements.length;

      // Add separator if not the last string
      if (i < strings.length - 1) {
        separators.groupPositions.push(currentPosition);
        onStepUpdate(`Adding separator after "${currentString}"`);
        this.visualizationService.setData(result, true, separators);
        await this.visualizationService.delay(this.animationSpeed/2);
      }
    }

    // Store separator positions in each element
    result.forEach(el => {
      el.separators = separators;
    });

    onStepUpdate('Encoding complete! Ready for decoding.');
    await this.visualizationService.delay(this.animationSpeed);
    return result;
  }

  async decode(
    encoded: ArrayElement[],
    onStepUpdate: (step: string) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<string[]> {
    const result: string[] = [];
    const separatorPositions = encoded[0]?.separators?.groupPositions || [];
    
    onStepUpdate('Starting decoding process...');
    await this.visualizationService.delay(this.animationSpeed);

    let startIdx = 0;
    const positions = [...separatorPositions, encoded.length];

    for (let i = 0; i < positions.length; i++) {
      if (isPaused()) await onWaitForResume();

      const endIdx = positions[i];
      let currentString = '';
      
      onStepUpdate(`Decoding string ${i + 1}...`);
      await this.visualizationService.delay(this.animationSpeed/2);

      // Process characters one by one
      for (let j = startIdx; j < endIdx; j++) {
        if (isPaused()) await onWaitForResume();
        
        // Mark current character as being processed
        encoded[j].isChecking = true;
        this.visualizationService.setData(
          encoded,
          true,
          { stringPositions: [], groupPositions: separatorPositions }
        );
        
        const char = String.fromCharCode(encoded[j].value);
        currentString += char;
        
        onStepUpdate(`Reading character '${char}'`);
        await this.visualizationService.delay(this.animationSpeed/3);
        
        // Mark as processed
        encoded[j].isChecking = false;
        encoded[j].isHighlighted = true;
      }

      result.push(currentString);
      onStepUpdate(`Decoded string ${i + 1}: "${currentString}"`);
      
      this.visualizationService.setData(
        encoded,
        true,
        { stringPositions: [], groupPositions: separatorPositions }
      );
      
      await this.visualizationService.delay(this.animationSpeed);
      startIdx = endIdx;
    }

    onStepUpdate(`Decoding complete! Found ${result.length} strings: ${result.map(s => `"${s}"`).join(', ')}`);
    return result;
  }

  parseInput(input: string): ArrayElement[] {
    return input.split('').map(char => ({
      value: char.charCodeAt(0),
      isDuplicate: false,
      isChecking: false,
      isHighlighted: false,
      isBracket: false,
      separators: {
        stringPositions: [],
        groupPositions: []
      }
    }));
  }
}