import { Injectable } from '@angular/core';

export interface StringElement {
  value: string;
  isEncoded: boolean;
  isChecking: boolean;
  encodedValue?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EncodeDecodeStringsService {
  private animationSpeed = 1000;

  async encodeStrings(
    strings: StringElement[],
    onStepUpdate: (step: string) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<string> {
    let encoded = '';
    
    for (let i = 0; i < strings.length; i++) {
      if (isPaused()) {
        await onWaitForResume();
      }

      const str = strings[i];
      str.isChecking = true;
      
      const encodedPart = `${str.value.length}#${str.value}`;
      str.encodedValue = encodedPart;
      str.isEncoded = true;
      
      encoded += encodedPart;
      
      onStepUpdate(`Encoding "${str.value}" as "${encodedPart}"`);
      await this.delay(this.animationSpeed);
      
      str.isChecking = false;
    }

    onStepUpdate(`Final encoded string: "${encoded}"`);
    return encoded;
  }

  async decodeString(
    encodedString: string,
    onStepUpdate: (step: string) => void,
    isPaused: () => boolean,
    onWaitForResume: () => Promise<void>
  ): Promise<StringElement[]> {
    const result: StringElement[] = [];
    let i = 0;
    
    while (i < encodedString.length) {
      if (isPaused()) {
        await onWaitForResume();
      }

      const delimiterIndex = encodedString.indexOf('#', i);
      const length = parseInt(encodedString.substring(i, delimiterIndex));
      const str = encodedString.substring(delimiterIndex + 1, delimiterIndex + 1 + length);
      
      const element: StringElement = {
        value: str,
        isEncoded: false,
        isChecking: true
      };
      result.push(element);
      
      onStepUpdate(`Decoding: found length ${length}, extracting "${str}"`);
      await this.delay(this.animationSpeed);
      
      element.isChecking = false;
      i = delimiterIndex + 1 + length;
    }

    onStepUpdate('Decoding completed');
    return result;
  }

  parseInput(input: string): StringElement[] {
    return input.split(',').map(str => ({
      value: str,
      isEncoded: false,
      isChecking: false
    }));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 