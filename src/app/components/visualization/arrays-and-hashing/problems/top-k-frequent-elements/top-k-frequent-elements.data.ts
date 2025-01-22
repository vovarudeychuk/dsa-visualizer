import { ProblemData } from '../../../../shared/problem/problem.interface';

export const TOP_K_FREQUENT_DATA: ProblemData = {
  title: 'Top K Frequent Elements',
  inputs: [
    {
      label: 'Enter array (comma-separated)',
      value: '1,1,1,2,2,3',
      key: 'array'
    },
    {
      label: 'K',
      value: '2',
      key: 'k'
    }
  ],
  description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
  examples: [
    {
      input: 'nums = [1,1,1,2,2,3], k = 2',
      output: '[1,2] (1 and 2 are the two most frequent elements)'
    },
    {
      input: 'nums = [1], k = 1',
      output: '[1]'
    }
  ],
  solutionCode: `const topKFrequent = (nums, k) => {
    const freqMap = new Map();
    
    // Count frequencies
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Sort by frequency
    return [...freqMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(entry => entry[0]);
}`,
  timeComplexity: 'O(n log n) - Due to sorting operation',
  spaceComplexity: 'O(n) - We store each unique number in the hash map',
  explanationSteps: [
    'Create a hash map to store number frequencies',
    'Count frequency of each number',
    'Convert map entries to array and sort by frequency',
    'Take the first k elements',
    'Return the numbers (without their frequencies)'
  ]
}; 