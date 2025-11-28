import React, { useState, useRef, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { Share2, Trophy, Eye, Plus, Activity, CheckCircle, Ban, AlertCircle, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useLanguage } from './LanguageProvider';
import { useAuth } from './AuthProvider';
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShareModal } from './ShareModal';
import { FieldTooltip } from './FieldTooltip';

// Mock Data with new fields
const BOTS = [
  {
    id: 1, // Leonidas (was 2)
    rank: 1,
    name: "Leonidas AI",
    avatar: "https://images.unsplash.com/photo-1750096319146-6310519b5af2?w=100&h=100&fit=crop",
    roi: 312.5,
    pnl: 98500,
    aum: 310000,
    volume: 8260000,
    maxDrawdown: -18.2,
    color: "#F59E0B", // Amber
    isNew: false,
    kol: { name: "CryptoKing", avatar: "https://github.com/shadcn.png" }, // Added KOL
    eligible: true,
    featured: true,
    score: 97.7,
    maxNav: 320000,
    maxPnl: 100000
  },
  {
    id: 2, // Atlas
    rank: 2,
    name: "Atlas Bot",
    avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop", // Reusing image or new one
    roi: 287.3,
    pnl: 87200,
    aum: 850000,
    volume: 21100000,
    maxDrawdown: -15.8,
    color: "#10B981", // Emerald
    isNew: false,
    eligible: true,
    featured: false,
    score: 95.7,
    maxNav: 900000,
    maxPnl: 90000
  },
  {
    id: 3, // Ares
    rank: 3,
    name: "Ares Bot",
    avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop", // Reusing image or new one
    roi: 450.0,
    pnl: 125000,
    aum: 520000,
    volume: 15200000,
    maxDrawdown: -12.5,
    color: "#8B5CF6", // Violet
    isNew: false,
    kol: { name: "CryptoKing", avatar: "https://github.com/shadcn.png" }, // Added KOL
    eligible: true,
    featured: true,
    score: 95.3,
    maxNav: 550000,
    maxPnl: 130000
  },
  {
    id: 4, // Gladiator V2
    rank: 4,
    name: "Gladiator V2",
    avatar: "https://images.unsplash.com/photo-1714668083990-837cc1834d64?w=100&h=100&fit=crop",
    roi: 85.40,
    pnl: 28500,
    aum: 95000,
    volume: 1200000,
    maxDrawdown: -15.3,
    color: "#EF4444", // Red
    isNew: false, 
    eligible: true,
    featured: false,
    score: 95.0,
    maxNav: 100000,
    maxPnl: 30000
  },
  {
    id: 5, // SPARTANS Alpha
    rank: 5,
    name: "SPARTANS Alpha",
    avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop",
    roi: 145.20,
    pnl: 45200,
    aum: 150000,
    volume: 2500000,
    maxDrawdown: -12.5,
    color: "#EAB308", // Yellow
    isNew: true,
    startDayIndex: 2, 
    eligible: true,
    featured: false,
    score: 92.1,
    maxNav: 160000,
    maxPnl: 50000
  }
];

// Generate Chart Data
const DATES = ['11-19', '11-20', '11-21', '11-22', '11-23', '11-24', '11-25'];
const CHART_DATA = DATES.map((date, dayIndex) => {
  const dataPoint: any = { date };
  BOTS.forEach(bot => {
    if (dayIndex === 0) {
      dataPoint[`bot_${bot.id}`] = bot.score * 0.4; // Start at 40% of current score to show growth
    } else if (dayIndex === DATES.length - 1) {
      dataPoint[`bot_${bot.id}`] = bot.score;
    } else {
      const progress = dayIndex / (DATES.length - 1);
      // Logarithmic growth curve simulation
      const start = bot.score * 0.4;
      const diff = bot.score - start;
      const current = start + (diff * (1 - Math.pow(1 - progress, 1.5)));
      dataPoint[`bot_${bot.id}`] = current + (Math.random() * 2 - 1);
    }
  });
  return dataPoint;
});

const CustomDot = (props: any) => {
  const { cx, cy, payload, dataKey, stroke, onHover, onLeave } = props;
  
  if (!cx || !cy) return null;

  const isLastPoint = payload.date === DATES[DATES.length - 1];
  if (!isLastPoint) return null;

  const botId = dataKey.split('_')[1];
  const bot = BOTS.find(b => b.id.toString() === botId);

  if (!bot) return null;

  return (
    <g transform={`translate(${cx},${cy})`}>
      <foreignObject x={-12} y={-12} width={24} height={24} style={{ overflow: 'visible' }}>
         <div 
           className="w-6 h-6 rounded-full overflow-hidden bg-black cursor-pointer transition-transform hover:scale-125 z-10 relative"
           style={{ border: `2px solid ${stroke}` }}
           onMouseEnter={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             onHover(bot.id, rect);
           }}
           onMouseLeave={onLeave}
         >
           <img src={bot.avatar} alt="" className="w-full h-full object-cover" />
         </div>
      </foreignObject>
      {/* Score Label */}
      <foreignObject x={16} y={-10} width={40} height={20}>
        <div 
            className="px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold text-black flex items-center justify-center leading-none"
            style={{ backgroundColor: stroke }}
        >
            {bot.score.toFixed(1)}
        </div>
      </foreignObject>
    </g>
  );
};

