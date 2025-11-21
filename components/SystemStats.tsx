import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  cpu: number;
  ram: number;
}

export const SystemStats: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Initialize data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      name: i.toString(),
      cpu: 30 + Math.random() * 10,
      ram: 40 + Math.random() * 10,
    }));
    setData(initialData);

    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        // Random spike logic
        const isSpike = Math.random() > 0.9;
        const nextCpu = isSpike 
          ? Math.min(100, last.cpu + 40) 
          : Math.max(10, Math.min(100, last.cpu + (Math.random() - 0.5) * 20));
          
        const nextRam = Math.max(20, Math.min(95, last.ram + (Math.random() - 0.5) * 10));

        newData.push({
          name: Date.now().toString(),
          cpu: nextCpu,
          ram: nextRam,
        });
        return newData;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="border border-green-800 bg-black/50 p-2 rounded">
        <h3 className="text-xs uppercase tracking-widest text-green-600 mb-2">CPU Load (Core 0-64)</h3>
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis domain={[0, 100]} hide />
              <Area type="monotone" dataKey="cpu" stroke="#22c55e" fillOpacity={1} fill="url(#colorCpu)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-xs text-green-400 mt-1 font-bold">
          <span>USAGE: {data.length > 0 ? data[data.length-1].cpu.toFixed(1) : 0}%</span>
          <span>TEMP: 89°C</span>
        </div>
      </div>

      <div className="border border-green-800 bg-black/50 p-2 rounded">
        <h3 className="text-xs uppercase tracking-widest text-green-600 mb-2">Memory Alloc (TB)</h3>
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis domain={[0, 100]} hide />
              <Area type="monotone" dataKey="ram" stroke="#16a34a" fillOpacity={1} fill="url(#colorRam)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
         <div className="flex justify-between text-xs text-green-400 mt-1 font-bold">
          <span>ALLOC: {data.length > 0 ? data[data.length-1].ram.toFixed(1) : 0}%</span>
          <span>SWAP: 12%</span>
        </div>
      </div>
    </div>
  );
};
