import { ProblemData } from '../../../../shared/problem/problem.interface';

export const CONTAINS_DUPLICATE_DATA: ProblemData = {
  title: 'Contains Duplicate',
  inputs: [
    {
      label: 'Enter array (comma-separated)',
      value: '1,2,3,1',
      key: 'array'
    }
  ],
  description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
  examples: [
    {
      input: 'nums = [1,2,3,1]',
      output: 'true'
    },
    {
      input: 'nums = [1,2,3,4]',
      output: 'false'
    }
  ],
  solutionCode: `const containsDuplicate = (nums) => {
    const seen = new Set()

    for (const num of nums) {
        if (seen.has(num)) {
            return true  // Found a duplicate
        }
        seen.add(num)   // Add number to set
    }

    return false  // No duplicates found
}`,
  timeComplexity: 'O(n) - We only need to traverse the array once',
  spaceComplexity: 'O(n) - In the worst case, we might need to store all elements in the set',
  explanationSteps: [
    'Create an empty HashSet to store numbers we\'ve seen',
    'Iterate through each number in the array',
    'For each number, check if we\'ve seen it before (is it in the set?)',
    'If we have seen it, we found a duplicate - return true',
    'If we haven\'t seen it, add it to our set',
    'If we complete the loop without finding duplicates, return false'
  ]
}; 