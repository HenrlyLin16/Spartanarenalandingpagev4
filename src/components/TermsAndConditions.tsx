import React from "react";
import { Card } from "./ui/card";
import { ScrollText } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { motion } from "motion/react";

export function TermsAndConditions() {
  const { t } = useLanguage();

  const sections = Array.from({ length: 13 }, (_, i) => `item_${i + 1}`);

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto relative z-10">
      <Card className="bg-gradient-to-br from-[#0D0D0D] to-[#121212] border border-[#F59E0B]/20 backdrop-blur-md overflow-hidden group hover:border-[#F59E0B]/40 transition-all duration-300">
        <div className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
              <ScrollText className="w-6 h-6" />
              <h2 className="text-2xl font-bold">{t('terms.title')}</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">{t('terms.last_updated')}</p>
            
            <div className="space-y-8">
              {sections.map((section, idx) => (
                <motion.div 
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-3"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    {t(`terms.${section}_title`)}
                  </h3>
                  <div className="space-y-2 text-sm md:text-base text-gray-400 leading-relaxed pl-4 border-l-2 border-[#F59E0B]/20">
                    <p>{renderTextWithLinks(t(`terms.${section}_content`))}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 text-center mt-8">
                <p className="text-xs text-gray-500">
                    Disclaimer: These terms are subject to change. Please check back regularly for updates.
                </p>
            </div>
          </div>
        </div>
        
        {/* Decorative bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent opacity-30" />
      </Card>
    </section>
  );
}

// Helper to render mock links for specific terms
const renderTextWithLinks = (text: string) => {
  const termsToLink = ['ROI', 'PnL', 'Wash trading', 'KYC'];
  
  const parts = text.split(/(\(ROI\)|\(PnL\)|Wash trading|KYC)/g);
  
  return parts.map((part, i) => {
    if (termsToLink.some(term => part.includes(term)) || part === '(ROI)' || part === '(PnL)') {
      return (
        <span key={i} className="text-[#F59E0B] underline decoration-dotted underline-offset-4 cursor-help hover:text-[#F59E0B]/80 relative group">
            {part}
        </span>
      );
    }
    return part;
  });
};
