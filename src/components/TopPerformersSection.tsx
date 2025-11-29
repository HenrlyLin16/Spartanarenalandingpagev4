import React, { useState, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { Trophy, Users, UserPlus, Share2, Copy, Download, Twitter, Facebook, Send, QrCode, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageProvider';
import { useAuth } from './AuthProvider';
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BotHoverCard } from './BotHoverCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Mock Data
const BOTS = [
  {
    id: 1,
    rank: 1,
    name: "Leonidas AI",
    avatar: "https://images.unsplash.com/photo-1750096319146-6310519b5af2?w=100&h=100&fit=crop",
    score: 97.7,
    aum: 310000,
    subscribers: 1250,
    subscribersGrowth: 3928, // Mocked 24h growth
    color: "#F59E0B",
    volume: 8260000,
    maxDrawdown: -18.2,
    winRate: 68,
    maxNav: 320000,
    maxPnl: 100000,
  },
  {
    id: 2,
    rank: 2,
    name: "Atlas Bot",
    avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop",
    score: 95.7,
    aum: 850000,
    subscribers: 3420,
    subscribersGrowth: 1205,
    color: "#10B981",
    volume: 21100000,
    maxDrawdown: -15.8,
    winRate: 72,
    maxNav: 900000,
    maxPnl: 90000,
  },
  {
    id: 3,
    rank: 3,
    name: "Ares Bot",
    avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop",
    score: 95.3,
    aum: 520000,
    subscribers: 2100,
    subscribersGrowth: 850,
    color: "#8B5CF6",
    volume: 15200000,
    maxDrawdown: -12.5,
    winRate: 65,
    maxNav: 550000,
    maxPnl: 130000,
  },
  {
    id: 4,
    rank: 4,
    name: "Gladiator V2",
    avatar: "https://images.unsplash.com/photo-1714668083990-837cc1834d64?w=100&h=100&fit=crop",
    score: 95.0,
    aum: 95000,
    subscribers: 450,
    subscribersGrowth: 120,
    color: "#EF4444",
    volume: 1200000,
    maxDrawdown: -15.3,
    winRate: 55,
    maxNav: 100000,
    maxPnl: 30000,
  },
  {
    id: 5,
    rank: 5,
    name: "SPARTANS Alpha",
    avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop",
    score: 92.1,
    aum: 150000,
    subscribers: 890,
    subscribersGrowth: 340,
    color: "#EAB308",
    volume: 2500000,
    maxDrawdown: -12.5,
    winRate: 60,
    maxNav: 160000,
    maxPnl: 50000,
  }
];

// Generate Chart Data
const DATES = ['11-19', '11-20', '11-21', '11-22', '11-23', '11-24', '11-25'];
const CHART_DATA = DATES.map((date, dayIndex) => {
  const dataPoint: any = { date };
  BOTS.forEach(bot => {
    if (dayIndex === 0) {
      dataPoint[`bot_${bot.id}`] = bot.score * 0.4; 
    } else if (dayIndex === DATES.length - 1) {
      dataPoint[`bot_${bot.id}`] = bot.score;
    } else {
      const progress = dayIndex / (DATES.length - 1);
      const start = bot.score * 0.4;
      const diff = bot.score - start;
      const current = start + (diff * (1 - Math.pow(1 - progress, 1.5)));
      dataPoint[`bot_${bot.id}`] = current + (Math.random() * 2 - 1);
    }
  });
  return dataPoint;
});

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a: any, b: any) => b.value - a.value);
    return (
      <div className="bg-[#0D0D0D]/95 backdrop-blur-sm border border-gray-800 p-3 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50">
        <p className="text-gray-400 text-xs font-mono mb-2 border-b border-gray-800 pb-1">2025-{label}</p>
        <div className="space-y-1.5">
            {sortedPayload.map((entry: any) => {
                const botId = entry.dataKey.split('_')[1];
                const bot = BOTS.find(b => b.id.toString() === botId);
                if (!bot) return null;
                return (
                    <div key={bot.id} className="flex items-center justify-between gap-4 min-w-[140px]">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: bot.color }} />
                            <span className="text-xs font-bold text-gray-200">{bot.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold" style={{ color: bot.color }}>
                            {entry.value.toFixed(1)}
                        </span>
                    </div>
                );
            })}
        </div>
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, payload, dataKey, stroke, onHover, onLeave, hoveredBotId } = props;
  if (!cx || !cy) return null;
  const isLastPoint = payload.date === DATES[DATES.length - 1];
  if (!isLastPoint) return null;
  const botId = dataKey.split('_')[1];
  const bot = BOTS.find(b => b.id.toString() === botId);
  if (!bot) return null;
  
  const isHovered = hoveredBotId === parseInt(botId);

  return (
    <g transform={`translate(${cx},${cy})`} className="isolate">
      <foreignObject x={-16} y={-16} width={32} height={32} style={{ overflow: 'visible' }}>
         <div 
           className={`w-8 h-8 rounded-full overflow-hidden bg-black cursor-pointer transition-all duration-300 relative z-10 ${isHovered ? 'scale-125 ring-2 ring-white shadow-lg' : ''}`}
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
      <foreignObject x={20} y={-10} width={40} height={24} style={{ overflow: 'visible' }}>
        <div 
            className={`px-2 py-0.5 rounded text-[10px] font-bold text-black flex items-center justify-center leading-none whitespace-nowrap transition-all duration-300 ${isHovered ? 'scale-110 translate-x-1' : ''}`}
            style={{ backgroundColor: stroke }}
        >
            {bot.score.toFixed(1)}
        </div>
      </foreignObject>
    </g>
  );
};

