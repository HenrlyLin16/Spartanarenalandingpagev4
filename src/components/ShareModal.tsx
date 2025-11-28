import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Copy, Check, Download, Share2, Twitter, Facebook, Linkedin, Send, Crown, AlertCircle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { toast } from "sonner@2.0.3";
import { SpartanHelmet } from "./SpartanHelmet";
import { useLanguage } from "./LanguageProvider";

// Mock data for the multi-line chart (7 days)
const CHART_DATA = [
  { day: 1, bot1: 10, bot2: 15, bot3: 8, bot4: 12, bot5: 5 },
  { day: 2, bot1: 25, bot2: 22, bot3: 18, bot4: 15, bot5: 12 },
  { day: 3, bot1: 35, bot2: 45, bot3: 28, bot4: 25, bot5: 18 },
  { day: 4, bot1: 45, bot2: 55, bot3: 40, bot4: 35, bot5: 25 },
  { day: 5, bot1: 60, bot2: 65, bot3: 55, bot4: 42, bot5: 32 },
  { day: 6, bot1: 85, bot2: 78, bot3: 68, bot4: 55, bot5: 45 },
  { day: 7, bot1: 100, bot2: 95, bot3: 85, bot4: 72, bot5: 60 },
];

const BOTS = [
    { id: 1, color: '#00F5A0', avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=32&h=32&fit=crop" },
    { id: 2, color: '#FF9500', avatar: "https://images.unsplash.com/photo-1750096319146-6310519b5af2?w=32&h=32&fit=crop" },
    { id: 3, color: '#8B5CF6', avatar: "https://images.unsplash.com/photo-1714668083990-837cc1834d64?w=32&h=32&fit=crop" },
    { id: 4, color: '#EF4444', avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?w=32&h=32&fit=crop" },
    { id: 5, color: '#EAB308', avatar: "https://images.unsplash.com/photo-1750096319146-6310519b5af2?w=32&h=32&fit=crop" },
];

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export function ShareModal({ isOpen, onClose, shareUrl }: ShareModalProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const SocialButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
    <button 
      className="flex flex-col items-center gap-2 group"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-[#1a1f2e] border border-gray-800 flex items-center justify-center group-hover:bg-[#FF9500] group-hover:border-[#FF9500] transition-all duration-300">
        <Icon size={20} className="text-gray-400 group-hover:text-black transition-colors" />
      </div>
      <span className="text-[10px] text-gray-500 uppercase tracking-wider group-hover:text-[#FF9500] transition-colors">{label}</span>
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0D0D0D] border border-gray-800 text-white w-[90vw] max-w-[420px] p-0 gap-0 rounded-2xl flex flex-col overflow-hidden">
        <DialogHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b border-gray-800/50 shrink-0">
          <DialogTitle className="text-lg font-bold">Share</DialogTitle>
          <DialogDescription className="sr-only">
            Share your referral link and bot performance to earn rewards.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-5 flex flex-col w-full overflow-y-auto max-h-[85vh] scrollbar-hide">
          {/* 1. Poster Card */}
          <div className="w-full flex justify-center">
            {/* Container for 4:5 Aspect Ratio */}
            <div className="relative aspect-[4/5] w-full max-w-[360px] rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-[#0A0A0F] shrink-0 flex flex-col">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(255,149,0,0.15),_transparent_50%)] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_100%_100%,_rgba(0,245,160,0.05),_transparent_50%)] pointer-events-none" />
                
                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full p-5">
                    
                    {/* Header */}
                    <div className="text-center mb-4">
                        <div className="flex items-center justify-center gap-2 mb-1">
                             <Crown size={20} className="text-[#FF9500]" fill="#FF9500" />
                             <h1 className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-[#FFB800] via-[#FF9500] to-[#FFB800] bg-clip-text text-transparent">
                                SPARTANS ARENA
                             </h1>
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">2025 AI Algo Trading Tournament</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="text-center mb-4">
                        <p className="text-[10px] font-bold text-[#FF9500] mb-1 tracking-wide">TOTAL PRIZE POOL</p>
                        <div className="text-4xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] font-mono">
                            $120,000
                        </div>
                        <div className="flex items-center justify-center gap-3 text-xs">
                            <span className="text-white font-medium">300 SPARTANS</span>
                            <span className="w-[1px] h-3 bg-gray-700"></span>
                            <span className="text-[#00F5A0] font-bold">+2,689% ROI</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5A0] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5A0]"></span>
                            </span>
                            <span className="text-[10px] text-[#00F5A0] uppercase tracking-wide font-medium">Live Performance</span>
                        </div>
                    </div>

                    {/* Chart Card */}
                    <div className="w-full h-[120px] bg-[#12121A] rounded-2xl border border-white/5 p-4 mb-4 relative overflow-hidden flex flex-col justify-end shrink-0">
                        <div className="w-full h-full pointer-events-none">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <LineChart data={CHART_DATA} margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
                                    {BOTS.map((bot) => (
                                        <Line 
                                            key={bot.id}
                                            type="monotone" 
                                            dataKey={`bot${bot.id}`} 
                                            stroke={bot.color} 
                                            strokeWidth={2}
                                            dot={false}
                                            isAnimationActive={false} 
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Footer: CTA + QR */}
                    <div className="flex items-end justify-between mt-auto pt-2">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white leading-none mb-1">JOIN<br/>THE BATTLE</h2>
                            <p className="text-[10px] text-gray-400">Compete. Win. Dominate.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-1 rounded-lg shrink-0">
                            <div className="w-12 h-12 bg-black flex items-center justify-center relative overflow-hidden">
                                {/* Simple QR Pattern Simulation */}
                                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-[1px] p-[2px]">
                                    {Array.from({ length: 25 }).map((_, i) => (
                                        <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                                    ))}
                                    {/* Finder Patterns */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-2 border-white bg-black z-10">
                                        <div className="absolute inset-[2px] bg-white"></div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-4 h-4 border-2 border-white bg-black z-10">
                                        <div className="absolute inset-[2px] bg-white"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-2 border-white bg-black z-10">
                                        <div className="absolute inset-[2px] bg-white"></div>
                                    </div>
                                </div>
                            </div>
                            <span className="text-[6px] font-bold text-black mt-0.5 uppercase tracking-tighter">Scan to Enter</span>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[8px] text-gray-600 uppercase tracking-wider">
                        <span>OneBullEX | @OneBullEX_Official</span>
                        <span className="flex items-center gap-1 text-amber-900/60"><AlertCircle size={8} /> High-risk trading</span>
                    </div>

                </div>
            </div>
          </div>

          {/* 2. Input Section */}
          <div className="w-full flex gap-2 items-center bg-[#1a1f2e] p-1.5 rounded-lg border border-gray-800 shrink-0">
             <div className="flex-1 px-2 py-1 overflow-hidden">
                <p className="text-[10px] text-gray-500 mb-0.5">Referral Link</p>
                <p className="text-xs text-gray-300 truncate font-mono select-all">{shareUrl}</p>
             </div>
             <Button 
               size="sm" 
               onClick={handleCopy}
               className={`shrink-0 ${copied ? 'bg-emerald-600 text-white' : 'bg-[#FF9500] text-black hover:bg-[#FF9500]/90'} font-medium h-8 text-xs px-3 transition-all duration-300`}
             >
               {copied ? <Check size={14} /> : <Copy size={14} />}
               <span className="ml-1.5">{copied ? 'Copied' : 'Copy'}</span>
             </Button>
          </div>

          {/* 3. Social Icons */}
          <div className="flex justify-center gap-5 pt-1 pb-1 w-full shrink-0">
             <SocialButton icon={Download} label="Save" onClick={() => toast.success("Image saved (Demo)")} />
             <SocialButton icon={Twitter} label="Twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?text=Join me in SPARTANS ARENA 2025!&url=${encodeURIComponent(shareUrl)}`, '_blank')} />
             <SocialButton icon={Send} label="Telegram" onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=SPARTANS ARENA 2025`, '_blank')} />
             <SocialButton icon={Facebook} label="Facebook" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
