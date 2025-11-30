import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type ActivityPhase = "warmup" | "ongoing" | "ended";

export function CountdownTimer() {
  const { t } = useLanguage();
  // 模拟活动阶段，实际应从服务器获取
  const [phase, setPhase] = useState<ActivityPhase>("ongoing");
  
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // 倒计时结束，刷新页面
                window.location.reload();
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPhaseText = () => {
    switch (phase) {
      case "warmup":
        return t('countdown.starts_in');
      case "ongoing":
        return t('countdown.ends_in');
      case "ended":
        return t('countdown.ended');
      default:
        return t('countdown.status');
    }
  };

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div 
        className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0E11] border border-[#F59E0B]/50 rounded-md md:rounded-lg p-2 md:p-6 min-w-[60px] md:min-w-[100px] shadow-[0_0_10px_rgba(245,158,11,0.2)] md:shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center"
      >
        <div 
          className="text-2xl md:text-6xl font-mono tabular-nums font-bold leading-none"
          style={{ color: '#F59E0B' }}
        >
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-[10px] md:text-base text-gray-400 mt-1 md:mt-2 uppercase tracking-wider font-medium text-center w-full">
        {label}
      </div>
    </div>
  );

  return (
    <div className="space-y-3 md:space-y-6">
      <div className="text-center">
        <p className="text-xs md:text-base text-gray-400 uppercase tracking-wider mb-1 md:mb-2">{getPhaseText()}</p>
        <div className="h-0.5 md:h-1 w-16 md:w-24 mx-auto bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
      </div>
      
      <div className="flex gap-2 md:gap-4 justify-center">
        <TimeUnit value={timeLeft.days} label={t('countdown.days')} />
        <TimeUnit value={timeLeft.hours} label={t('countdown.hours')} />
        <TimeUnit value={timeLeft.minutes} label={t('countdown.mins')} />
        <TimeUnit value={timeLeft.seconds} label={t('countdown.secs')} />
      </div>
    </div>
  );
}