export function TopPerformersSection() {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [hoveredBotId, setHoveredBotId] = useState<number | null>(null);
  const [hoverCard, setHoverCard] = useState<{ botId: number, x: number, y: number } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDotHover = (botId: number, rect: DOMRect) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
          const x = rect.left + rect.width / 2;
          const y = rect.top;
          setHoverCard({ botId, x, y });
      }, 300);
  };

  const handleCardHover = (botId: number, e: React.MouseEvent) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      setHoverCard({ botId, x, y });
  };

  const handleMouseLeave = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setHoverCard(null); 
  };

  const handleSubscribe = (botId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isLoggedIn) {
          window.location.href = '/login';
          return;
      }
      toast.success("Redirecting to subscription...", {
          description: "Opening bot details page."
      });
      setTimeout(() => {
        window.location.href = `/bot/${botId}?action=subscribe`;
      }, 500);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("https://2c5a55c9-3293-42f1-8cfc-a351a587b728-v2-...");
    toast.success("Referral link copied!");
  };

  // Marquee Items
  const MARQUEE_ITEMS = [
    { id: 1, user: "88***21", action: "Subscribed", bot: "Leonidas AI", amount: "1,200 USDT" },
    { id: 2, user: "32***54", action: "Subscribed", bot: "Atlas Bot", amount: "5,000 USDT" },
    { id: 3, user: "91***09", action: "Subscribed", bot: "Ares Bot", amount: "2,500 USDT" },
    { id: 4, user: "12***87", action: "Subscribed", bot: "Gladiator V2", amount: "800 USDT" },
    { id: 5, user: "77***33", action: "Subscribed", bot: "SPARTANS Alpha", amount: "10,000 USDT" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 pt-0 pb-12 relative">
        {hoverCard && (
            <BotHoverCard 
                bot={BOTS.find(b => b.id === hoverCard.botId)} 
                position={{ x: hoverCard.x, y: hoverCard.y }} 
            />
        )}
        
        {/* Marquee - Above Title */}
        <div className="mb-12 relative w-full overflow-hidden bg-black/40 border border-gray-800 rounded-lg py-2">
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
                className="flex whitespace-nowrap gap-8"
                animate={{ x: [0, -1000] }}
                transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: 30
                }}
            >
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2 text-xs font-mono text-gray-400">
                        <span>UID: {item.user}</span>
                        <span>{item.action}</span>
                        <span className="text-[#F59E0B]">[{item.bot}]</span>
                        <span className="text-[#0ECB81] font-bold">{item.amount}</span>
                    </div>
                ))}
            </motion.div>
        </div>

        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent inline-flex items-center gap-3">
                    <Trophy className="text-[#F59E0B]" />
                    Top 5 Performers Battle
                </h2>
                <p className="text-gray-400 mt-2">Live performance tracking of the arena's champions</p>
            </div>
            
            {/* Share Button */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/20">
                        <Share2 size={16} />
                        Share
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0D0D0D] border border-gray-800 text-white sm:max-w-lg max-h-[90vh] overflow-y-auto p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Share</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-2">
                        {/* Poster Card Preview */}
                        <div className="relative bg-black border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-32 bg-[#F59E0B]/10 blur-3xl" />
                            
                            <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-xl italic mb-1 z-10">
                                <Crown size={20} className="fill-current" />
                                SPARTANS ARENA
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 z-10">2025 AI Algo Trading Tournament</div>
                            
                            <div className="text-[10px] text-[#F59E0B] font-bold uppercase tracking-wide mb-0.5 z-10">TOTAL PRIZE POOL</div>
                            <div className="text-3xl font-bold text-white mb-2 z-10 glow-text">$120,000</div>
                            
                            <div className="flex items-center gap-3 text-xs mb-3 z-10">
                                <span className="text-white font-bold">300 SPARTANS</span>
                                <span className="text-gray-600">|</span>
                                <span className="text-[#10B981] font-bold">+2,689% ROI</span>
                            </div>
                            
                            {/* Mini Chart Graphic */}
                            <div className="w-full h-24 bg-[#0A0A0A] rounded-xl border border-gray-800/50 mb-4 relative overflow-hidden flex items-end p-4 z-10">
                                <div className="w-full h-full">
                                    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                        <path d="M0 50 C 40 45, 60 20, 100 10" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M0 50 C 40 48, 60 35, 100 25" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M0 50 C 40 49, 60 40, 100 35" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M0 50 C 40 50, 60 45, 100 42" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div className="w-full flex items-end justify-between z-10 mt-1">
                                <div className="text-left">
                                    <div className="text-xl font-bold text-white leading-none">JOIN</div>
                                    <div className="text-xl font-bold text-white leading-none mb-1">THE BATTLE</div>
                                    <div className="text-[10px] text-gray-500">Compete. Win. Dominate.</div>
                                </div>
                                <div className="bg-white p-1 rounded-lg">
                                    <QrCode className="text-black" size={32} />
                                    <div className="text-[6px] text-center font-bold mt-0.5">SCAN TO ENTER</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Referral Link */}
                        <div className="space-y-2">
                            <div className="bg-[#14141e] p-2 rounded-lg border border-gray-800 flex items-center justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] text-gray-500 mb-0.5">Referral Link</div>
                                    <div className="text-xs text-gray-300 truncate font-mono">
                                        https://2c5a55c9-3293-42f1-8cfc-a351a587b728-v2-...
                                    </div>
                                </div>
                                <Button 
                                    size="icon" 
                                    className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-black h-8 w-8 shrink-0 rounded-md"
                                    onClick={handleCopyReferral}
                                >
                                    <Copy size={14} />
                                </Button>
                            </div>
                        </div>
                        
                        {/* Social Actions */}
                        <div className="grid grid-cols-4 gap-2 pt-1">
                            <div className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                                    <Download size={18} className="text-gray-400 group-hover:text-white" />
                                </div>
                                <span className="text-[10px] text-gray-500 uppercase group-hover:text-white transition-colors">Save</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-[#1DA1F2]/20 transition-colors">
                                    <Twitter size={18} className="text-gray-400 group-hover:text-[#1DA1F2]" />
                                </div>
                                <span className="text-[10px] text-gray-500 uppercase group-hover:text-[#1DA1F2] transition-colors">Twitter</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-[#0088cc]/20 transition-colors">
                                    <Send size={18} className="text-gray-400 group-hover:text-[#0088cc]" />
                                </div>
                                <span className="text-[10px] text-gray-500 uppercase group-hover:text-[#0088cc] transition-colors">Telegram</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-[#1877F2]/20 transition-colors">
                                    <Facebook size={18} className="text-gray-400 group-hover:text-[#1877F2]" />
                                </div>
                                <span className="text-[10px] text-gray-500 uppercase group-hover:text-[#1877F2] transition-colors">Facebook</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        {/* Chart Area */}
        <div className="w-full bg-[#0D0D0D] border border-gray-800 rounded-xl p-6 mb-8 h-[400px] relative overflow-hidden">
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
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} domain={[0, 100]} />
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }} 
                    />
                    <ReferenceLine y={0} stroke="#374151" strokeDasharray="3 3" />
                    
                    {BOTS.map((bot) => (
                        <Line
                            key={bot.id}
                            type="monotone"
                            dataKey={`bot_${bot.id}`}
                            stroke={bot.color}
                            strokeWidth={hoveredBotId === bot.id ? 4 : (hoveredBotId ? 1 : 2.5)}
                            dot={(props) => <CustomDot {...props} onHover={handleDotHover} onLeave={handleMouseLeave} hoveredBotId={hoveredBotId} />}
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

        {/* Top 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BOTS.map((bot) => (
                <div 
                    key={bot.id}
                    className={`
                        relative group rounded-xl p-4 transition-all duration-300 border
                        ${bot.rank === 1 
                            ? 'bg-gradient-to-b from-[#F59E0B]/15 to-[#0D0D0D] border-[#F59E0B]/30 hover:border-[#F59E0B]/60' 
                            : bot.rank === 2 
                                ? 'bg-gradient-to-b from-[#D1D5DB]/15 to-[#0D0D0D] border-[#D1D5DB]/30 hover:border-[#D1D5DB]/60' 
                                : bot.rank === 3 
                                    ? 'bg-gradient-to-b from-[#B45309]/15 to-[#0D0D0D] border-[#B45309]/30 hover:border-[#B45309]/60' 
                                    : 'bg-[#0D0D0D] border-gray-800 hover:border-[#F59E0B]/30'}
                        hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                    `}
                    onMouseEnter={(e) => {
                        setHoveredBotId(bot.id);
                        handleCardHover(bot.id, e);
                    }}
                    onMouseLeave={() => {
                        setHoveredBotId(null);
                        handleMouseLeave();
                    }}
                    onClick={() => window.location.href = `/bot/${bot.id}`}
                >
                    {/* Rank Badge */}
                    <div className={`
                        absolute top-0 left-0 w-8 h-8 flex items-center justify-center rounded-br-xl rounded-tl-xl font-bold font-mono z-10
                        ${bot.rank === 1 ? 'bg-[#F59E0B] text-black' : 
                          bot.rank === 2 ? 'bg-[#D1D5DB] text-black' :
                          bot.rank === 3 ? 'bg-[#B45309] text-white' :
                          'bg-gray-800 text-gray-400 group-hover:bg-[#F59E0B] group-hover:text-black transition-colors'}
                    `}>
                        #{bot.rank}
                    </div>

                    {/* Crown for Top 3 */}
                    {bot.rank <= 3 && (
                        <div className="absolute top-3 right-3 z-10">
                            <Crown 
                                size={24} 
                                className={
                                    bot.rank === 1 ? "text-[#F59E0B]" : 
                                    (bot.rank === 2 ? "text-gray-300" : "text-amber-700")
                                } 
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-col items-center text-center mt-4 space-y-4">
                        {/* Avatar */}
                        <div 
                            className="w-20 h-20 rounded-full p-1 cursor-pointer transition-transform group-hover:scale-105"
                            style={{ border: `2px solid ${bot.color}` }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setHoveredBotId(bot.id);
                            }}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden bg-black">
                                <ImageWithFallback src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Name */}
                        <h3 className="text-lg font-bold text-white leading-tight h-12 flex items-center justify-center line-clamp-2">
                            {bot.name}
                        </h3>

                        {/* Core Metrics */}
                        <div className="grid grid-cols-2 gap-2 w-full border-t border-gray-800 pt-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase">Score</span>
                                <span className="text-2xl font-bold text-[#F59E0B] font-mono leading-none">
                                    {bot.score.toFixed(1)}
                                </span>
                            </div>
                            <div className="flex flex-col border-l border-gray-800">
                                <span className="text-xs text-gray-500 uppercase">NAV</span>
                                <span className="text-2xl font-bold text-white font-mono leading-none">
                                    ${(bot.aum / 1000).toFixed(0)}k
                                </span>
                            </div>
                        </div>

                        {/* Subscribers Count */}
                        <div className="flex items-center gap-1 text-xs font-mono text-[#0ECB81] bg-[#0ECB81]/10 px-2 py-1 rounded-full">
                            <Users size={12} />
                            {bot.subscribers.toLocaleString()}
                        </div>

                        {/* Subscribe Button */}
                        <Button 
                            className={`
                                w-full font-bold mt-2 transition-all
                                ${bot.rank === 1 
                                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black hover:opacity-90' 
                                    : 'bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90'}
                            `}
                            onClick={(e) => handleSubscribe(bot.id, e)}
                        >
                            <UserPlus size={16} className="mr-2" />
                            Subscribe
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}
