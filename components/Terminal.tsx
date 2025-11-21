import React, { useEffect, useRef } from 'react';

interface TerminalProps {
  text: string;
}

export const Terminal: React.FC<TerminalProps> = ({ text }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [text]);

  return (
    <div className="flex-1 bg-black/80 p-4 font-mono text-green-500 overflow-y-auto text-sm md:text-base leading-relaxed shadow-[inset_0_0_20px_rgba(0,255,0,0.1)] relative border border-green-900/50 rounded h-full">
      <div className="whitespace-pre-wrap break-all">
        {text}
        <span className="inline-block w-2 h-5 bg-green-500 animate-pulse ml-1 align-middle"></span>
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
