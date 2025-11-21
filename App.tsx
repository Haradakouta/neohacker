import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal } from './components/Terminal';
import { SystemStats } from './components/SystemStats';
import { PasswordCracker } from './components/PasswordCracker';
import { LogPanel } from './components/LogPanel';
import { FAKE_CODE, LOG_MESSAGES, ACCESS_DENIED_MSGS, ACCESS_GRANTED_MSGS } from './constants';
import { LogEntry, SystemState } from './types';
import { ShieldAlert, Lock, Unlock, Skull, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [codeIndex, setCodeIndex] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [systemState, setSystemState] = useState<SystemState>(SystemState.IDLE);
  const [showMobileInput, setShowMobileInput] = useState(false);
  
  // Audio refs (simulated)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [...prev.slice(-50), {
      id: Math.random().toString(36).substring(7),
      timestamp: timeString,
      message,
      type
    }]);
  }, []);

  const triggerAccessEffect = (granted: boolean) => {
    setSystemState(granted ? SystemState.ACCESS_GRANTED : SystemState.ACCESS_DENIED);
    addLog(granted ? "SYSTEM ACCESS GRANTED - ROOT PRIVILEGES" : "SYSTEM LOCKDOWN INITIATED", granted ? 'success' : 'error');
    
    // Auto reset after 2 seconds
    setTimeout(() => {
      setSystemState(SystemState.HACKING);
    }, 2000);
  };

  const handleTyping = useCallback(() => {
    // Advance code text
    const chunkSize = 1;
    const nextChunk = FAKE_CODE.substring(codeIndex % FAKE_CODE.length, (codeIndex + chunkSize) % FAKE_CODE.length);
    
    // If we wrap around
    let nextIndex = codeIndex + chunkSize;
    let textToAdd = nextChunk;
    
    if (nextIndex >= FAKE_CODE.length) {
        nextIndex = 0;
        setText(prev => prev + "\n// --- MODULE RELOAD ---\n");
    }

    setText(prev => {
        const newText = prev + textToAdd;
        return newText.slice(-5000); // Keep buffer manageable
    });
    setCodeIndex(nextIndex);

    // Randomly add logs
    if (Math.random() > 0.95) { // Slightly increased threshold since typing is more frequent
        const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        addLog(randomMsg);
    }

    // Ensure we are in "Hacking" state if not currently in a modal state
    if (systemState === SystemState.IDLE) {
        setSystemState(SystemState.HACKING);
    }

  }, [codeIndex, systemState, addLog]);

  // Keydown listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Special triggers
      if (e.key === 'Escape') {
        triggerAccessEffect(false); // Denied
        return;
      }
      if (e.key === 'Enter' && e.shiftKey) {
        triggerAccessEffect(true); // Granted
        return;
      }

      // Ignore modifying keys to prevent weird behavior
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      
      handleTyping();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTyping]);

  // Mobile auto-typer interval when holding button
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoTyping) {
        interval = setInterval(handleTyping, 30); // Faster interval for mobile auto-typing
    }
    return () => clearInterval(interval);
  }, [isAutoTyping, handleTyping]);


  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col overflow-hidden relative crt">
      {/* Background Scanlines handled in CSS/Global styles */}
      <div className="scanline"></div>

      {/* Header */}
      <header className="flex justify-between items-center p-2 md:p-4 border-b border-green-900 bg-black/90 z-10">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 animate-pulse text-green-400" />
          <h1 className="text-lg md:text-xl font-bold tracking-widest uppercase">NeoHacker<span className="text-xs ml-2 opacity-70">v2.0.4 JP_EDITION</span></h1>
        </div>
        <div className="flex gap-4 text-xs md:text-sm">
          <div className="hidden md:block">IP: 10.24.89.201 [MASKED]</div>
          <div className={`font-bold ${systemState === SystemState.ACCESS_DENIED ? 'text-red-500' : systemState === SystemState.ACCESS_GRANTED ? 'text-white' : 'text-green-500'}`}>
            STATUS: {systemState}
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 p-2 md:p-4 overflow-hidden">
        
        {/* Left Sidebar - Stats */}
        <aside className="hidden md:flex md:col-span-3 flex-col gap-4 overflow-y-auto">
          <SystemStats />
          <PasswordCracker />
          <div className="border border-green-800 p-4 rounded bg-black/50">
            <h3 className="text-green-600 text-xs mb-2">TARGET_MAP</h3>
            <div className="aspect-square bg-green-900/20 rounded flex items-center justify-center relative overflow-hidden">
                 {/* Simple radar effect */}
                 <div className="absolute inset-0 border-2 border-green-900/50 rounded-full scale-50"></div>
                 <div className="absolute inset-0 border-2 border-green-900/50 rounded-full scale-75"></div>
                 <div className="absolute w-full h-1 bg-green-500/20 top-1/2 animate-[spin_4s_linear_infinite] origin-center"></div>
                 <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1/3 left-1/3 animate-ping"></div>
            </div>
          </div>
        </aside>

        {/* Center - Terminal */}
        <section className="col-span-1 md:col-span-6 flex flex-col h-full relative">
            <Terminal text={text} />
            {/* Mobile overlay hint */}
            <div className="md:hidden absolute top-2 right-2 text-xs text-green-700 opacity-50 pointer-events-none">
                TAP TO HACK
            </div>
        </section>

        {/* Right Sidebar - Logs & Controls (Mobile visible) */}
        <aside className="col-span-1 md:col-span-3 flex flex-col gap-4 h-48 md:h-auto">
          <LogPanel logs={logs} />
          
          {/* Hints / Controls */}
          <div className="border border-green-800 p-4 rounded bg-black/50 text-xs space-y-2 hidden md:block">
            <h3 className="text-green-600 border-b border-green-900 pb-1 mb-2">KEY_BINDINGS</h3>
            <div className="flex justify-between"><span>ANY KEY</span> <span className="text-white">TYPING</span></div>
            <div className="flex justify-between"><span>ESC</span> <span className="text-red-400">DENIED</span></div>
            <div className="flex justify-between"><span>SHIFT+ENTER</span> <span className="text-white font-bold">GRANTED</span></div>
          </div>

          {/* Mobile Touch Area (Invisible but handles clicks) */}
          <button 
            className="md:hidden active:bg-green-900/30 border border-green-700 text-green-500 p-4 rounded font-bold"
            onTouchStart={() => setIsAutoTyping(true)}
            onTouchEnd={() => setIsAutoTyping(false)}
            onMouseDown={() => setIsAutoTyping(true)}
            onMouseUp={() => setIsAutoTyping(false)}
          >
            AUTO_HACK [HOLD]
          </button>
        </aside>

      </main>

      {/* Overlays */}
      {systemState === SystemState.ACCESS_DENIED && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-red-900/20 border-4 border-red-600 p-8 rounded-lg text-center animate-bounce shadow-[0_0_50px_rgba(255,0,0,0.5)]">
            <ShieldAlert className="w-24 h-24 text-red-600 mx-auto mb-4" />
            <h2 className="text-5xl font-bold text-red-500 mb-2 font-mono">ACCESS DENIED</h2>
            <p className="text-red-400 text-xl tracking-widest">INTRUSION DETECTED</p>
            <p className="text-red-700 mt-4 animate-pulse">TRACING IP...</p>
          </div>
        </div>
      )}

      {systemState === SystemState.ACCESS_GRANTED && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
           <div className="bg-green-900/20 border-4 border-green-500 p-8 rounded-lg text-center animate-pulse shadow-[0_0_50px_rgba(0,255,0,0.5)]">
            <Unlock className="w-24 h-24 text-green-500 mx-auto mb-4" />
            <h2 className="text-5xl font-bold text-white mb-2 font-mono">ACCESS GRANTED</h2>
            <p className="text-green-400 text-xl tracking-widest">MAINFRAME UNLOCKED</p>
            <p className="text-green-700 mt-4">DOWNLOADING ASSETS...</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;