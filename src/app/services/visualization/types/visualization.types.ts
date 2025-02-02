export interface ArrayElement {
    value: number;
    isDuplicate?: boolean;
    isChecking?: boolean;
    isHighlighted?: boolean;
    isBracket?: boolean;
    isSeparator?: boolean;
    noBackground?: boolean;
    separators?: VisualizationSeparators;
  }
  
  export interface VisualizationSeparators {
    stringPositions: number[];
    groupPositions: number[];
  }
  
  export interface VisualizationOptions {
    highlightColor?: string;
    checkingColor?: string;
    duplicateColor?: string;
    defaultColor?: string;
    showAsChars?: boolean;
    separators?: VisualizationSeparators;
    height?: string;
  }