import { BotHoverCard } from './BotHoverCard';

export function TopPerformersSection() {
  const { t } = useLanguage();
  const { isLoggedIn, user } = useAuth();
  const [hoveredBotId, setHoveredBotId] = useState<number | null>(null);
  const [subscribedBots, setSubscribedBots] = useState<number[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Hover Card State
  const [hoverCard, setHoverCard] = useState<{ botId: number, x: number, y: number } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tooltips = {
    score: {
      title: t('tooltips.score.title'),
      formula: t('tooltips.score.formula'),
      description: t('tooltips.score.description')
    },
    aum: {
       title: t('tooltips.aum.title'),
       description: t('tooltips.aum.description')
    },
    pnl: {
      title: t('tooltips.pnl.title'),
      description: t('tooltips.pnl.description')
    }
  };

  const handleDotHover = (botId: number, rect: DOMRect) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      
      hoverTimeoutRef.current = setTimeout(() => {
          // Calculate center position of the dot
          const x = rect.left + rect.width / 2;
          const y = rect.top; // Top of the dot
          setHoverCard({ botId, x, y });
      }, 300);
  };

  const handleMouseLeave = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setHoverCard(null); 
  };

  const handleInfoHover = (botId: number, e: React.MouseEvent) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      
      // Show immediately or with very short delay
      setHoverCard({ botId, x, y });
  };

  const handleShare = () => {
    const baseUrl = window.location.origin + '/arena';
    const refCode = isLoggedIn ? `?ref=${user?.name ? 'USER123' : 'GUEST'}&source=arena` : '?source=arena';
    const generatedUrl = baseUrl + refCode;
    setShareUrl(generatedUrl);
    setShowShareModal(true);
  };

  const handleAction = (botId: number) => {
      if (!isLoggedIn) {
          window.location.href = `/signup?target_bot_id=${botId}`;
          return;
      }

      if (subscribedBots.includes(botId)) {
          // View
          window.location.href = `/bot/${botId}`;
      } else {
          // Subscribe
          setSubscribedBots(prev => [...prev, botId]);
          toast.success("Subscribed successfully!", {
              description: "You are now following this bot's signals."
          });
      }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 relative">
        {/* Hover Card Portal/Overlay */}
        {hoverCard && (
            <BotHoverCard 
                bot={BOTS.find(b => b.id === hoverCard.botId)} 
                position={{ x: hoverCard.x, y: hoverCard.y }} 
                style={{}}
            />
        )}

        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent inline-flex items-center gap-3">
                    <Trophy className="text-[#F59E0B]" />
                    Top 5 Performers Battle
                </h2>
                <p className="text-gray-400 mt-2">Live performance tracking of the arena's champions</p>
            </div>
            <Button 
                variant={showShareModal ? "default" : "outline"}
                className={`
                    gap-2 transition-all duration-300
                    ${showShareModal 
                        ? 'bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 border-transparent' 
                        : 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent'}
                `}
                onClick={handleShare}
            >
                <Share2 size={16} />
                Share
            </Button>
        </div>

        <ShareModal 
            isOpen={showShareModal} 
            onClose={() => setShowShareModal(false)} 
            shareUrl={shareUrl} 
        />

        {/* Chart Area */}
        <div className="w-full bg-[#0D0D0D] border border-gray-800 rounded-xl p-6 mb-8 h-[400px] relative overflow-hidden" style={{ minHeight: '400px' }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart 
                    data={CHART_DATA}
                    margin={{ top: 20, right: 50, left: 0, bottom: 0 }}
                    onMouseLeave={() => setHoveredBotId(null)}
                >
                    <defs>
                        {BOTS.map(bot => (
                             <linearGradient key={bot.id} id={`gradient-${bot.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={bot.color} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={bot.color} stopOpacity={0}/>
                             </linearGradient>
                        ))}
                    </defs>
                    <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 12 }} 
                        dy={10}
                        padding={{ left: 0, right: 0 }}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 12 }} 
                        tickFormatter={(value) => `${value}`}
                        domain={[0, 100]}
                    />
                    <Tooltip content={<></>} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                    <ReferenceLine y={0} stroke="#374151" strokeDasharray="3 3" />
                    
                    {BOTS.map((bot) => (
                        <Line
                            key={bot.id}
                            type="monotone"
                            dataKey={`bot_${bot.id}`}
                            stroke={bot.color}
                            strokeWidth={hoveredBotId === bot.id ? 4 : (hoveredBotId ? 1 : 2.5)}
                            dot={(props) => <CustomDot {...props} onHover={handleDotHover} onLeave={handleMouseLeave} />}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            connectNulls={false}
                            strokeOpacity={hoveredBotId && hoveredBotId !== bot.id ? 0.3 : 1}
                            animationDuration={1500}
                            onMouseEnter={() => setHoveredBotId(bot.id)}
                            onMouseLeave={() => setHoveredBotId(null)}
                            className="cursor-pointer transition-all duration-300"
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>

        {/* List Area */}
        <div className="space-y-3">
            {/* Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-800">
                <div className="col-span-1 text-left">Rank</div>
                <div className="col-span-4 text-left">{t('dashboard.col_bot_info')}</div>
                <div className="col-span-1 text-center">
                    <FieldTooltip data={tooltips.score}>Score</FieldTooltip>
                </div>
                <div className="col-span-2 text-right">
                    <FieldTooltip data={tooltips.aum}>NAV (AUM)</FieldTooltip>
                </div>
                <div className="col-span-2 text-right">
                    <FieldTooltip data={tooltips.pnl}>{t('dashboard.col_pnl')}</FieldTooltip>
                </div>
                <div className="col-span-2 text-center">{t('dashboard.col_actions')}</div>
            </div>

            {/* Rows */}
            {BOTS.map((bot) => {
                const isPositive = bot.roi > 0;
                
                return (
                <div 
                    key={bot.id}
                    className={`
                        relative group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 rounded-xl border transition-all duration-200 items-center cursor-pointer
                        ${hoveredBotId === bot.id 
                            ? 'bg-[#1a1f2e] border-[#F59E0B]/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]' 
                            : 'bg-[#0D0D0D] border-gray-800 hover:border-gray-700'}
                        ${bot.rank === 1 ? 'border-l-4 border-l-[#F59E0B]' : 'border-l-4 border-l-gray-700'}
                    `}
                    onMouseEnter={() => setHoveredBotId(bot.id)}
                    onMouseLeave={() => setHoveredBotId(null)}
                    onClick={() => window.location.href = `/bot/${bot.id}`}
                >
                    {/* Rank */}
                    <div className="col-span-1 flex items-center justify-start md:justify-start mb-2 md:mb-0">
                        <div className="flex items-center gap-2">
                            {bot.rank <= 3 ? (
                                <Crown
                                    size={18}
                                    className={bot.rank === 1 ? "text-[#F59E0B]" : (bot.rank === 2 ? "text-gray-300" : "text-amber-700")}
                                />
                            ) : null}
                            <span className={`text-lg font-mono ${bot.rank <= 3 ? "font-bold text-white" : "text-gray-400"}`}>
                                {bot.rank}
                            </span>
                        </div>
                    </div>

                    {/* Bot Info */}
                    <div 
                        className="col-span-4 flex items-center gap-4"
                        onMouseEnter={(e) => handleInfoHover(bot.id, e)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                                <ImageWithFallback src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black border-2 border-black flex items-center justify-center" style={{ backgroundColor: bot.color }}>
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            </div>
                        </div>
                        <div className="min-w-0 flex flex-col">
                            <h3 className={`font-bold text-base text-white truncate`}>
                                {bot.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                {bot.kol && (
                                    <Badge className="bg-[#F59E0B] text-black text-[10px] px-1.5 h-4 border-none whitespace-nowrap leading-none flex items-center">
                                        {bot.kol.name}
                                    </Badge>
                                )}
                                {bot.featured && !bot.kol && (
                                    <span className="text-[10px] text-[#F59E0B] uppercase tracking-wide">{t('bot_card.featured')}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Score */}
                    <div className="col-span-6 md:col-span-1 flex justify-between md:justify-center text-right md:text-center">
                        <span className="md:hidden text-gray-500 text-sm">
                            <FieldTooltip data={tooltips.score}>Score</FieldTooltip>
                        </span>
                        <div className="text-xl font-bold text-[#F59E0B] font-mono">
                            {bot.score.toFixed(1)}
                        </div>
                    </div>

                    {/* NAV */}
                    <div className="col-span-6 md:col-span-2 flex justify-between md:block text-right">
                        <span className="md:hidden text-gray-500 text-sm">
                            <FieldTooltip data={tooltips.aum}>NAV</FieldTooltip>
                        </span>
                        <div className="text-white font-mono font-medium">
                            ${bot.aum.toLocaleString()}
                        </div>
                    </div>

                    {/* PnL */}
                    <div className="col-span-6 md:col-span-2 flex justify-between md:block text-right">
                        <span className="md:hidden text-gray-500 text-sm">
                            <FieldTooltip data={tooltips.pnl}>PnL</FieldTooltip>
                        </span>
                        <div className={`font-mono font-medium ${bot.pnl > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                            {bot.pnl > 0 ? '+' : ''}${bot.pnl.toLocaleString()}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-12 md:col-span-2 mt-4 md:mt-0 flex flex-wrap justify-end md:justify-center gap-2">


                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/10 bg-transparent"
                          onClick={(e) => {
                              e.stopPropagation();
                              // Activity logic mock
                          }}
                        >
                          <Activity size={14} />
                        </Button>
                        
                        <Button 
                            size="sm"
                            className={`
                                h-8 font-medium transition-all px-3
                                ${subscribedBots.includes(bot.id) 
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90'}
                            `}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAction(bot.id);
                            }}
                        >
                            {subscribedBots.includes(bot.id) ? (
                                "View"
                            ) : (
                                "Subscribe"
                            )}
                        </Button>
                    </div>
                </div>
            );
            })}
        </div>
    </section>
  );
}
