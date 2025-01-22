import { ProblemData } from '../../../../shared/problem/problem.interface';

export const VALID_ANAGRAM_DATA: ProblemData = {
  title: 'Valid Anagram',
  inputLabel: 'Enter two strings (comma-separated)',
  description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
  examples: [
    {
      input: 's = "anagram", t = "nagaram"',
      output: 'true'
    },
    {
      input: 's = "rat", t = "car"',
      output: 'false'
    }
  ],
  solutionCode: `const isAnagram = (s, t) => {
    if (s.length !== t.length) return false
    
    const charMap = new Map()
    
    // Count characters in first string
    for (const char of s) {
        charMap.set(char, (charMap.get(char) || 0) + 1)
    }
    
    // Check characters in second string
    for (const char of t) {
        if (!charMap.has(char) || charMap.get(char) === 0) {
            return false
        }
        charMap.set(char, charMap.get(char) - 1)
    }
    
    return true
}`,
  timeComplexity: 'O(n) - We need to traverse both strings once',
  spaceComplexity: 'O(k) - Where k is the size of the character set',
  explanationSteps: [
    'Check if strings have the same length',
    'Create a hash map to store character counts',
    'Count characters in first string',
    'Check and decrement counts for second string',
    'If any character is missing or has wrong count, return false',
    'If all characters match, strings are anagrams'
  ]
}; 