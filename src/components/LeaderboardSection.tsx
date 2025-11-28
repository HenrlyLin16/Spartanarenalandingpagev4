import { useState, useEffect } from "react";
import { BotListView } from "./BotListView";
import { Info, Trophy, Zap, Coins, ChevronDown, ChevronUp, AlertTriangle, Clock } from "lucide-react";
import { Progress } from "./ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageProvider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export interface Bot {
  id: string;
  name: string;
  avatar?: string; // Added avatar
  roi: number;
  volume: number;
  aum: number; // This is Current NAV
  featured?: boolean;
  rank: number;
  pnl: number; // Current PnL
  maxDrawdown: number;
  winRate: number;
  eligible: boolean;
  isKOL?: boolean;
  unqualifiedReason?: string;
  
  // New Fields
  score: number;
  maxNav: number;
  maxPnl: number;
  peakTime: string;
  navGrowth7d: number; // 7-day NAV growth
  pnl7dAvg: number; // 7-day Avg PnL
}

export function LeaderboardSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"planA" | "planB" | "planC">("planA");
  const [planCSubTab, setPlanCSubTab] = useState<"volume" | "pnl">("volume"); // Kept for compatibility if needed, or remove if fully replacing
  const [refBotId, setRefBotId] = useState<string | null>(null);
  const [algoCardOpen, setAlgoCardOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("default");

  // Detect URL parameter ?ref_bot={id}
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const botId = params.get('ref_bot');
    if (botId) {
      setRefBotId(botId);
    }
  }, []);

// Mock Data
  const allBots: Bot[] = [
    { 
      id: "leonidas", 
      rank: 0, 
      name: "Leonidas AI", 
      avatar: "https://images.unsplash.com/photo-1750096319146-6310519b5af2?w=100&h=100&fit=crop", 
      roi: 312.5, 
      volume: 8260000, 
      aum: 310000, 
      pnl: 98500, 
      maxDrawdown: 18.2, 
      winRate: 72.3, 
      eligible: true, 
      isKOL: true, 
      score: 97.7, 
      maxNav: 320000, 
      maxPnl: 100000, 
      peakTime: "2025-01-20", 
      navGrowth7d: 8.2, 
      pnl7dAvg: 12000 
    },
    { 
      id: "atlas", 
      rank: 0, 
      name: "Atlas Bot", 
      avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop", 
      roi: 287.3, 
      volume: 21100000, 
      aum: 850000, 
      pnl: 87200, 
      maxDrawdown: 15.8, 
      winRate: 69.1, 
      eligible: true, 
      score: 95.7, 
      maxNav: 900000, 
      maxPnl: 90000, 
      peakTime: "2025-01-18", 
      navGrowth7d: 15.8, 
      pnl7dAvg: 11500 
    },
    { 
      id: "ares", 
      rank: 0, 
      name: "Ares Bot", 
      avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop", 
      roi: 450.0, 
      volume: 15200000, 
      aum: 520000, 
      pnl: 125000, 
      maxDrawdown: 12.5, 
      winRate: 78.5, 
      eligible: true, 
      isKOL: true, 
      score: 95.3, 
      maxNav: 550000, 
      maxPnl: 130000, 
      peakTime: "2025-01-15", 
      navGrowth7d: 12.5, 
      pnl7dAvg: 15000 
    },
    { 
      id: "gladiator", 
      rank: 0, 
      name: "Gladiator V2", 
      avatar: "https://images.unsplash.com/photo-1714668083990-837cc1834d64?w=100&h=100&fit=crop", 
      roi: 85.4, 
      volume: 1200000, 
      aum: 95000, 
      pnl: 28500, 
      maxDrawdown: 15.3, 
      winRate: 60.5, 
      eligible: true, 
      score: 95.0, 
      maxNav: 100000, 
      maxPnl: 30000, 
      peakTime: "2025-01-10", 
      navGrowth7d: 2.4, 
      pnl7dAvg: 2500 
    },
    { 
      id: "spartan_alpha", 
      rank: 0, 
      name: "SPARTANS Alpha", 
      avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=100&h=100&fit=crop", 
      roi: 145.2, 
      volume: 2500000, 
      aum: 150000, 
      pnl: 45200, 
      maxDrawdown: 12.5, 
      winRate: 75.0, 
      eligible: true, 
      score: 92.1, 
      maxNav: 160000, 
      maxPnl: 50000, 
      peakTime: "2025-01-15", 
      navGrowth7d: 4.2, 
      pnl7dAvg: 3500 
    },
    { id: "achilles", rank: 0, name: "Achilles Bot", roi: 245.8, volume: 5800000, aum: 210000, pnl: 72100, maxDrawdown: 22.4, winRate: 65.7, eligible: false, isKOL: true, score: 78.9, maxNav: 250000, maxPnl: 80000, peakTime: "2025-01-10", navGrowth7d: 5.4, pnl7dAvg: 8500 },
    { id: "spartanx", rank: 0, name: "SPARTANSX Bot", roi: 198.2, volume: 12500000, aum: 420000, pnl: 58900, maxDrawdown: 19.3, winRate: 63.2, eligible: true, score: 75.6, maxNav: 450000, maxPnl: 65000, peakTime: "2025-01-22", navGrowth7d: 9.1, pnl7dAvg: 7200 },
    { id: "helios", rank: 0, name: "Helios Bot", roi: 176.4, volume: 4500000, aum: 180000, pnl: 51200, maxDrawdown: 11.2, winRate: 82.1, eligible: true, score: 72.1, maxNav: 200000, maxPnl: 55000, peakTime: "2025-01-12", navGrowth7d: 4.5, pnl7dAvg: 6800 },
    { id: "zeus", rank: 0, name: "Zeus Bot", roi: 165.9, volume: 2930000, aum: 150000, pnl: 47800, maxDrawdown: 25.6, winRate: 59.4, eligible: false, score: 68.5, maxNav: 180000, maxPnl: 50000, peakTime: "2025-01-05", navGrowth7d: -2.1, pnl7dAvg: 5500 },
    { id: "hyperion", rank: 0, name: "Hyperion Bot", roi: 152.3, volume: 13000000, aum: 600000, pnl: 43100, maxDrawdown: 14.7, winRate: 71.8, eligible: true, score: 65.4, maxNav: 650000, maxPnl: 48000, peakTime: "2025-01-19", navGrowth7d: 10.2, pnl7dAvg: 5100 },
    { id: "odysseus", rank: 0, name: "Odysseus Bot", roi: 134.5, volume: 9200000, aum: 350000, pnl: 34500, maxDrawdown: 16.2, winRate: 68.3, eligible: true, score: 62.3, maxNav: 380000, maxPnl: 40000, peakTime: "2025-01-14", navGrowth7d: 6.7, pnl7dAvg: 4500 },
    { id: "perseus", rank: 0, name: "Perseus Bot", roi: -5.7, volume: 80000, aum: 12000, pnl: -200, maxDrawdown: 13.9, winRate: 40.5, eligible: false, score: 30.5, maxNav: 15000, maxPnl: 500, peakTime: "2024-12-25", navGrowth7d: -15.4, pnl7dAvg: -50 },
    { id: "hercules", rank: 0, name: "Hercules Bot", roi: 115.3, volume: 6800000, aum: 280000, pnl: 25300, maxDrawdown: 17.4, winRate: 66.8, eligible: true, score: 58.9, maxNav: 300000, maxPnl: 28000, peakTime: "2025-01-21", navGrowth7d: 5.5, pnl7dAvg: 3200 },
    { id: "titan", rank: 0, name: "Titan Bot", roi: 98.6, volume: 7200000, aum: 290000, pnl: 19800, maxDrawdown: 20.1, winRate: 64.2, eligible: true, score: 55.2, maxNav: 310000, maxPnl: 22000, peakTime: "2025-01-16", navGrowth7d: 3.8, pnl7dAvg: 2800 },
    { id: "hydra", rank: 0, name: "Hydra Scalper", roi: 62.1, volume: 950000, aum: 80000, pnl: 15400, maxDrawdown: 5.1, winRate: 55.2, eligible: true, score: 75.1, maxNav: 85000, maxPnl: 18000, peakTime: "2025-01-08", navGrowth7d: 1.8, pnl7dAvg: 1200 },
    { id: "oracle", rank: 0, name: "Oracle Bot", roi: 45.3, volume: 750000, aum: 65000, pnl: 12100, maxDrawdown: 3.8, winRate: 52.1, eligible: true, score: 68.9, maxNav: 70000, maxPnl: 14000, peakTime: "2025-01-05", navGrowth7d: 1.5, pnl7dAvg: 900 }
  ];

  const getSortedBots = () => {
    let sorted = [...allBots];

    // Calculate Median NAV for Plan B Threshold
    const navs = sorted.map(b => b.aum).sort((a, b) => a - b);
    const mid = Math.floor(navs.length / 2);
    const medianNav = navs.length % 2 !== 0 ? navs[mid] : (navs[mid - 1] + navs[mid]) / 2;
    const planBThreshold = Math.max(500, medianNav * 1.2);

    // Recalculate scores for Plan A (DISABLE for top bots to keep manual scores)
    sorted = sorted.map(bot => {
        // If bot has a manual score (e.g. the top 5), we keep it.
        // Otherwise we recalculate.
        // For simplicity, let's just use the manual score if provided in the array.
        if (bot.score && bot.score > 0) return bot;

        // Base Percentage = (Current NAV / Max Historical NAV) + (Current PnL / Max Historical PnL)
        const navRatio = bot.maxNav > 0 ? bot.aum / bot.maxNav : 0;
        const pnlRatio = bot.maxPnl > 0 ? bot.pnl / bot.maxPnl : 0;
        const basePercentage = navRatio + pnlRatio;
        
        // Final Score = min(Base Percentage, 2.0) * 50
        const score = Math.min(basePercentage, 2.0) * 50;
        
        return { ...bot, score };
    });
    
    // 1. Sort based on active tab and sub-options
    if (activeTab === "planA") {
        // Comprehensive Score Board
        // Sorting: High Score -> High NAV -> High PnL (>=0)
        sorted.sort((a, b) => {
            if (Math.abs(b.score - a.score) > 0.01) return b.score - a.score;
            if (b.aum !== a.aum) return b.aum - a.aum;
            return b.pnl - a.pnl;
        });
    } else if (activeTab === "planB") {
        // NAV Scale Board
        // Filter: NAV >= max(500, Median * 1.2)
        sorted = sorted.filter(bot => bot.aum >= planBThreshold);
        
        // Sort: Descending Current NAV
        sorted.sort((a, b) => b.aum - a.aum);
    } else if (activeTab === "planC") {
        // PnL Absolute Return Board
        // Filter: PnL >= 0
        sorted = sorted.filter(bot => bot.pnl >= 0);
        
        // Sort: Descending Current PnL
        sorted.sort((a, b) => b.pnl - a.pnl);
    }

    // 2. Limits and Eligibility
    if (activeTab === "planB" || activeTab === "planC") {
        sorted = sorted.slice(0, 20); // Top 20 limit
    }

    // 3. Assign Ranks
    sorted = sorted.map((bot, index) => ({
        ...bot,
        rank: index + 1,
    }));

    // 4. KOL Pinning Logic (only if in list)
    if (refBotId) {
      const featuredIndex = sorted.findIndex(bot => bot.id === refBotId || bot.name.toLowerCase().includes(refBotId.toLowerCase()));
      if (featuredIndex !== -1) {
        const featuredBot = { ...sorted[featuredIndex], featured: true };
        sorted.splice(featuredIndex, 1);
        sorted.unshift(featuredBot);
      }
    }

    return { sortedBots: sorted, threshold: planBThreshold };
  };

  const { sortedBots: bots, threshold: navThreshold } = getSortedBots();
  const dataTimestamp = "2025-11-28 14:00";

  return (
    <section className="px-4 py-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
          <div className="flex flex-col sm:flex-row bg-black/40 border border-gray-800 p-1 rounded-xl backdrop-blur-sm w-full lg:w-auto">
            <button
              onClick={() => { setActiveTab("planA"); setSortBy("default"); }}
              className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "planA"
                  ? "bg-[#F59E0B] text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Trophy size={18} />
              Main (Score)
            </button>
            <button
              onClick={() => { setActiveTab("planB"); setSortBy("default"); }}
              className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "planB"
                  ? "bg-[#F59E0B] text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Zap size={18} />
              NAV (Scale)
            </button>
            <button
              onClick={() => { setActiveTab("planC"); setSortBy("default"); }}
              className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "planC"
                  ? "bg-[#F59E0B] text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Coins size={18} />
              PnL (Profit)
            </button>
          </div>
        </div>
        


        {/* Algorithm Explanation Card */}
        <div className="mb-6 bg-white/5 border border-gray-800 rounded-lg overflow-hidden">
            <Collapsible open={algoCardOpen} onOpenChange={setAlgoCardOpen}>
                <div className="p-4 flex items-start gap-3">
                    <Info className="text-[#F59E0B] mt-1 flex-shrink-0" size={20} />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[#F59E0B] font-bold mb-1">
                                {activeTab === "planA" && "Comprehensive Score Algorithm"}
                                {activeTab === "planB" && "NAV Threshold & Ranking Logic"}
                                {activeTab === "planC" && "PnL Ranking Logic"}
                            </h4>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    {algoCardOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        
                        {activeTab === "planA" && (
                            <>
                                <p className="text-sm text-gray-300 font-mono mb-2">
                                    Score = <span className="text-[#F59E0B]">min[(Current NAV / Max NAV) + (Current PnL / Max PnL), 2.0] × 50</span>
                                </p>
                                {!algoCardOpen && <p className="text-xs text-gray-500 cursor-pointer" onClick={() => setAlgoCardOpen(true)}>Click to view details</p>}
                            </>
                        )}
                        {activeTab === "planB" && (
                            <>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-gray-300 font-mono">
                                        Threshold: <span className="text-[#F59E0B]">NAV ≥ max(500, Median × 120%)</span>
                                    </p>
                                </div>
                                {!algoCardOpen && <p className="text-xs text-gray-500 cursor-pointer" onClick={() => setAlgoCardOpen(true)}>Click to view details</p>}
                            </>
                        )}
                        {activeTab === "planC" && (
                            <>
                                <p className="text-sm text-gray-300 font-mono mb-2">
                                    Requirement: <span className="text-[#F59E0B]">PnL ≥ 0 (Profitable Bots Only)</span>
                                </p>
                                {!algoCardOpen && <p className="text-xs text-gray-500 cursor-pointer" onClick={() => setAlgoCardOpen(true)}>Click to view details</p>}
                            </>
                        )}
                    </div>
                </div>
                
                <CollapsibleContent>
                    <div className="px-4 pb-4 pl-12 text-sm text-gray-400 space-y-2">
                        {activeTab === "planA" && (
                            <>
                                <p>Score Range: 0-100. Tie-breaker: Higher NAV → Higher PnL.</p>
                                <p>Example: Bot A has Current NAV $10k (Max $10k) and Current PnL $2k (Max $4k).</p>
                                <p>Score = min[(10000/10000) + (2000/4000), 2.0] × 50 = min[1 + 0.5, 2.0] × 50 = 75.0</p>
                            </>
                        )}
                        {activeTab === "planB" && (
                            <>
                                <p>Calculates the median NAV of all participants over the last 30 days.</p>
                                <p>Top 20 ranked by total NAV. 7-Day NAV Growth is secondary metric.</p>
                            </>
                        )}
                        {activeTab === "planC" && (
                            <>
                                <p>Only profitable bots (PnL ≥ 0) are eligible.</p>
                                <p>Ranked by absolute PnL. Shows 7-Day Average PnL for stability reference.</p>
                            </>
                        )}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>

        {/* Risk Warning */}
        <div className="mb-6 p-3 bg-[#F59E0B]/5 border border-red-500/50 rounded flex items-start gap-3">
             <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
             <div className="text-xs text-gray-300 space-y-1">
                <p>⚠️ Ranking reflects historical performance only and does not guarantee future returns.</p>
                <p>⚠️ High ranking does not imply low risk; please evaluate strategy risks carefully.</p>
                <p>⚠️ Some bots may use high leverage, carrying significant liquidation risks.</p>
             </div>
        </div>

        {/* Sorting & Meta */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
             <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Sort by:</span>
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-black border border-gray-700 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-[#F59E0B]"
                >
                    {activeTab === "planA" && (
                        <>
                            <option value="default">Score</option>
                            <option value="nav">NAV</option>
                            <option value="pnl">PnL</option>
                        </>
                    )}
                    {activeTab === "planB" && (
                        <>
                            <option value="default">NAV</option>
                            <option value="growth">7-Day Growth</option>
                        </>
                    )}
                    {activeTab === "planC" && (
                        <>
                            <option value="default">7-Day Avg PnL</option>
                            <option value="pnl">Current PnL</option>
                        </>
                    )}
                </select>
             </div>
             <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock size={12} />
                Data as of {dataTimestamp}
             </div>
        </div>

        {/* Content */}
        <BotListView bots={bots} activeTab={activeTab} />
      </div>
    </section>
  );
}
