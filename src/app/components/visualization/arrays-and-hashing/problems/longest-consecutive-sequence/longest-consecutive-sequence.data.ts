import { ProblemData } from '../../../../shared/problem/problem.interface';

export const LONGEST_CONSECUTIVE_DATA: ProblemData = {
  title: 'Longest Consecutive Sequence',
  inputs: [
    {
      label: 'Enter numbers (comma-separated)',
      value: '100,4,200,1,3,2',
      key: 'numbers'
    }
  ],
  description: `Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.`,
  examples: [
    {
      input: 'nums = [100,4,200,1,3,2]',
      output: '4 (The longest consecutive sequence is [1,2,3,4])'
    },
    {
      input: 'nums = [0,3,7,2,5,8,4,6,0,1]',
      output: '9 (The longest consecutive sequence is [0,1,2,3,4,5,6,7,8])'
    }
  ],
  solutionCode: `function longestConsecutive(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const numSet = new Set(nums);
    let longest = 0;
    
    for (const num of numSet) {
        // Only start checking sequences from the smallest number
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            
            // Count consecutive numbers
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }
            
            longest = Math.max(longest, currentStreak);
        }
    }
    
    return longest;
}`,
  timeComplexity: 'O(n) - We only visit each number once',
  spaceComplexity: 'O(n) - To store the hash set',
  explanationSteps: [
    'Create a hash set with all numbers for O(1) lookups',
    'For each number, check if it\'s the start of a sequence',
    'If it is (no number exists before it), count consecutive numbers',
    'Keep track of the longest sequence found',
    'Return the length of the longest sequence'
  ]
}; 