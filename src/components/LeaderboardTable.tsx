import { Check, AlertTriangle, Crown, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface Bot {
  rank: number;
  name: string;
  kol: boolean;
  roi: number;
  pnl: number;
  maxDrawdown: number;
  winRate: number;
  eligible: boolean;
  featured?: boolean;
}

export function LeaderboardTable({ type }: { type: "roi" | "volume" | "safe" }) {
  const bots: Bot[] = [
    {
      rank: 1,
      name: "Alpha_Strategy_Pro",
      kol: true,
      roi: 450.0,
      pnl: 125000,
      maxDrawdown: 12.5,
      winRate: 78.5,
      eligible: true,
      featured: true
    },
    {
      rank: 2,
      name: "Quantum_Trader_X",
      kol: true,
      roi: 312.5,
      pnl: 98500,
      maxDrawdown: 18.2,
      winRate: 72.3,
      eligible: true
    },
    {
      rank: 3,
      name: "DeepAlpha_v2",
      kol: false,
      roi: 287.3,
      pnl: 87200,
      maxDrawdown: 15.8,
      winRate: 69.1,
      eligible: true
    },
    {
      rank: 4,
      name: "GridMaster_Pro",
      kol: true,
      roi: 245.8,
      pnl: 72100,
      maxDrawdown: 22.4,
      winRate: 65.7,
      eligible: false
    },
    {
      rank: 5,
      name: "MomentumKing",
      kol: false,
      roi: 198.2,
      pnl: 58900,
      maxDrawdown: 19.3,
      winRate: 63.2,
      eligible: true
    },
    {
      rank: 6,
      name: "ArbitrageBot_Elite",
      kol: false,
      roi: 176.4,
      pnl: 51200,
      maxDrawdown: 11.2,
      winRate: 82.1,
      eligible: true
    },
    {
      rank: 7,
      name: "Neural_Nets_AI",
      kol: true,
      roi: 165.9,
      pnl: 47800,
      maxDrawdown: 25.6,
      winRate: 59.4,
      eligible: false
    },
    {
      rank: 8,
      name: "HFT_Scalper",
      kol: false,
      roi: 152.3,
      pnl: 43100,
      maxDrawdown: 14.7,
      winRate: 71.8,
      eligible: true
    }
  ];

  const getAvatarColor = (rank: number) => {
    if (rank === 1) return "#F0B90B";
    if (rank === 2) return "#C0C0C0";
    if (rank === 3) return "#CD7F32";
    return "#00F0FF";
  };

  return (
    <div className="space-y-4">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-4 text-sm text-gray-400 uppercase tracking-wider">Rank</th>
              <th className="text-left py-4 px-4 text-sm text-gray-400 uppercase tracking-wider">Bot</th>
              <th className="text-right py-4 px-4 text-sm text-gray-400 uppercase tracking-wider">ROI %</th>
              <th className="text-right py-4 px-4 text-sm text-gray-400 uppercase tracking-wider">PnL</th>
              <th className="text-right py-4 px-4 text-sm text-gray-400 uppercase tracking-wider">Max DD</th>
              <th className="text-right py-4 px-4 text-sm text-gray-400 uppercase tracking-wider">Win Rate</th>
              <th className="text-center py-4 px-4 text-sm text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-center py-4 px-4 text-sm text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((bot) => (
              <tr 
                key={bot.rank}
                className={`border-b border-gray-800 hover:bg-white/5 transition-colors ${
                  bot.featured ? 'border-2 border-[#F0B90B] bg-[#F0B90B]/5' : ''
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {bot.rank <= 3 && <Crown size={16} style={{ color: getAvatarColor(bot.rank) }} />}
                    <span className="font-mono text-lg">{bot.rank}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback style={{ backgroundColor: getAvatarColor(bot.rank) }}>
                        {bot.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{bot.name}</span>
                        {bot.kol && (
                          <Badge className="bg-[#F0B90B] text-black text-xs">KOL</Badge>
                        )}
                        {bot.featured && (
                          <Badge className="bg-gradient-to-r from-[#F0B90B] to-[#FF8C00] text-black text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span 
                    className="font-mono text-lg"
                    style={{ color: bot.roi > 0 ? '#0ECB81' : '#F6465D' }}
                  >
                    +{bot.roi.toFixed(1)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span 
                    className="font-mono"
                    style={{ color: bot.pnl > 0 ? '#0ECB81' : '#F6465D' }}
                  >
                    ${bot.pnl.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-mono text-gray-400">
                    -{bot.maxDrawdown.toFixed(1)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-mono text-gray-300">
                    {bot.winRate.toFixed(1)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  {bot.eligible ? (
                    <Check size={20} className="inline" style={{ color: '#0ECB81' }} />
                  ) : (
                    <AlertTriangle size={20} className="inline" style={{ color: '#F0B90B' }} />
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  <Button 
                    size="sm"
                    className="bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90"
                  >
                    <Copy size={14} className="mr-1" />
                    Copy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Accordion */}
      <div className="md:hidden space-y-2">
        <Accordion type="single" collapsible>
          {bots.map((bot) => (
            <AccordionItem 
              key={bot.rank} 
              value={`bot-${bot.rank}`}
              className={`border border-gray-800 rounded-lg mb-2 overflow-hidden ${
                bot.featured ? 'border-2 border-[#F0B90B]' : ''
              }`}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {bot.rank <= 3 && <Crown size={14} style={{ color: getAvatarColor(bot.rank) }} />}
                      <span className="font-mono">{bot.rank}</span>
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback style={{ backgroundColor: getAvatarColor(bot.rank), fontSize: '0.75rem' }}>
                        {bot.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{bot.name}</span>
                        {bot.featured && (
                          <Badge className="bg-[#F0B90B] text-black text-[0.6rem] px-1 py-0">★</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <span 
                    className="font-mono"
                    style={{ color: bot.roi > 0 ? '#0ECB81' : '#F6465D' }}
                  >
                    +{bot.roi.toFixed(1)}%
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 bg-white/5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">PnL</p>
                    <p 
                      className="font-mono mt-1"
                      style={{ color: bot.pnl > 0 ? '#0ECB81' : '#F6465D' }}
                    >
                      ${bot.pnl.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Max Drawdown</p>
                    <p className="font-mono text-gray-300 mt-1">-{bot.maxDrawdown.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Win Rate</p>
                    <p className="font-mono text-gray-300 mt-1">{bot.winRate.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <div className="mt-1 flex items-center gap-1">
                      {bot.eligible ? (
                        <>
                          <Check size={14} style={{ color: '#0ECB81' }} />
                          <span className="text-xs" style={{ color: '#0ECB81' }}>Qualified</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={14} style={{ color: '#F0B90B' }} />
                          <span className="text-xs" style={{ color: '#F0B90B' }}>Volume Low</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90"
                >
                  <Copy size={14} className="mr-2" />
                  Copy Strategy
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
