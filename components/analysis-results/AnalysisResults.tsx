import { motion } from 'framer-motion'
import { Hammer } from 'lucide-react'
import React from 'react'
import AnalysisItem from '../analysis-item/AnalysisItem'
import { Card } from '../ui/card'
import { IAnalysis } from '@/@types'

interface IProps {
    analysis: IAnalysis
}

const AnalysisResults = ({analysis}: IProps) => {
  return (
    <div >
    {(analysis.performance_issues?.length ?? 0) > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
        className="mt-8 space-y-6 text-left max-w-4xl  mx-auto rounded-3xl"
      >
        <h2 className="text-2xl font-bold mb-4">Performance Issues</h2>
        <Card className="bg-background border-0 pt-0 rounded-3xl">
          <ul className="list-disc pl-0">
            {analysis.performance_issues?.map((issue, index) => (
                <AnalysisItem key={index} index={index} issue={issue.issue} severity={issue.severity} solution={issue.solution} category="performance-issues"/>
            ))}
          </ul>
        </Card>
      </motion.div>
    )}
    {(analysis.security_issues?.length ?? 0) > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
        className="mt-8 space-y-6 text-left max-w-4xl mx-auto rounded-3xl"
      >
        <h2 className="text-2xl font-bold mb-4">Security Issues</h2>
        <Card className="bg-background border-0 pt-0 rounded-3xl">
          <ul className="list-disc pl-0 ">
            {analysis.security_issues?.map((issue, index) => (
                <AnalysisItem key={index} index={index} issue={issue.vulnerability} severity={issue.severity} solution={issue.fix} category="security-issues"/>
            ))}
          </ul>
        </Card>
      </motion.div>
    )}
    
    {(analysis.bugs?.length ?? 0) > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeInOut" }}
        className="mt-8 space-y-6 text-left max-w-4xl mx-auto rounded-3xl"
      >
        <h2 className="text-2xl font-bold mb-4">Potential Bugs</h2>
        <Card className="bg-background border-0 pt-0 rounded-3xl">
          {analysis.bugs?.length === 0 ? (
            <p className="text-gray-400">No bugs found 🎉</p>
          ) : (
            <ul className="list-disc pl-0 ">
              {analysis.bugs?.map((issue, index) => (
                <AnalysisItem key={index} index={index} issue={issue.error} severity={issue.severity} solution={issue.correction} category="bugs"/>
              ))}
            </ul>
          )}
        </Card>
      </motion.div>
    )}
    {analysis?.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mt-8 space-y-6 text-left max-w-4xl mx-auto"
              >
                <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 hover:bg-gray-800/40 transition-all duration-300">
                  <div className="pr-12">
                    <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Code Explanation
                    </h3>
                    <div className="pl-3 border-l-2 border-gray-600/50 group-hover:border-purple-400/50 transition-colors">
                      <p className="text-gray-300 font-mono leading-relaxed">
                        {analysis.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-30 transition-opacity" />
                </div>
              </motion.div>
    )}
    {(analysis.overall_suggestions?.length ?? 0) > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeInOut" }}
        className="mt-8 space-y-6 text-left max-w-4xl mx-auto"
      >
        <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 hover:bg-gray-800/40 transition-all duration-300">
          <div className="pr-12">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Suggested Solutions
            </h3>
            <div className="pl-3 border-l-2 border-gray-600/50 group-hover:border-purple-400/50 transition-colors">
              {analysis.overall_suggestions?.length === 0 ? (
                <p className="text-gray-400 font-mono">No suggestions found</p>
              ) : (
                <div className="space-y-3">
                  {analysis.overall_suggestions?.map((issue, index) => (
                    <div
                      key={`suggestion-${index}`}
                      className="text-gray-300 font-mono flex items-center gap-2"
                    >
                      <span className="text-purple-400/80 mt-1"><Hammer /></span>
                      <span className="flex-1">{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-30 transition-opacity" />
        </div>
      </motion.div>
    )}
    </div>
  )
}

export default AnalysisResults
