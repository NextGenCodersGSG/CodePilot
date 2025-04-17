import React from 'react'

interface Props {
    index: number;
    issue: string;
    severity: string;
    solution: string;
    category: string;
}

const AnalysisItem = ({index, issue, severity, solution, category}: Props) => {
  return (
    <div
      key={`cat-${category}-${index}`}
      className="group relative p-4 rounded-2xl bg-card mb-3 hover:bg-muted transition-all duration-300 last:mb-0"
    >
      <div
        className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl rounded-tr-xl text-xs ${severity === "low" ? "bg-chart-2 text-card-foreground" : severity === "medium" ? "bg-chart-4 text-card-foreground" : "bg-destructive text-destructive-foreground"}`}
      >
        {severity}
      </div>
      <div className="pr-12">
        <h3 className="text-lg font-semibold mb-2 text-primary">
          {issue}
        </h3>
        <div className="pl-3 border-l-2 border-muted group-hover:border-primary transition-colors">
          <p className="text-muted">
            {solution}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnalysisItem
