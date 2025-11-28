import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Info, TrendingUp, Copy } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface UserBot {
  id: string;
  name: string;
  avatarUrl?: string;
  roi: number;
  pnl: number;
  aum: number;
  volume: number;
  rankA: number | null; // ROI Rank
  rankB: number | null; // Volume Rank
  rankC_vol: number | null; // Plan C Volume Rank
  rankC_pnl: number | null; // Plan C PnL Rank
  status: "active" | "pending" | "disqualified" | "insufficient_vol";
}

export function MyBotsDashboard() {
  const { t } = useLanguage();
  // Simulation of user state - this would come from auth context
  const [hasBots, setHasBots] = useState(true); 
  
  // Mock data
  const [myBots, setMyBots] = useState<UserBot[]>([
    {
      id: "bot_12345",
      name: "Spartacus Alpha",
      avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
      roi: 45.2,
      pnl: 3240.50,
      aum: 25000.00,
      volume: 124500,
      rankA: 12,
      rankB: 45,
      rankC_vol: 20,
      rankC_pnl: 8,
      status: "active"
    },
    {
      id: "bot_67890",
      name: "Leonidas V2",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      roi: -2.1,
      pnl: -120.00,
      aum: 5000.00,
      volume: 5000,
      rankA: null,
      rankB: null,
      rankC_vol: null,
      rankC_pnl: null,
      status: "insufficient_vol"
    }
  ]);

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // In real app, fetch updated data here
      console.log("Refreshing dashboard data...");
    }, 30000); // 30s refresh
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: UserBot['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/50">{t('dashboard.status_active')}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50">{t('dashboard.status_pending')}</Badge>;
      case "disqualified":
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50">{t('dashboard.status_disqualified')}</Badge>;
      case "insufficient_vol":
        return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-gray-500/50">{t('dashboard.status_low_vol')}</Badge>;
    }
  };

  if (!hasBots) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <Card className="bg-[#121212] border-[#F59E0B]/20 p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mb-4">
                <Info className="text-[#F59E0B]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t('dashboard.no_bots_title')}</h3>
            <p className="text-gray-400 mb-6">{t('dashboard.no_bots_msg')}</p>
            <Button 
              className="bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90"
              onClick={() => window.open("https://forms.google.com/your-application-form", "_blank")}
            >
                {t('dashboard.create_bot')}
            </Button>
        </Card>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-black/40 backdrop-blur-md border border-[#F59E0B]/20 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#F59E0B]/10 flex justify-between items-center bg-[#F59E0B]/5">
            <h3 className="font-bold text-[#F59E0B] flex items-center gap-2">
                <TrendingUp size={18} />
                {t('dashboard.title')}
            </h3>
            <span className="text-xs text-gray-500">{t('dashboard.auto_refresh')}</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-white/5">
                <th className="p-4 font-medium">{t('dashboard.col_bot_info')}</th>
                <th className="p-4 font-medium">{t('dashboard.col_roi')}</th>
                <th className="p-4 font-medium">{t('dashboard.col_pnl')}</th>
                <th className="p-4 font-medium">AUM (USDT)</th>
                <th className="p-4 font-medium">{t('dashboard.col_valid_vol')}</th>
                <th className="p-4 font-medium">{t('dashboard.col_rank_a')}</th>
                <th className="p-4 font-medium">{t('dashboard.col_rank_b')}</th>
                <th className="p-4 font-medium">Rank C (Vol)</th>
                <th className="p-4 font-medium">Rank C (PnL)</th>
                <th className="p-4 font-medium">{t('dashboard.col_status')}</th>
                <th className="p-4 font-medium text-right">{t('dashboard.col_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {myBots.map((bot) => (
                <tr key={bot.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-4 min-w-[200px]">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-[#F59E0B]/30">
                            <AvatarImage src={bot.avatarUrl} />
                            <AvatarFallback className="bg-[#1a1f2e] text-[#F59E0B]">{bot.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium text-white truncate max-w-[120px]">{bot.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                ID: {bot.id}
                                <Copy size={10} className="cursor-pointer hover:text-[#F59E0B]" />
                            </div>
                        </div>
                    </div>
                  </td>
                  <td className={`p-4 font-mono ${bot.roi >= 0 ? 'text-[#0ECB81]' : 'text-red-500'}`}>
                    {bot.roi >= 0 ? '+' : ''}{bot.roi.toFixed(2)}%
                  </td>
                  <td className={`p-4 font-mono ${bot.pnl >= 0 ? 'text-[#0ECB81]' : 'text-red-500'}`}>
                    {bot.pnl >= 0 ? '+' : ''}{bot.pnl.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-gray-300">
                    ${bot.aum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 font-mono text-gray-300">
                    ${bot.volume.toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-400 font-mono">
                    {bot.rankA ? `#${bot.rankA}` : '-'}
                  </td>
                  <td className="p-4 text-gray-400 font-mono">
                    {bot.rankB ? `#${bot.rankB}` : '-'}
                  </td>
                  <td className="p-4 text-gray-400 font-mono">
                    {bot.rankC_vol ? `#${bot.rankC_vol}` : '-'}
                  </td>
                  <td className="p-4 text-gray-400 font-mono">
                    {bot.rankC_pnl ? `#${bot.rankC_pnl}` : '-'}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(bot.status)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 border-[#F59E0B] text-[#F59E0B] bg-transparent hover:bg-[#F59E0B] hover:text-black hover:border-[#F59E0B] transition-colors"
                        >
                            {t('dashboard.btn_details')}
                        </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}