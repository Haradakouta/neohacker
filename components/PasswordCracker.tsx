import React, { useEffect, useState } from 'react';

export const PasswordCracker: React.FC = () => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [target, setTarget] = useState("ADMIN_R00T");
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let interval: ReturnType<typeof setInterval>;

    if (!found) {
        interval = setInterval(() => {
        const randomStr = Array(8).fill(0).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        setAttempts(prev => [randomStr, ...prev.slice(0, 6)]);
        
        setProgress(prev => {
            if (prev >= 100) {
                setFound(true);
                return 100;
            }
            return prev + Math.random() * 2;
        });
        }, 80);
    } else {
        // Reset after a delay
        const timeout = setTimeout(() => {
            setFound(false);
            setProgress(0);
            setTarget(prev => prev === "ADMIN_R00T" ? "SYSTEM_KEY" : "ADMIN_R00T");
        }, 3000);
        return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [found]);

  return (
    <div className="border border-green-800 bg-black/50 p-4 rounded text-xs font-mono">
      <h3 className="text-green-600 mb-2 border-b border-green-900 pb-1">BRUTE_FORCE.EXE</h3>
      <div className="flex justify-between mb-2">
        <span>TARGET:</span>
        <span className="text-red-500 font-bold">{found ? target : "********"}</span>
      </div>
      
      <div className="space-y-1 mb-3 h-32 overflow-hidden">
        {attempts.map((attempt, i) => (
          <div key={i} className={`flex justify-between ${i === 0 ? 'text-white bg-green-900/30' : 'text-green-700'}`}>
            <span>{`>> TRYING:`}</span>
            <span>{attempt}</span>
          </div>
        ))}
      </div>

      <div className="w-full bg-green-900/30 h-2 mt-2">
        <div 
            className={`h-full ${found ? 'bg-green-400' : 'bg-green-600'}`} 
            style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right mt-1 text-green-400">{progress.toFixed(1)}%</div>
      {found && <div className="text-center text-white bg-green-600 mt-2 animate-pulse">MATCH FOUND</div>}
    </div>
  );
};