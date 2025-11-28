import { Activity, UserPlus, Crown, CheckCircle, AlertTriangle, Ban } from "lucide-react";
import { Button } from "./ui/button";
import { SpartanHelmet } from "./SpartanHelmet";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageProvider";

interface Bot {
  id?: string;
  name: string;
  roi: number;
  volume: number;
  aum: number;
  featured?: boolean;
  rank: number;
  pnl?: number;
  maxDrawdown?: number;
  winRate?: number;
  eligible?: boolean;
  isKOL?: boolean;
  unqualifiedReason?: string;
}

export function BotCard({ bot }: { bot: Bot }) {
  const { t } = useLanguage();
  const isPositive = bot.roi > 0;
  const isFeatured = bot.featured || bot.isKOL;
  const borderColor = isFeatured ? "#F59E0B" : "#DC2626";
  const isEligible = bot.eligible !== false;
  
  return (
    <div 
      className={`rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm transition-all hover:scale-105 flex flex-col ${!isEligible ? "opacity-60 grayscale-[0.5]" : ""}`}
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        border: `2px solid ${borderColor}`,
        boxShadow: isFeatured ? `0 0 20px ${borderColor}40` : 'none'
      }}
    >
      {/* Rank badge */}
      {bot.rank <= 3 && isEligible && (
        <div className="absolute top-3 left-3">
          <Crown 
            size={20} 
            className={bot.rank === 1 ? "text-[#F59E0B]" : "text-gray-400"}
          />
        </div>
      )}

      {/* KOL/Featured Badge */}
      {isFeatured && (
        <div className="absolute top-3 right-3">
           <Badge className="bg-[#F59E0B] text-black hover:bg-[#F59E0B] border-none">{t('bot_card.featured')}</Badge>
        </div>
      )}

      {/* Helmet Icon */}
      <div className="flex justify-center mb-4 mt-2">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center transition-transform hover:rotate-12"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: `2px solid ${borderColor}`,
            boxShadow: `0 0 15px ${borderColor}30`
          }}
        >
          <SpartanHelmet className="w-12 h-12" color={borderColor} />
        </div>
      </div>

      {/* Bot Name */}
      <h3 className="text-xl text-center mb-1 text-white font-bold truncate" title={bot.name}>
        {bot.name}
      </h3>
      {bot.isKOL && <p className="text-center text-xs text-[#F59E0B] mb-3">{t('bot_card.kol')}</p>}
      {!isEligible && <p className="text-center text-xs text-red-400 mb-3">{bot.unqualifiedReason || t('bot_card.not_qualified')}</p>}

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 bg-white/5 p-3 rounded-lg">
        <div className="text-center">
             <div className="text-xs text-gray-400 uppercase">{t('bot_card.roi')}</div>
             <div 
                className="text-lg font-mono font-bold"
                style={{ color: isPositive ? '#0ECB81' : '#F6465D' }}
            >
                {isPositive ? '+' : ''}{bot.roi.toFixed(1)}%
            </div>
        </div>
        <div className="text-center border-l border-white/10">
             <div className="text-xs text-gray-400 uppercase">AUM</div>
             <div className="text-lg text-gray-300 font-mono">
                ${(bot.aum / 1000).toFixed(1)}k
            </div>
        </div>
      </div>
      
      {/* Volume */}
      <div className="text-center mb-4">
          <span className="text-xs text-gray-500 uppercase mr-2">{t('bot_card.vol')}</span>
          <span className="font-mono text-gray-300">${(bot.volume / 1000000).toFixed(2)}M</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-auto">
        <Button 
          variant="outline"
          size="sm"
          className="flex-1 border-[#F59E0B] text-[#F59E0B] bg-transparent hover:bg-[#F59E0B]/10"
        >
          <Activity size={14} className="mr-1" />
          {t('bot_card.btn_activity')}
        </Button>
        <Button 
          size="sm"
          className="flex-1 bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 border-none font-medium"
        >
          <UserPlus size={14} className="mr-1" />
          {t('bot_card.btn_subscribe')}
        </Button>
      </div>
    </div>
  );
}