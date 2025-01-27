import { ProblemData } from '../../../../shared/problem/problem.interface';

export const ENCODE_DECODE_STRINGS_DATA: ProblemData = {
  title: 'Encode and Decode Strings',
  inputs: [
    {
      label: 'Enter strings (comma-separated)',
      value: 'Hello,World,How,Are,You',
      key: 'strings'
    }
  ],
  description: `Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Please implement encode and decode methods. The string may contain any possible characters out of 256 valid ASCII characters.`,
  examples: [
    {
      input: 'strs = ["Hello","World"]',
      output: 'encoded = "5#Hello5#World" -> decoded = ["Hello","World"]'
    },
    {
      input: 'strs = [""]',
      output: 'encoded = "0#" -> decoded = [""]'
    },
    {
      input: 'strs = ["Hello","World","How","Are","You"]',
      output: 'encoded = "5#Hello5#World3#How3#Are3#You" -> decoded = ["Hello","World","How","Are","You"]'
    }
  ],
  solutionCode: `class Codec {
    encode(strs: string[]): string {
        return strs.map(str => \`\${str.length}#\${str}\`).join('');
    }
    
    decode(s: string): string[] {
        const result: string[] = [];
        let i = 0;
        
        while (i < s.length) {
            // Find the '#' delimiter
            const delimiterIndex = s.indexOf('#', i);
            // Get the length of the next string
            const length = parseInt(s.substring(i, delimiterIndex));
            // Extract the string using the length
            const str = s.substring(delimiterIndex + 1, delimiterIndex + 1 + length);
            result.push(str);
            // Move pointer to start of next length
            i = delimiterIndex + 1 + length;
        }
        
        return result;
    }
}`,
  timeComplexity: 'O(n) for both encode and decode, where n is total length of all strings',
  spaceComplexity: 'O(n) to store the encoded/decoded strings',
  explanationSteps: [
    'Encoding process:',
    '- For each string, prepend its length followed by "#"',
    '- Join all encoded strings together',
    'Decoding process:',
    '- Parse the length before each "#"',
    '- Extract the string using the length',
    '- Repeat until all strings are decoded'
  ]
}; 