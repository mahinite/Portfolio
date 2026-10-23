import React, { useState, useEffect } from 'react';

export const LiveWatchCard: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('21:41');
  const [secondsStr, setSecondsStr] = useState<string>('00');
  const [isDayTime, setIsDayTime] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      const hour = parts.find((p) => p.type === 'hour')?.value || '21';
      const minute = parts.find((p) => p.type === 'minute')?.value || '41';
      const second = parts.find((p) => p.type === 'second')?.value || '00';

      setTimeStr(`${hour}:${minute}`);
      setSecondsStr(second);

      const hourNum = parseInt(hour, 10);
      setIsDayTime(hourNum >= 6 && hourNum < 18);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d131f]/90 p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group shadow-lg min-h-[170px]">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-slate-400 tracking-wide">
            Time on my watch
          </span>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDayTime ? 'bg-amber-400' : 'bg-indigo-400'
              } animate-pulse`}
            />
            {isDayTime ? 'Day' : 'Night'}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <p className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight tabular-nums">
            {timeStr}
          </p>
          <span className="font-mono text-sm text-slate-500 tabular-nums">
            :{secondsStr}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between font-mono text-xs text-slate-400">
        <span>Dhaka · UTC+6</span>
        <span className="text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors">
          Local time
        </span>
      </div>
    </div>
  );
};
