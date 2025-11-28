import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";

interface Subscription {
  id: string;
  uid: string;
  botName: string;
  amount: number;
  currency: string;
}

const BOT_NAMES = [
  "SPARTANS Alpha", "Leonidas AI", "Gladiator V2", "Hydra Scalper", "Oracle Bot", 
  "Zeus Strategy", "Ares Aggressive", "Athena Safe", "Apollo Trend", "Hermes HFT",
  "Titan X", "Hercules Strong", "Odysseus Macro", "Achilles Shield"
];

const generateMockData = (count: number): Subscription[] => {
  return Array.from({ length: count }).map((_, i) => {
    const uidSuffix = Math.floor(Math.random() * 90 + 10); // 10-99
    const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    // Amount between 100 and 5000, usually rounded to 10 or 100
    let amount = Math.floor(Math.random() * 4900) + 100; 
    if (amount > 1000) amount = Math.floor(amount / 100) * 100;
    else amount = Math.floor(amount / 10) * 10;

    return {
      id: `sub-${i}-${Date.now()}`,
      uid: `88***${uidSuffix}`,
      botName,
      amount,
      currency: "USDT"
    };
  });
};

export function LiveTicker() {
  const { t, language } = useLanguage();
  
  // Generate data once
  const subscriptions = useMemo(() => generateMockData(20), []);
  
  // Duplicate for seamless loop
  const displayList = [...subscriptions, ...subscriptions];

  return (
    <div className="w-full bg-black/80 border-y border-white/10 backdrop-blur-md overflow-hidden h-12 flex items-center relative z-20 pause-on-hover">
        {/* Gradient Masks for smooth fade in/out */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
            {displayList.map((sub, index) => (
                <div key={`${sub.id}-${index}`} className="inline-flex items-center mx-6 text-sm font-mono">
                    <span className="text-gray-400 mr-2">UID: {sub.uid}</span>
                    <span className="text-gray-300 mr-2">
                        {language === 'zh' ? '订阅了' : 'Subscribed'}
                    </span>
                    <span className="text-[#F59E0B] font-bold mr-2">[{sub.botName}]</span>
                    <span className="text-[#0ECB81] font-bold">
                        {sub.amount.toLocaleString()} {sub.currency}
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
}
