import { ProblemData } from '../../../../shared/problem/problem.interface';

export const PRODUCT_EXCEPT_SELF_DATA: ProblemData = {
  title: 'Product of Array Except Self',
  inputs: [
    {
      label: 'Enter array (comma-separated)',
      value: '1,2,3,4',
      key: 'array'
    }
  ],
  description: 'Given an array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The algorithm must run in O(n) time and without using the division operation.',
  examples: [
    {
      input: 'nums = [1,2,3,4]',
      output: '[24,12,8,6]'
    },
    {
      input: 'nums = [-1,1,0,-3,3]',
      output: '[0,0,9,0,0]'
    }
  ],
  solutionCode: `function productExceptSelf(nums) {
    const n = nums.length;
    const answer = new Array(n);
    
    // Calculate prefix products
    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }
    
    // Calculate suffix products and combine
    let suffixProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] = answer[i] * suffixProduct;
        suffixProduct *= nums[i];
    }
    
    return answer;
}`,
  timeComplexity: 'O(n) - We only need two passes through the array',
  spaceComplexity: 'O(1) - Only using the output array, no extra space',
  explanationSteps: [
    'Initialize the answer array with prefix products',
    'For each position, calculate product of all numbers to its left',
    'Traverse backwards to calculate suffix products',
    'Multiply each prefix product by its corresponding suffix product'
  ]
}; 