import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, X, Bell } from 'lucide-react';

interface KitchenTimerProps {
  initialSeconds?: number;
  isOpen: boolean;
  onClose: () => void;
  timerLabel?: string;
}

export const KitchenTimer: React.FC<KitchenTimerProps> = ({
  initialSeconds = 300,
  isOpen,
  onClose,
  timerLabel = 'Minuteur de cuisson',
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [totalTime, setTotalTime] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isAlerting, setIsAlerting] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (initialSeconds > 0) {
      setTimeLeft(initialSeconds);
      setTotalTime(initialSeconds);
      setIsRunning(false);
      setIsAlerting(false);
    }
  }, [initialSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsAlerting(true);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      const now = ctx.currentTime;
      [0, 0.25, 0.5].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now + offset);
        gain.gain.setValueAtTime(0.3, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.2);
      });
    } catch {
      // Audio fallback
    }
  };

  const addMinutes = (mins: number) => {
    setTimeLeft((prev) => prev + mins * 60);
    setTotalTime((prev) => prev + mins * 60);
    setIsAlerting(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsAlerting(false);
    setTimeLeft(totalTime || 300);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-stone-900 text-stone-100 rounded-2xl shadow-2xl border border-stone-700/80 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-medium tracking-wide uppercase text-stone-300">
            {timerLabel}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-100 transition-colors p-1 cursor-pointer"
          aria-label="Fermer le minuteur"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isAlerting && (
        <div className="mt-3 flex items-center justify-center gap-2 py-2 px-3 bg-amber-500/20 border border-amber-500/40 rounded-lg text-amber-300 text-xs font-semibold animate-pulse">
          <Bell className="w-4 h-4" />
          Temps écoulé ! Votre cuisson est prête.
        </div>
      )}

      {/* Timer display */}
      <div className="my-5 text-center">
        <div className="font-mono text-4xl font-bold tracking-tight text-white tabular-nums">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="w-full bg-stone-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isAlerting ? 'bg-amber-400' : 'bg-amber-500'
            }`}
            style={{ width: `${Math.min(100, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => addMinutes(1)}
          className="px-2.5 py-1 text-xs font-medium bg-stone-800 hover:bg-stone-700 rounded-md text-stone-300 transition-colors cursor-pointer"
        >
          +1 min
        </button>
        <button
          onClick={() => addMinutes(5)}
          className="px-2.5 py-1 text-xs font-medium bg-stone-800 hover:bg-stone-700 rounded-md text-stone-300 transition-colors cursor-pointer"
        >
          +5 min
        </button>
        <button
          onClick={() => addMinutes(15)}
          className="px-2.5 py-1 text-xs font-medium bg-stone-800 hover:bg-stone-700 rounded-md text-stone-300 transition-colors cursor-pointer"
        >
          +15 min
        </button>
      </div>

      {/* Action controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handleReset}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Réinitialiser
        </button>
        <button
          onClick={() => {
            if (timeLeft === 0) setTimeLeft(totalTime || 300);
            setIsRunning(!isRunning);
            setIsAlerting(false);
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            isRunning
              ? 'bg-stone-700 hover:bg-stone-600 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              {timeLeft === 0 ? 'Relancer' : 'Démarrer'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
