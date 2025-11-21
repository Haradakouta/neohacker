import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface LogPanelProps {
  logs: LogEntry[];
}

export const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="border border-green-800 bg-black/50 rounded h-48 md:h-auto md:flex-1 flex flex-col overflow-hidden">
      <div className="bg-green-900/20 p-2 border-b border-green-800">
        <h3 className="text-xs font-bold text-green-500">SYSTEM_LOGS</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2">
            <span className="text-green-700 shrink-0">[{log.timestamp}]</span>
            <span className={`${
              log.type === 'error' ? 'text-red-500' : 
              log.type === 'success' ? 'text-white font-bold' : 
              log.type === 'warning' ? 'text-yellow-500' : 'text-green-400'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
