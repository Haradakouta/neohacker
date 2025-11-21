export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export enum SystemState {
  IDLE = 'IDLE',
  HACKING = 'HACKING',
  ACCESS_GRANTED = 'ACCESS_GRANTED',
  ACCESS_DENIED = 'ACCESS_DENIED',
  BREACH_DETECTED = 'BREACH_DETECTED',
}

export interface NetworkNode {
  id: number;
  x: number;
  y: number;
  status: 'locked' | 'cracking' | 'unlocked';
}