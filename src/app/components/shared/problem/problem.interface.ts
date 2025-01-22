export interface ProblemData {
  title: string;
  inputs: ProblemInput[];
  description: string;
  examples: Example[];
  solutionCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanationSteps: string[];
}

export interface ProblemInput {
  label: string;
  value: string;
  key: string;
}

export interface Example {
  input: string;
  output: string;
} 