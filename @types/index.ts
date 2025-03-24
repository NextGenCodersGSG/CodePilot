export interface IBug {
    correction: string;
    error: string;
    severity: string;
  }
  
export interface IPerformance {
    issue: string;
    severity: string;
    solution: string;
  }
  
export interface ISecurity {
    fix: string;
    severity: string;
    vulnerability: string;
  }

export interface IAnalysis {
  performance_issues?: IPerformance[];
  security_issues?: ISecurity[];
  bugs?: IBug[];
  description?: string;
  overall_suggestions?: string[];
}