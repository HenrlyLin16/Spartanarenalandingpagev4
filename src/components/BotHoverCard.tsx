import React from 'react';
import { Bot } from './LeaderboardSection';
import { Users, TrendingUp, Activity, Trophy, BarChart3 } from 'lucide-react';

interface BotHoverCardProps {
  bot: Bot | any;
  position: { x: number; y: number };
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function BotHoverCard({ bot, position, style, onMouseEnter, onMouseLeave }: BotHoverCardProps) {
  if (!bot) return null;

  // Common Data
  const color = bot.color || "#F59E0B";
  const avatar = bot.avatar || "https://github.com/shadcn.png";
  const name = bot.name || "Unknown Bot";
  const score = bot.score || 0;
  const subscribers = bot.subscribers || 0;
  const volume = bot.volume || 0;
  const maxNav = bot.maxNav || bot.aum || 0;
  const maxPnl = bot.maxPnl || bot.pnl || 0;

  const formatCurrency = (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const formatScore = (val: number) => val.toFixed(1);

  return (
    <div 
        className="fixed z-[100] animate-in fade-in zoom-in-95 duration-200"
        style={{ 
            left: position.x, 
            top: position.y, 
            transform: 'translate(-50%, -100%) translateY(-16px)', 
            ...style
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="w-[320px] rounded-xl overflow-hidden backdrop-blur-md bg-[#14141e]/95 border shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex flex-col"
             style={{ borderColor: color }}
        >
            {/* Base Info */}
            <div className="p-4 space-y-4">
                {/* Header: Avatar + Name */}
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full border-2 overflow-hidden shrink-0 bg-black" style={{ borderColor: color }}>
                        <img src={avatar} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-tight">{name}</h3>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Score - Highlighted */}
                    <div className="col-span-2 bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between">
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                            <Trophy size={12} className="text-[#F59E0B]" /> Score
                        </div>
                        <div className="text-2xl font-mono font-bold text-[#F59E0B]">
                            {formatScore(score)}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                            <Users size={12} /> Subscribers
                        </div>
                        <div className="text-lg font-mono font-bold text-white">
                            {subscribers.toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                            <BarChart3 size={12} /> Volume (USDT)
                        </div>
                        <div className="text-lg font-mono font-bold text-white">
                            ${(volume / 1000000).toFixed(2)}M
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-xs text-gray-400 mb-1">Max NAV</div>
                        <div className="text-sm font-mono font-bold text-white">
                            ${formatCurrency(maxNav)}
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-xs text-gray-400 mb-1">Max PnL</div>
                        <div className="text-sm font-mono font-bold text-white">
                            ${formatCurrency(maxPnl)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Arrow */}
            <div 
                className="absolute bottom-0 left-1/2 w-3 h-3 bg-[#14141e] border-r border-b transform rotate-45 translate-y-1.5 -translate-x-1.5"
                style={{ borderColor: color }}
            />
        </div>
    </div>
  );
}
