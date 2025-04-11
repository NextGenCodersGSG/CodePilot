import React from 'react'

interface Props {
    index: number;
    issue: string;
    severity:string;
    solution: string;
    category: string;
}

const AnalysisItem = ({index,issue,severity,solution,category}:Props) => {
  return (
  <div
    key={`cat-${category}-${index}`}
    className="group relative p-4 rounded-2xl bg-gradient-to-br mb-3 from-gray-800/30 to-gray-900/50 hover:bg-gray-800/40 transition-all duration-300 last:mb-0"
  >
    <div
      className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl rounded-tr-xl text-xs font-mono ${severity == "low"? "bg-green-600/40" : severity == "medium" ? "bg-yellow-600/40" : "bg-red-600/40"}`}
    >
      {severity}
    </div>
    <div className="pr-12">
      <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        {issue}
      </h3>
      <div className="pl-3 border-l-2 border-gray-600/50 group-hover:border-purple-400/50 transition-colors">
        <p className="text-gray-300 font-mono">
          {solution}
        </p>
      </div>
    </div>
    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-30 transition-opacity" />
  </div>
  )
}

export default AnalysisItem
