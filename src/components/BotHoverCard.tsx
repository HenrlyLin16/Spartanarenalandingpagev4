import React from 'react';
import { Bot } from './LeaderboardSection';
import { TrendingUp, TrendingDown, Users, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from './ui/badge';

interface BotHoverCardProps {
  bot: Bot | any;
  position: { x: number; y: number };
  style?: React.CSSProperties;
  type?: 'planA' | 'planB' | 'planC';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function BotHoverCard({ bot, position, style, type = 'planA', onMouseEnter, onMouseLeave }: BotHoverCardProps) {
  if (!bot) return null;

  // Common Data
  const color = bot.color || "#F59E0B";
  const avatar = bot.avatar || "https://github.com/shadcn.png";
  const name = bot.name || "Unknown Bot";
  const kolName = bot.kol?.name;

  // Plan A specific
  const score = bot.score || 0;
  const maxNav = bot.maxNav || 0;
  const maxPnl = bot.maxPnl || 0;

  // Plan B/C specific
  const currentNav = bot.aum || 0;
  const currentPnl = bot.pnl || 0;
  const navGrowth7d = bot.navGrowth7d || 0;
  const pnl7dAvg = bot.pnl7dAvg || 0;
  const winRate = bot.winRate || 0;
  const maxDrawdown = bot.maxDrawdown || 0;
  
  // Mock Data for missing fields
  const subscribers = bot.subscribers || Math.floor(Math.random() * 500) + 50;
  const pnlGrowthTrend = bot.pnlGrowthTrend || 12.5;

  const formatCurrency = (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  const renderPlanA = () => (
    <div className="p-4 grid grid-cols-2 gap-4">
        {/* Left: Score */}
        <div className="space-y-1 border-r border-white/10 pr-2">
            <div className="text-2xl font-bold text-[#F59E0B] font-mono leading-none">
                {score.toFixed(1)} <span className="text-xs text-gray-500 font-normal">/100</span>
            </div>
            <div className="text-[10px] text-gray-500 leading-tight mt-2">
                Score = <br/>
                <span className="font-mono text-gray-400">[(NAV/Max) + (PnL/Max)] × 50</span>
            </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-3 pl-1">
            <div>
                <div className="text-white font-mono text-sm font-bold">${formatCurrency(currentNav)}</div>
                <div className="text-[10px] text-gray-500">Max: ${formatCurrency(maxNav)}</div>
            </div>
            <div>
                <div className={`${currentPnl > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'} font-mono text-sm font-bold`}>
                    {currentPnl > 0 ? '+' : ''}${formatCurrency(currentPnl)}
                </div>
                <div className="text-[10px] text-gray-500">Max: ${formatCurrency(maxPnl)}</div>
            </div>
        </div>
    </div>
  );

  const renderPlanB = () => (
    <>
        <div className="p-4 grid grid-cols-2 gap-4 border-b border-white/5">
             {/* Left: Core NAV */}
            <div className="space-y-1 border-r border-white/10 pr-2">
                <div className="text-xs text-gray-400">当前 NAV</div>
                <div className="text-lg font-bold text-white font-mono leading-none">
                    ${formatCurrency(currentNav)}
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                    入榜门槛: ≥ 500 USDT
                </div>
            </div>
            
             {/* Right: Growth */}
            <div className="space-y-2 pl-1">
                <div>
                    <div className="text-xs text-gray-400">7日 NAV 涨幅</div>
                    <div className={`text-sm font-bold font-mono flex items-center gap-1 ${navGrowth7d >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {navGrowth7d >= 0 ? <ArrowUp size={12}/> : <ArrowDown size={12}/>}
                        {Math.abs(navGrowth7d)}%
                    </div>
                </div>
                <div>
                    <div className="text-[10px] text-gray-500">30日 NAV 峰值</div>
                    <div className="text-xs text-gray-400 font-mono">${formatCurrency(maxNav)}</div>
                </div>
            </div>
        </div>

        {/* Secondary Metrics */}
        <div className="p-4 bg-white/5 grid grid-cols-3 gap-2 text-[10px]">
            <div>
                <div className="text-gray-500 mb-0.5">当前 PnL</div>
                <div className={`font-mono font-bold ${currentPnl >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                    {currentPnl > 0 ? '+' : ''}${formatCurrency(currentPnl)}
                </div>
            </div>
             <div>
                <div className="text-gray-500 mb-0.5">AUM</div>
                <div className="text-gray-300 font-mono">
                    ${formatCurrency(currentNav * 1.1)}
                </div>
            </div>
             <div>
                <div className="text-gray-500 mb-0.5">订阅用户</div>
                <div className="text-gray-300 font-mono flex items-center gap-1">
                    <Users size={10} />
                    {subscribers}
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-black/20 text-[10px] text-gray-500 italic border-t border-white/5">
            NAV榜按资金规模排序，鼓励大资金策略
        </div>
    </>
  );

  const renderPlanC = () => (
     <>
        <div className="p-4 grid grid-cols-2 gap-4 border-b border-white/5">
             {/* Left: Core PnL */}
            <div className="space-y-1 border-r border-white/10 pr-2">
                <div className="text-xs text-gray-400">当前 PnL</div>
                <div className={`text-lg font-bold font-mono leading-none ${currentPnl >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                     {currentPnl > 0 ? '+' : ''}${formatCurrency(currentPnl)}
                </div>
                <div className="mt-2">
                    <div className="text-[10px] text-[#F59E0B] mb-0.5">7日平均 PnL (排序依据)</div>
                    <div className="text-sm font-bold text-[#F59E0B] font-mono">
                        +${formatCurrency(pnl7dAvg)}
                    </div>
                </div>
            </div>
            
             {/* Right: Trend */}
            <div className="space-y-2 pl-1">
                 <div>
                    <div className="text-xs text-gray-400">PnL 增长趋势</div>
                    <div className="text-sm font-bold text-white font-mono flex items-center gap-1">
                        <TrendingUp size={12} className="text-[#10B981]"/>
                        +{pnlGrowthTrend}%
                    </div>
                </div>
                <div className="pt-2">
                     <div className="text-[10px] text-gray-500">历史最高 PnL</div>
                     <div className="text-xs text-gray-400 font-mono">${formatCurrency(maxPnl)}</div>
                </div>
            </div>
        </div>

        {/* Secondary Metrics */}
        <div className="p-4 bg-white/5 grid grid-cols-3 gap-2 text-[10px]">
            <div>
                <div className="text-gray-500 mb-0.5">当前 NAV</div>
                <div className="text-white font-mono">
                   ${formatCurrency(currentNav)}
                </div>
            </div>
             <div>
                <div className="text-gray-500 mb-0.5">胜率</div>
                <div className="text-white font-mono">
                    {winRate}%
                </div>
            </div>
             <div>
                <div className="text-gray-500 mb-0.5">最大回撤</div>
                <div className="text-[#EF4444] font-mono">
                    {maxDrawdown}%
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-black/20 text-[10px] text-gray-500 italic border-t border-white/5">
            PnL榜仅统计盈利机器人，采用7日移动平均降低波动
        </div>
    </>
  );

  return (
    <div 
        className="fixed z-[100] animate-in fade-in zoom-in-95 duration-200"
        style={{ 
            left: position.x, 
            top: position.y, 
            transform: 'translate(-50%, -100%) translateY(-16px)', // Centered above the cursor/element
            ...style
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="w-[360px] rounded-xl overflow-hidden backdrop-blur-md bg-[#14141e]/95 border shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
             style={{ borderColor: color }}
        >
            {/* Header */}
            <div className="p-3 flex items-center justify-between border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 overflow-hidden shrink-0 cursor-pointer" style={{ borderColor: color }} onClick={() => window.location.href = `/bot/${bot.id}`}>
                        <img src={avatar} alt={bot.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="font-bold text-white text-base flex items-center gap-2 cursor-pointer hover:underline" onClick={() => window.location.href = `/bot/${bot.id}`}>
                            {name}
                        </div>
                        {kolName && (
                             <Badge className="bg-[#F59E0B] text-black text-[10px] px-1.5 h-4 border-none mt-1">
                                {kolName}
                             </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Dynamic Content */}
            {type === 'planA' && renderPlanA()}
            {type === 'planB' && renderPlanB()}
            {type === 'planC' && renderPlanC()}
            
            {/* Arrow */}
            <div 
                className="absolute bottom-0 left-1/2 w-3 h-3 bg-[#14141e] border-r border-b transform rotate-45 translate-y-1.5 -translate-x-1.5"
                style={{ borderColor: color }}
            />
        </div>
    </div>
  );
}
