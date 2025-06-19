import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TerminalHistoryItem } from '../../types/terminal';

interface TerminalOutputProps {
  history: TerminalHistoryItem[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ history }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const formatOutput = (output: string | string[]) => {
    if (Array.isArray(output)) {
      return output.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line}
        </div>
      ));
    }
    return <div className="whitespace-pre-wrap">{output}</div>;
  };

  return (
    <div ref={outputRef} className="space-y-2">
      {history.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-1"
        >
          {/* Command input */}
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400">➜</span>
            <span className="text-blue-400">~{item.directory}</span>
            <span className="text-white">{item.command}</span>
          </div>
          
          {/* Command output */}
          {item.output && (
            <div className={`ml-4 ${item.error ? 'text-red-400' : 'text-gray-300'}`}>
              {formatOutput(item.output)}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TerminalOutput;