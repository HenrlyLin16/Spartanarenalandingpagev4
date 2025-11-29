import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Target, 
  RefreshCw, 
  Inbox, 
  Bot,
  Activity,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "./ui/utils";
import { useAuth } from "./AuthProvider";
import { BotHoverCard } from "./BotHoverCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FieldTooltip } from "./FieldTooltip";

// Mock Data Types
interface Subscription {
  id: string;
  rank: number;
  rankChange: number;
  name: string;
  creator: string;
  avatar: string;
  score: number;
  nav: number;
  pnl: number;
  subscribers: number;
  volume: number;
  status: "active" | "unsubscribed";
  maxNav?: number;
  maxPnl?: number;
}

interface MyBot {
  id: string;
  rank: number | null;
  name: string;
  avatar: string;
  score: number;
  nav: number;
  pnl: number;
  subscribers: number;
  volume: number;
  status: "on_leaderboard" | "eligible" | "pending" | "disqualified";
  maxNav?: number;
  maxPnl?: number;
}

// Mock Data
const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub1",
    rank: 1,
    rankChange: 2,
    name: "Alpha Hunter V2",
    creator: "AlexTrader",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    score: 98.5,
    nav: 1250.45,
    pnl: 145.20,
    subscribers: 1250,
    volume: 1250000,
    status: "active",
    maxNav: 1300,
    maxPnl: 200,
  },
  {
    id: "sub2",
    rank: 4,
    rankChange: -1,
    name: "Steady Gains",
    creator: "CryptoWhale",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    score: 92.1,
    nav: 1050.20,
    pnl: -12.50,
    subscribers: 890,
    volume: 850000,
    status: "active",
    maxNav: 1100,
    maxPnl: 50,
  }
];

const MOCK_MY_BOTS: MyBot[] = [
  {
    id: "bot1",
    rank: 7,
    name: "Spartan Strategy A",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    score: 89.5,
    nav: 1120.50,
    pnl: 85.20,
    subscribers: 128,
    volume: 450000,
    status: "on_leaderboard",
    maxNav: 1200,
    maxPnl: 100,
  },
  {
    id: "bot2",
    rank: null,
    name: "Beta Tester X",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    score: 75.2,
    nav: 980.00,
    pnl: -20.00,
    subscribers: 5,
    volume: 12000,
    status: "pending",
    maxNav: 1000,
    maxPnl: 0,
  }
];

