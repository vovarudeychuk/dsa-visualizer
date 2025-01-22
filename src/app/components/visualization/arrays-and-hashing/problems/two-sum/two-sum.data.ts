import { ProblemData } from '../../../../shared/problem/problem.interface';

export const TWO_SUM_DATA: ProblemData = {
  title: 'Two Sum',
  inputs: [
    {
      label: 'Enter array (comma-separated)',
      value: '2,7,11,15',
      key: 'array'
    },
    {
      label: 'Target sum',
      value: '9',
      key: 'target'
    }
  ],
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1] (Because nums[0] + nums[1] == 9)'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2] (Because nums[1] + nums[2] == 6)'
    }
  ],
  solutionCode: `const twoSum = (nums, target) => {
    const map = new Map()
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (map.has(complement)) {
            return [map.get(complement), i]
        }
        map.set(nums[i], i)
    }
    
    return [] // No solution found
}`,
  timeComplexity: 'O(n) - We only need to traverse the array once',
  spaceComplexity: 'O(n) - We store at most n elements in the hash map',
  explanationSteps: [
    'Create an empty hash map to store numbers and their indices',
    'Iterate through each number in the array',
    'Calculate the complement (target - current number)',
    'If complement exists in hash map, we found a solution',
    'If not, add current number and its index to hash map',
    'Continue until solution is found or array is exhausted'
  ]
}; 