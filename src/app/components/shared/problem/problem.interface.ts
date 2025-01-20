export interface ProblemData {
  title: string;
  inputLabel: string;
  description: string;
  examples: Example[];
  solutionCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanationSteps: string[];
}

export interface Example {
  input: string;
  output: string;
} 