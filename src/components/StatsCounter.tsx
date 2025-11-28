import { useEffect, useState } from "react";

export function StatsCounter() {
  const [amount, setAmount] = useState(0);
  const target = 120000;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAmount(target);
        clearInterval(timer);
      } else {
        setAmount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-block">
      <div className="bg-gradient-to-r from-[#F0B90B]/20 to-transparent border-l-4 border-[#F0B90B] p-6 rounded-r-lg">
        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
          Total Prize Pool
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-mono tabular-nums" style={{ color: '#F0B90B' }}>
            ${amount.toLocaleString()}
          </span>
          {amount < target && (
            <span className="text-2xl text-gray-500 animate-pulse">...</span>
          )}
        </div>
      </div>
    </div>
  );
}
