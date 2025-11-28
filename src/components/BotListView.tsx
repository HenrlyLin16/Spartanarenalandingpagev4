import { useState, Fragment, useRef } from "react";
import { Activity, UserPlus, Crown, CheckCircle, AlertCircle, Ban, ChevronDown, ChevronUp, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";
import { SpartanHelmet } from "./SpartanHelmet";
import { BotHoverCard } from "./BotHoverCard";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageProvider";
import { Bot } from "./LeaderboardSection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { FieldTooltip, TooltipData } from "./FieldTooltip";

export function BotListView({ bots, activeTab }: BotListViewProps) {
  const { t } = useLanguage();
  const [expandedBotId, setExpandedBotId] = useState<string | null>(null);
  const [hoverCard, setHoverCard] = useState<{ botId: string, x: number, y: number } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tooltips = {
    planA: {
      score: {
        title: t('tooltips.score.title'),
        formula: t('tooltips.score.formula'),
        description: t('tooltips.score.description')
      },
      nav: {
        title: t('tooltips.nav.title'),
        formula: t('tooltips.nav.formula'),
        description: t('tooltips.nav.description')
      },
      pnl: {
        title: t('tooltips.pnl.title'),
        description: t('tooltips.pnl.description')
      },
      maxDrawdown: {
        title: t('tooltips.max_drawdown.title'),
        description: t('tooltips.max_drawdown.description')
      },
      winRate: {
        title: t('tooltips.win_rate.title'),
        description: t('tooltips.win_rate.description')
      }
    },
    planB: {
      nav: {
        title: t('tooltips.plan_b_nav.title'),
        formula: t('tooltips.plan_b_nav.formula'),
        description: t('tooltips.plan_b_nav.description')
      },
      growth: {
        title: t('tooltips.growth.title'),
        formula: t('tooltips.growth.formula'),
        description: t('tooltips.growth.description')
      },
      aum: {
        title: t('tooltips.aum.title'),
        description: t('tooltips.aum.description')
      }
    },
    planC: {
      currentPnl: {
        title: t('tooltips.current_pnl.title'),
        description: t('tooltips.current_pnl.description')
      },
      avgPnl: {
        title: t('tooltips.avg_pnl.title'),
        description: t('tooltips.avg_pnl.description')
      },
      peakPnl: {
        title: t('tooltips.peak_pnl.title'),
        description: t('tooltips.peak_pnl.description')
      }
    }
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

  const toggleExpand = (botId: string) => {
    setExpandedBotId(expandedBotId === botId ? null : botId);
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
              type={activeTab}
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
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider w-16">
                  Rank
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Bot Info
                </th>
                
                {/* Dynamic Columns based on Tab */}
                {activeTab === "planA" && (
                    <th className="text-center py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <FieldTooltip data={tooltips.planA.score}>Score</FieldTooltip>
                    </th>
                )}
                
                {activeTab === "planB" ? (
                    <>
                         <th className="text-right py-4 px-6 text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                            <FieldTooltip data={tooltips.planB.nav}>Current NAV</FieldTooltip>
                        </th>
                        <th className="text-right py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                            <FieldTooltip data={tooltips.planB.growth}>7D NAV Growth</FieldTooltip>
                        </th>
                    </>
                ) : (
                    <th className="text-right py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <FieldTooltip data={tooltips.planA.nav}>NAV</FieldTooltip>
                    </th>
                )}

                {activeTab === "planC" ? (
                    <>
                        <th className="text-right py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">
                            <FieldTooltip data={tooltips.planC.currentPnl}>Current PnL</FieldTooltip>
                        </th>
                        <th className="text-right py-4 px-6 text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                            <FieldTooltip data={tooltips.planC.avgPnl}>7D Avg PnL</FieldTooltip>
                        </th>
                    </>
                ) : (
                    <th className="text-right py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <FieldTooltip data={tooltips.planA.pnl}>PnL</FieldTooltip>
                    </th>
                )}
                
                <th className="text-center py-4 px-6 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {t('dashboard.col_actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {bots.map((bot) => {
                const isPositive = bot.roi > 0;
                const isFeatured = bot.featured || bot.isKOL;
                const borderColor = isFeatured ? "#F59E0B" : "#DC2626";
                const isEligible = bot.eligible !== false;
                const isExpanded = expandedBotId === bot.id;
                
                return (
                  <Fragment key={bot.id || bot.rank}>
                    <tr
                        className={`border-b border-gray-800/50 transition-colors cursor-pointer ${
                            isFeatured ? "bg-[#F59E0B]/5" : "hover:bg-white/5"
                        } ${!isEligible ? "opacity-50 bg-gray-900/50" : ""} ${isExpanded ? "bg-white/5" : ""}`}
                        onClick={() => toggleExpand(bot.id || "")}
                    >
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
                                {bot.isKOL && (
                                <Badge className="bg-[#F59E0B] text-black text-[10px] px-1.5 h-5 border-none">{t('bot_card.kol')}</Badge>
                                )}
                            </div>
                            {bot.featured && (
                                <span className="text-xs text-[#F59E0B] flex items-center gap-1">{t('bot_card.featured')}</span>
                            )}
                            </div>
                        </div>
                        </td>
                        
                        {/* Plan A Score */}
                        {activeTab === "planA" && (
                            <td className="py-4 px-6 text-center">
                                <span className={`text-xl font-bold font-mono ${getScoreColor(bot.score)}`}>
                                    {bot.score.toFixed(1)}
                                </span>
                            </td>
                        )}

                        {/* NAV Column / Plan B Columns */}
                        {activeTab === "planB" ? (
                            <>
                                <td className="py-4 px-6 text-right">
                                    <span className="text-base font-mono text-[#F59E0B] font-bold">
                                        ${(bot.aum || 0).toLocaleString()}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <span className={`text-xs font-mono ${bot.navGrowth7d >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"} flex items-center justify-end gap-0.5`}>
                                        {bot.navGrowth7d >= 0 ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                                        {Math.abs(bot.navGrowth7d)}%
                                    </span>
                                </td>
                            </>
                        ) : (
                            <td className="py-4 px-6 text-right">
                                <span className="text-base font-mono text-gray-300">
                                    ${(bot.aum || 0).toLocaleString()}
                                </span>
                            </td>
                        )}

                        {/* PnL Column / Plan C Columns */}
                        {activeTab === "planC" ? (
                            <>
                                <td className="py-4 px-6 text-right">
                                     <span className={`text-base font-mono ${(bot.pnl || 0) > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                                        {(bot.pnl || 0) > 0 ? '+' : ''}${(bot.pnl || 0).toLocaleString()}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <span className="text-base font-mono text-[#F59E0B] font-bold">
                                        ${(bot.pnl7dAvg || 0).toLocaleString()}
                                    </span>
                                </td>
                            </>
                        ) : (
                             <td className="py-4 px-6 text-right">
                                <span className={`text-base font-mono ${(bot.pnl || 0) > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                                    {(bot.pnl || 0) > 0 ? '+' : ''}${(bot.pnl || 0).toLocaleString()}
                                </span>
                            </td>
                        )}

                        <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                            <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                            onClick={(e) => { e.stopPropagation(); toggleExpand(bot.id || ""); }}
                            >
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                            <Button
                            size="sm"
                            className="h-8 bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 border-none font-medium"
                            onClick={(e) => e.stopPropagation()}
                            >
                            <UserPlus size={14} className="mr-1" />
                            {t('bot_card.btn_subscribe')}
                            </Button>
                        </div>
                        </td>
                    </tr>
                    {/* Expanded Row Desktop */}
                    {isExpanded && (
                        <tr className="bg-[#F59E0B]/5 border-b border-gray-800/50">
                            <td colSpan={activeTab === "planA" ? 6 : (activeTab === "planB" ? 6 : 6)} className="px-6 py-4">
                                <div className="grid grid-cols-5 gap-8 animate-in fade-in slide-in-from-top-2">
                                    {activeTab === "planA" && (
                                        <div className="col-span-5 flex gap-8 mb-2 p-3 bg-black/20 rounded border border-white/5">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 uppercase">Detailed Score</span>
                                                <span className="text-sm text-[#F59E0B] font-mono">
                                                    [({bot.aum.toLocaleString()} / {bot.maxNav.toLocaleString()}) + ({bot.pnl.toLocaleString()} / {bot.maxPnl.toLocaleString()})] × 50
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-500 uppercase block">
                                            <FieldTooltip data={tooltips.planA.maxDrawdown}>Max Drawdown</FieldTooltip>
                                        </span>
                                        <span className="text-base font-mono text-[#F6465D] font-bold">
                                            {bot.maxDrawdown}%
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-500 uppercase block">
                                            <FieldTooltip data={tooltips.planA.winRate}>Win Rate</FieldTooltip>
                                        </span>
                                        <span className="text-base font-mono text-[#0ECB81]">
                                            {bot.winRate}%
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-500 uppercase block">Peak NAV</span>
                                        <span className="text-base font-mono text-white">
                                            ${bot.maxNav.toLocaleString()}
                                        </span>
                                        <span className="text-[10px] text-gray-500 block">{bot.peakTime}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-500 uppercase block">
                                            <FieldTooltip data={tooltips.planC.peakPnl}>Peak PnL</FieldTooltip>
                                        </span>
                                        <span className="text-base font-mono text-white">
                                            ${bot.maxPnl.toLocaleString()}
                                        </span>
                                        <span className="text-[10px] text-gray-500 block">{bot.peakTime}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-500 uppercase block">
                                            <FieldTooltip data={tooltips.planB.aum}>Volume(USDT)</FieldTooltip>
                                        </span>
                                        <span className="text-base font-mono text-white">
                                            ${(bot.volume / 1000000).toFixed(2)}M
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile List View - Accordion style */}
      <div className="md:hidden space-y-3">
        {bots.map((bot) => {
          const isPositive = bot.roi > 0;
          const isFeatured = bot.featured || bot.isKOL;
          const borderColor = isFeatured ? "#F59E0B" : "#DC2626";
          const isEligible = bot.eligible !== false;
          
          return (
            <details
              key={bot.id || bot.rank}
              className={`rounded-xl overflow-hidden group ${!isEligible ? "opacity-60 grayscale-[0.5]" : ""}`}
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                border: `1px solid ${borderColor}50`,
                boxShadow: isFeatured ? `0 0 15px ${borderColor}20` : 'none'
              }}
            >
              <summary className="p-4 cursor-pointer list-none select-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-shrink-0 w-8">
                      {bot.rank <= 3 && isEligible && (
                        <Crown
                          size={14}
                          className={bot.rank === 1 ? "text-[#F59E0B]" : "text-gray-400"}
                        />
                      )}
                      <span className="font-mono text-gray-400">{bot.rank}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0 truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white truncate">{bot.name}</span>
                         {bot.isKOL && (
                              <Badge className="bg-[#F59E0B] text-black text-[10px] px-1 py-0 h-4 border-none">{t('bot_card.kol')}</Badge>
                         )}
                      </div>
                      {activeTab === "planA" && (
                          <div className="flex items-center gap-1 mt-0.5">
                             <span className="text-[10px] text-gray-500">
                                <FieldTooltip data={tooltips.planA.score}>Score:</FieldTooltip>
                             </span>
                             <span className={`text-xs font-bold ${getScoreColor(bot.score)}`}>{bot.score}</span>
                          </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                         {activeTab === "planA" && (
                            <div className="flex flex-col items-end">
                                <p className="text-xs text-white font-mono">${bot.aum.toLocaleString()}</p>
                                <p className={`text-[10px] font-mono ${bot.pnl > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                                    {bot.pnl > 0 ? '+' : ''}${bot.pnl.toLocaleString()}
                                </p>
                            </div>
                         )}
                         {activeTab === "planB" && (
                            <div className="flex flex-col items-end">
                                <p className="text-xs text-[#F59E0B] font-bold font-mono">${bot.aum.toLocaleString()}</p>
                                <p className={`text-[10px] font-mono ${bot.navGrowth7d >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                                    {bot.navGrowth7d}%
                                </p>
                            </div>
                         )}
                         {activeTab === "planC" && (
                            <div className="flex flex-col items-end">
                                <p className={`text-xs font-bold font-mono ${bot.pnl > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                                    {bot.pnl > 0 ? '+' : ''}${bot.pnl.toLocaleString()}
                                </p>
                                <p className="text-[10px] text-[#F59E0B] font-mono">
                                    Avg: ${bot.pnl7dAvg.toLocaleString()}
                                </p>
                            </div>
                         )}
                    </div>
                    <ChevronDown size={16} className="text-gray-500 group-open:rotate-180 transition-transform" />
                  </div>
                </div>
              </summary>

              <div className="px-4 pb-4 pt-2 bg-white/5 border-t border-white/5">
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  {activeTab === "planA" && (
                      <div className="col-span-2 bg-black/20 p-2 rounded border border-white/5 mb-2">
                         <p className="text-[10px] text-gray-500 mb-1">{t('dashboard.score_algorithm')}</p>
                         <p className="text-xs font-mono text-[#F59E0B]">[(NAV/Max) + (PnL/Max)] × 50</p>
                      </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                        <FieldTooltip data={tooltips.planA.pnl}>Current PnL</FieldTooltip>
                    </p>
                    <p
                      className="font-mono"
                      style={{ color: (bot.pnl || 0) > 0 ? '#0ECB81' : '#F6465D' }}
                    >
                      {(bot.pnl || 0) > 0 ? '+' : ''}${(bot.pnl || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                        <FieldTooltip data={tooltips.planA.nav}>NAV</FieldTooltip>
                    </p>
                    <p className="font-mono text-gray-300">
                      ${(bot.aum || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                        <FieldTooltip data={tooltips.planA.maxDrawdown}>Max Drawdown</FieldTooltip>
                    </p>
                    <p className="font-mono text-[#F6465D]">{(bot.maxDrawdown || 0).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                        <FieldTooltip data={tooltips.planA.winRate}>Win Rate</FieldTooltip>
                    </p>
                    <p className="font-mono text-[#0ECB81]">{bot.winRate}%</p>
                  </div>
                  
                  <div className="col-span-2 flex justify-between border-t border-white/5 pt-2 mt-1">
                      <div>
                          <p className="text-[10px] text-gray-500">Peak NAV</p>
                          <p className="text-xs text-white font-mono">${bot.maxNav.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                          <p className="text-[10px] text-gray-500">
                              <FieldTooltip data={tooltips.planC.peakPnl}>Peak PnL</FieldTooltip>
                          </p>
                          <p className="text-xs text-white font-mono">${bot.maxPnl.toLocaleString()}</p>
                      </div>
                  </div>
                </div>
                
                <Button
                    size="sm"
                    className="w-full bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 border-none font-medium"
                >
                    {t('bot_card.btn_subscribe')}
                </Button>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
