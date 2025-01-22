import { ProblemData } from '../../../../shared/problem/problem.interface';

export const GROUP_ANAGRAMS_DATA: ProblemData = {
  title: 'Group Anagrams',
  inputs: [
    {
      label: 'Enter strings (comma-separated)',
      value: 'eat,tea,tan,ate,nat,bat',
      key: 'array'
    }
  ],
  description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
  examples: [
    {
      input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
      output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
    },
    {
      input: 'strs = [""]',
      output: '[[""]]'
    },
    {
      input: 'strs = ["a"]',
      output: '[["a"]]'
    }
  ],
  solutionCode: `const groupAnagrams = (strs) => {
    const map = new Map()
    
    for (const str of strs) {
        // Create sorted key for the string
        const key = str.split('').sort().join('')
        
        // Add string to its group
        if (!map.has(key)) {
            map.set(key, [])
        }
        map.get(key).push(str)
    }
    
    // Return all groups
    return Array.from(map.values())
}`,
  timeComplexity: 'O(n * k * log k) where n is number of strings and k is max string length',
  spaceComplexity: 'O(n * k) to store all strings in groups',
  explanationSteps: [
    'Create a hash map to store anagram groups',
    'For each string, create a sorted key',
    'Group strings with the same sorted key together',
    'Add each string to its corresponding group',
    'Return all groups as the result'
  ]
}; 