export function MyDashboard() {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"subscriptions" | "bots">("subscriptions");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(0);
  
  // Hover Card State
  const [hoverCard, setHoverCard] = useState<{ bot: any, x: number, y: number } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tooltips = {
      score: { title: "Overall Score", description: "Comprehensive ranking score (0-100) based on performance" },
      nav: { title: "Net Asset Value", description: "Total USDT value of net assets, calculated as: NAV = Subscription + PnL" },
      pnl: { title: "Profit & Loss", description: "Profit or loss amount, calculated as: PnL = Realized PnL + Unrealized PnL" },
      subscribers: { title: "Subscribers", description: "Number of users subscribed to the bot" },
      volume: { title: "Trading Volume", description: "Cumulative trading volume, sum of all executed trades" }
  };

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(prev => prev + 0.5);
    }, 30000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(0);
    }, 1000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val).replace('$', '');
  };

  // Hover Handlers
  const handleMouseEnter = (bot: any, e: React.MouseEvent) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      setHoverCard({ bot, x, y });
  };

  const handleMouseLeave = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
          setHoverCard(null);
      }, 200);
  };

  // If not logged in, return null (handled by parent)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      {hoverCard && (
          <BotHoverCard 
              bot={hoverCard.bot} 
              position={{ x: hoverCard.x, y: hoverCard.y }} 
              onMouseEnter={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
          />
      )}

      <div className="bg-[#14141e]/80 backdrop-blur-[8px] border border-white/10 rounded-2xl p-6 md:p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-transparent bg-clip-text flex items-center gap-3">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-[#FF8C00]" />
              My Dashboard
            </h2>
            <p className="text-[#9CA3AF] mt-1 text-sm md:text-base">Track your subscriptions and creations</p>
          </div>
          
          <div></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-white/10 mb-6 gap-2">
          <div className="flex overflow-x-auto scrollbar-hide w-full md:w-auto">
            <button
              onClick={() => setActiveTab("subscriptions")}
              className={cn(
                "relative px-6 py-4 text-sm md:text-base font-medium transition-colors whitespace-nowrap",
                activeTab === "subscriptions" ? "text-[#FF8C00]" : "text-[#9CA3AF] hover:text-white"
              )}
            >
              My Subscriptions <span className="ml-1 opacity-70">({MOCK_SUBSCRIPTIONS.length})</span>
              {activeTab === "subscriptions" && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]" 
                />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab("bots")}
              className={cn(
                "relative px-6 py-4 text-sm md:text-base font-medium transition-colors whitespace-nowrap",
                activeTab === "bots" ? "text-[#FF8C00]" : "text-[#9CA3AF] hover:text-white"
              )}
            >
              My Bots <span className="ml-1 opacity-70">({MOCK_MY_BOTS.length})</span>
              {activeTab === "bots" && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]" 
                />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 whitespace-nowrap pb-2 md:pb-0 md:pr-2">
              <Clock size={12} />
              Data as of 2025-11-29 14:00
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "subscriptions" ? (
            <motion.div
              key="subscriptions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {MOCK_SUBSCRIPTIONS.length > 0 ? (
                <div className="space-y-4">
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider w-16">Rank</th>
                          <th className="text-left py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Bot Info</th>
                          
                          <th className="text-center py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.score}>Score</FieldTooltip>
                          </th>
                          
                          <th className="text-right py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.nav}>NAV</FieldTooltip>
                          </th>
                          
                          <th className="text-right py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.pnl}>PnL</FieldTooltip>
                          </th>
                          
                          <th className="text-center py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.subscribers}>Subscribers</FieldTooltip>
                          </th>
                          
                          <th className="text-right py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.volume}>Volume (USDT)</FieldTooltip>
                          </th>
                          
                          <th className="text-center py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_SUBSCRIPTIONS.map((sub) => (
                          <tr 
                            key={sub.id} 
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            onClick={() => window.location.href = `/bot/${sub.id}`}
                          >
                            {/* Rank */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-lg">{sub.rank}</span>
                              </div>
                            </td>

                            {/* Bot Info */}
                            <td className="py-4 px-6">
                              <div 
                                className="flex items-center gap-3"
                                onMouseEnter={(e) => handleMouseEnter(sub, e)}
                                onMouseLeave={handleMouseLeave}
                              >
                                <div className="w-10 h-10 rounded-full border border-[#FF8C00]/20 overflow-hidden">
                                   <ImageWithFallback src={sub.avatar} alt={sub.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="text-white font-bold text-base cursor-pointer hover:underline">{sub.name}</div>
                                </div>
                              </div>
                            </td>

                            {/* Score */}
                            <td className="py-4 px-6 text-center">
                              <span className="text-[#FF8C00] font-bold text-lg">{sub.score.toFixed(1)}</span>
                            </td>

                            {/* NAV */}
                            <td className="py-4 px-6 text-right">
                              <span className="text-white font-mono">{formatCurrency(sub.nav)}</span>
                            </td>

                            {/* PnL */}
                            <td className="py-4 px-6 text-right">
                              <span className={cn("font-mono", sub.pnl >= 0 ? "text-[#10B981]" : "text-[#EF4444]")}>
                                {sub.pnl >= 0 ? "+" : ""}{formatCurrency(sub.pnl)}
                              </span>
                            </td>

                            {/* Subscribers */}
                            <td className="py-4 px-6 text-center">
                              <span className="text-white">{sub.subscribers.toLocaleString()}</span>
                            </td>

                            {/* Volume */}
                            <td className="py-4 px-6 text-right">
                              <span className="text-white font-mono">${(sub.volume / 1000).toFixed(0)}K</span>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-center">
                              <Button 
                                size="sm" 
                                className="h-8 font-bold transition-all px-4 bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.location.href = `/bot/${sub.id}?action=subscribe`;
                                }}
                              >
                                Subscribe
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile List View */}
                  <div className="md:hidden space-y-4">
                    {MOCK_SUBSCRIPTIONS.map((sub) => (
                      <div key={sub.id} className="bg-[#1e1e28] rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                           <div className="flex items-center gap-3">
                              <span className="text-white font-bold text-lg">#{sub.rank}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full border border-[#FF8C00]/20 overflow-hidden">
                                   <ImageWithFallback src={sub.avatar} alt={sub.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-white font-bold text-sm">{sub.name}</span>
                              </div>
                           </div>
                           <span className="text-[#FF8C00] font-bold">{sub.score.toFixed(1)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                           <div className="flex justify-between">
                             <span className="text-[#9CA3AF]">NAV</span>
                             <span className="text-white font-mono">{formatCurrency(sub.nav)}</span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-[#9CA3AF]">PnL</span>
                             <span className={cn("font-mono", sub.pnl >= 0 ? "text-[#10B981]" : "text-[#EF4444]")}>
                               {sub.pnl >= 0 ? "+" : ""}{formatCurrency(sub.pnl)}
                             </span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-[#9CA3AF]">Subs</span>
                             <span className="text-white">{sub.subscribers.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-[#9CA3AF]">Vol</span>
                             <span className="text-white font-mono">${(sub.volume / 1000).toFixed(0)}K</span>
                           </div>
                        </div>
                        <Button 
                           className="w-full h-9 font-bold bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90"
                           onClick={(e) => {
                             e.stopPropagation();
                             window.location.href = `/bot/${sub.id}?action=subscribe`;
                           }}
                        >
                           Subscribe
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                 /* Empty State Subscriptions */
                 <div className="flex flex-col items-center justify-center py-16 text-center">
                   <Inbox className="w-20 h-20 text-gray-600 mb-4" />
                   <h3 className="text-xl text-white font-bold mb-2">No Subscriptions Yet</h3>
                   <p className="text-[#9CA3AF] mb-6">Browse the leaderboard below to find top performing bots.</p>
                   <Button 
                     onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
                     className="bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-white font-semibold h-12 px-8"
                   >
                     Explore Leaderboard
                   </Button>
                 </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="bots"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {MOCK_MY_BOTS.length > 0 ? (
                <div className="space-y-4">
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider w-16">Rank</th>
                          <th className="text-left py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Bot Info</th>
                          
                          <th className="text-center py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.score}>Score</FieldTooltip>
                          </th>
                          
                          <th className="text-right py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.nav}>NAV</FieldTooltip>
                          </th>
                          
                          <th className="text-right py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.pnl}>PnL</FieldTooltip>
                          </th>
                          
                          <th className="text-center py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.subscribers}>Subscribers</FieldTooltip>
                          </th>
                          
                          <th className="text-right py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                             <FieldTooltip data={tooltips.volume}>Volume (USDT)</FieldTooltip>
                          </th>
                          
                          <th className="text-center py-4 px-6 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_MY_BOTS.map((bot) => (
                          <tr 
                            key={bot.id} 
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            onClick={() => window.location.href = `/bot/${bot.id}`}
                          >
                            {/* Rank */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-lg">{bot.rank || '-'}</span>
                              </div>
                            </td>

                            {/* Bot Info */}
                            <td className="py-4 px-6">
                              <div 
                                className="flex items-center gap-3"
                                onMouseEnter={(e) => handleMouseEnter(bot, e)}
                                onMouseLeave={handleMouseLeave}
                              >
                                <div className="w-10 h-10 rounded-full border border-[#FF8C00]/20 overflow-hidden">
                                   <ImageWithFallback src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="text-white font-bold text-base cursor-pointer hover:underline">{bot.name}</div>
                                </div>
                              </div>
                            </td>

                            {/* Score */}
                            <td className="py-4 px-6 text-center">
                              <span className="text-[#FF8C00] font-bold text-lg">{bot.score.toFixed(1)}</span>
                            </td>

                            {/* NAV */}
                            <td className="py-4 px-6 text-right">
                              <span className="text-white font-mono">{formatCurrency(bot.nav)}</span>
                            </td>

                            {/* PnL */}
                            <td className="py-4 px-6 text-right">
                              <span className={cn("font-mono", bot.pnl >= 0 ? "text-[#10B981]" : "text-[#EF4444]")}>
                                {bot.pnl >= 0 ? "+" : ""}{formatCurrency(bot.pnl)}
                              </span>
                            </td>

                            {/* Subscribers */}
                            <td className="py-4 px-6 text-center">
                              <span className="text-white">{bot.subscribers.toLocaleString()}</span>
                            </td>

                            {/* Volume */}
                            <td className="py-4 px-6 text-right">
                              <span className="text-white font-mono">${(bot.volume / 1000).toFixed(0)}K</span>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-center">
                              <Button 
                                variant="outline" 
                                className="border-[#F59E0B] text-[#F59E0B] bg-transparent hover:bg-[#F59E0B]/10 h-8 px-4"
                              >
                                Activity
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile List View */}
                  <div className="md:hidden space-y-4">
                    {MOCK_MY_BOTS.map((bot) => (
                      <div key={bot.id} className="bg-[#1e1e28] rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                           <div className="flex items-center gap-3">
                              <span className="text-white font-bold text-lg">{bot.rank || '-'}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full border border-[#FF8C00]/20 overflow-hidden">
                                   <ImageWithFallback src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-white font-bold text-sm">{bot.name}</span>
                              </div>
                           </div>
                           <span className="text-[#FF8C00] font-bold">{bot.score.toFixed(1)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                           <div className="flex justify-between">
                             <span className="text-[#9CA3AF]">NAV</span>
                             <span className="text-white font-mono">{formatCurrency(bot.nav)}</span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-[#9CA3AF]">PnL</span>
                             <span className={cn("font-mono", bot.pnl >= 0 ? "text-[#10B981]" : "text-[#EF4444]")}>
                               {bot.pnl >= 0 ? "+" : ""}{formatCurrency(bot.pnl)}
                             </span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-[#9CA3AF]">Subs</span>
                             <span className="text-white">{bot.subscribers.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-[#9CA3AF]">Vol</span>
                             <span className="text-white font-mono">${(bot.volume / 1000).toFixed(0)}K</span>
                           </div>
                        </div>
                        <Button 
                           variant="outline" 
                           className="w-full h-9 border-[#F59E0B] text-[#F59E0B] bg-transparent hover:bg-[#F59E0B]/10"
                        >
                           Activity
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Empty State Bots */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Bot className="w-20 h-20 text-gray-600 mb-4" />
                  <h3 className="text-xl text-white font-bold mb-2">No Bots Created Yet</h3>
                  <p className="text-[#9CA3AF] mb-6">Ready to showcase your trading strategy?</p>
                  <Button 
                    className="bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-white font-semibold h-12 px-8"
                  >
                    Create Bot
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
