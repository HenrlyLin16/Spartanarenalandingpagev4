import { useState, Fragment, useRef } from "react";
import { UserPlus, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { SpartanHelmet } from "./SpartanHelmet";
import { BotHoverCard } from "./BotHoverCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageProvider";
import { Bot } from "./LeaderboardSection";
import { FieldTooltip } from "./FieldTooltip";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner@2.0.3";

interface BotListViewProps {
  bots: Bot[];
  activeTab: "planA" | "planB" | "planC";
}

export function BotListView({ bots, activeTab }: BotListViewProps) {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [hoverCard, setHoverCard] = useState<{ botId: string, x: number, y: number } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tooltips = {
      score: { title: "Overall Score", description: "Comprehensive ranking score (0-100) based on performance" },
      nav: { title: "Net Asset Value", description: "Total USDT value of net assets, calculated as: NAV = Subscription + PnL" },
      pnl: { title: "Profit & Loss", description: "Profit or loss amount, calculated as: PnL = Realized PnL + Unrealized PnL" },
      subscribers: { title: "Subscribers", description: "Number of users subscribed to the bot" },
      volume: { title: "Trading Volume", description: "Cumulative trading volume, sum of all executed trades" }
  };

  const handleInfoHover = (botId: string, e: React.MouseEvent) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      setHoverCard({ botId, x, y });
  };

  const handleMouseLeave = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
          setHoverCard(null);
      }, 200);
  };

  const handleCardEnter = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleCardLeave = () => {
      handleMouseLeave();
  };

  const handleSubscribe = (botId: string, e: React.MouseEvent) => {
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-[#FFD700]"; // Gold
    if (score >= 70) return "text-[#00F5A0]"; // Green
    if (score >= 50) return "text-[#FF9500]"; // Orange
    return "text-[#888888]"; // Gray
  };

  return (
    <div className="space-y-3">
      {hoverCard && (
          <BotHoverCard 
              bot={bots.find(b => b.id === hoverCard.botId)} 
              position={{ x: hoverCard.x, y: hoverCard.y }} 
              style={{}}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
          />
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <div 
          className="rounded-2xl overflow-hidden border border-[#F59E0B]/20"
          style={{ background: 'rgba(0, 0, 0, 0.4)' }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-black/40">
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider w-16">Rank</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">Bot Info</th>
                
                <th className={`text-center py-4 px-6 text-xs font-medium uppercase tracking-wider ${activeTab === 'planA' ? 'text-[#F59E0B] font-bold' : 'text-gray-400'}`}>
                    <FieldTooltip data={tooltips.score}>Score</FieldTooltip>
                </th>
                
                <th className="text-right py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <FieldTooltip data={tooltips.nav}>NAV</FieldTooltip>
                </th>

                <th className="text-right py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <FieldTooltip data={tooltips.pnl}>PnL</FieldTooltip>
                </th>

                <th className={`text-center py-4 px-6 text-xs font-medium uppercase tracking-wider ${activeTab === 'planB' ? 'text-[#F59E0B] font-bold' : 'text-gray-400'}`}>
                    <FieldTooltip data={tooltips.subscribers}>Subscribers</FieldTooltip>
                </th>

                <th className={`text-right py-4 px-6 text-xs font-medium uppercase tracking-wider ${activeTab === 'planC' ? 'text-[#F59E0B] font-bold' : 'text-gray-400'}`}>
                     <FieldTooltip data={tooltips.volume}>Volume (USDT)</FieldTooltip>
                </th>
                
                <th className="text-center py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {t('dashboard.col_actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {bots.map((bot) => {
                const isFeatured = bot.featured || bot.isKOL;
                const borderColor = isFeatured ? "#F59E0B" : "#DC2626";
                const isEligible = bot.eligible !== false;
                
                return (
                  <tr
                      key={bot.id || bot.rank}
                      className={`border-b border-gray-800/50 transition-colors hover:bg-white/5 ${isFeatured ? "bg-[#F59E0B]/5" : ""} ${!isEligible ? "opacity-50 bg-gray-900/50" : ""}`}
                      onClick={() => window.location.href = `/bot/${bot.id}`}
                  >
                      {/* Rank */}
                      <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                              {bot.rank <= 3 && isEligible && (
                              <Crown
                                  size={18}
                                  className={bot.rank === 1 ? "text-[#F59E0B]" : (bot.rank === 2 ? "text-gray-300" : "text-amber-700")}
                              />
                              )}
                              <span className={`text-lg font-mono ${bot.rank <= 3 && isEligible ? "font-bold text-white" : "text-gray-400"}`}>{bot.rank}</span>
                          </div>
                      </td>

                      {/* Bot Info */}
                      <td className="py-4 px-6">
                          <div 
                              className="flex items-center gap-4"
                              onMouseEnter={(e) => handleInfoHover(bot.id, e)}
                              onMouseLeave={handleMouseLeave}
                          >
                              <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden relative"
                                  style={{
                                      background: 'rgba(0, 0, 0, 0.6)',
                                      border: `2px solid ${borderColor}`,
                                      boxShadow: isFeatured ? `0 0 10px ${borderColor}30` : 'none'
                                  }}
                              >
                                  {bot.avatar ? (
                                      <ImageWithFallback src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                                  ) : (
                                      <SpartanHelmet className="w-6 h-6" color={borderColor} />
                                  )}
                              </div>
                              <div>
                                  <div className="flex items-center gap-2">
                                      <span className="font-medium text-base text-white">{bot.name}</span>
                                  </div>
                              </div>
                          </div>
                      </td>
                      
                      {/* Score */}
                      <td className="py-4 px-6 text-center">
                          <span className={`font-mono ${activeTab === 'planA' ? `text-xl font-bold ${getScoreColor(bot.score)}` : 'text-gray-400'}`}>
                              {bot.score.toFixed(1)}
                          </span>
                      </td>

                      {/* NAV */}
                      <td className="py-4 px-6 text-right">
                          <span className="text-base font-mono text-gray-300">
                              ${bot.aum.toLocaleString()}
                          </span>
                      </td>

                      {/* PnL */}
                      <td className="py-4 px-6 text-right">
                            <span className={`text-base font-mono ${bot.pnl > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                              {bot.pnl > 0 ? '+' : ''}${bot.pnl.toLocaleString()}
                          </span>
                      </td>

                      {/* Subscribers */}
                      <td className="py-4 px-6 text-center">
                          <span className={`font-mono ${activeTab === 'planB' ? 'text-xl font-bold text-[#F59E0B]' : 'text-gray-400'}`}>
                              {bot.subscribers?.toLocaleString() || 0}
                          </span>
                      </td>

                      {/* Volume */}
                      <td className="py-4 px-6 text-right">
                            <span className={`font-mono ${activeTab === 'planC' ? 'text-xl font-bold text-[#F59E0B]' : 'text-gray-300'}`}>
                              ${bot.volume?.toLocaleString() || 0}
                          </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                              <Button
                                  size="sm"
                                  className="h-8 bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 border-none font-medium"
                                  onClick={(e) => handleSubscribe(bot.id, e)}
                              >
                                  <UserPlus size={14} className="mr-1" />
                                  Subscribe
                              </Button>
                          </div>
                      </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile List View - Refined to match Bybit style */}
      <div className="md:hidden">
        {bots.map((bot) => {
           const isFeatured = bot.featured || bot.isKOL;
           const isEligible = bot.eligible !== false;
           const borderColor = isFeatured ? "#F59E0B" : "#DC2626";

           return (
             <div 
                key={bot.id}
                className="py-3 border-b border-gray-800/50 last:border-0"
                onClick={() => window.location.href = `/bot/${bot.id}`}
             >
                 {/* Top Row: Rank + Name + Subscribe Button */}
                 <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 flex items-center justify-center text-xs font-bold font-mono rounded ${bot.rank <= 3 ? 'bg-[#F59E0B] text-black' : 'bg-gray-800 text-gray-400'}`}>
                            #{bot.rank}
                        </div>
                        <div className="flex items-center gap-2">
                            {bot.avatar && (
                                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-700">
                                    <ImageWithFallback src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <span className="font-bold text-white text-sm truncate max-w-[120px]">{bot.name}</span>
                        </div>
                     </div>
                     
                     <Button
                        size="sm"
                        className="h-6 px-3 bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 rounded-full font-bold text-[10px]"
                        onClick={(e) => handleSubscribe(bot.id, e)}
                     >
                        Subscribe
                     </Button>
                 </div>
                 
                 {/* Stats Grid - Bybit Style */}
                 <div className="grid grid-cols-3 gap-1 mb-2">
                     {/* Col 1: Score (Primary) */}
                     <div className="flex flex-col">
                         <span className="text-[10px] text-gray-500 mb-0.5 font-medium uppercase scale-90 origin-left">Score</span>
                         <span className={`text-base font-mono font-bold ${getScoreColor(bot.score)}`}>
                             {bot.score.toFixed(1)}
                         </span>
                     </div>
                     
                     {/* Col 2: PnL */}
                     <div className="flex flex-col text-center">
                         <span className="text-[10px] text-gray-500 mb-0.5 font-medium uppercase scale-90">PnL (USDT)</span>
                         <span className={`text-base font-mono font-medium ${bot.pnl >= 0 ? 'text-white' : 'text-white'}`}>
                             {bot.pnl.toLocaleString()}
                         </span>
                     </div>

                     {/* Col 3: Subscribers */}
                     <div className="flex flex-col text-right">
                         <span className="text-[10px] text-gray-500 mb-0.5 font-medium uppercase scale-90 origin-right">Subscribers</span>
                         <span className="text-base font-mono font-medium text-white">
                             {bot.subscribers.toLocaleString()}
                         </span>
                     </div>
                 </div>

                 {/* Bottom Row: Secondary Stats */}
                 <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono">
                     <div className="flex items-center gap-1">
                         <div className="w-1 h-1 rounded-full bg-gray-600" />
                         <span>NAV: ${bot.aum.toLocaleString()}</span>
                     </div>
                     <div className="flex items-center gap-1">
                         <div className="w-1 h-1 rounded-full bg-gray-600" />
                         <span>Vol: ${(bot.volume / 1000).toFixed(0)}K</span>
                     </div>
                 </div>
             </div>
           )
        })}
      </div>
    </div>
  );
}
