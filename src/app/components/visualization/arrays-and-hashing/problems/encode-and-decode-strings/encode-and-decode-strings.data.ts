import { ProblemData } from '../../../../shared/problem/problem.interface';

export const ENCODE_AND_DECODE_STRINGS_DATA: ProblemData = {
  title: 'Encode and Decode Strings',
  inputs: [
    {
      label: 'Strings (comma-separated)',
      value: 'Hello,World,LeetCode',
      key: 'strings'
    }
  ],
  description: 'Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.',
  examples: [
    {
      input: '["Hello","World"]',
      output: '["Hello","World"]',
    }
  ],
  solutionCode: `class Codec {
    encode(strs: string[]): string {
        return strs.map(str => \`\${str.length}#\${str}\`).join('');
    }
    
    decode(s: string): string[] {
        const result = [];
        let i = 0;
        
        while (i < s.length) {
            const j = s.indexOf('#', i);
            const len = Number(s.slice(i, j));
            result.push(s.slice(j + 1, j + 1 + len));
            i = j + 1 + len;
        }
        
        return result;
    }
}`,
  timeComplexity: 'O(n) where n is the total length of all strings',
  spaceComplexity: 'O(n) to store the encoded/decoded strings',
  explanationSteps: [
    'For encoding:',
    '1. For each string, add its length followed by a delimiter',
    '2. Append the actual string',
    '3. Continue for all strings',
    '',
    'For decoding:',
    '1. Read until delimiter to get string length',
    '2. Extract the string using the length',
    '3. Repeat until all strings are decoded'
  ]
};
