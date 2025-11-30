import { Shield, AlertCircle, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useLanguage } from "./LanguageProvider";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export function Footer() {
  const { t } = useLanguage();
  const [isRiskExpanded, setIsRiskExpanded] = useState(false);

  return (
    <footer className="px-4 py-16 border-t border-gray-800/50 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Risk Warning - Optimized for Mobile */}
        <div className="rounded-xl p-4 md:p-6 border border-[#DC2626]/30 bg-[#DC2626]/5">
          <Collapsible open={isRiskExpanded} onOpenChange={setIsRiskExpanded}>
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between md:justify-start md:gap-2 cursor-pointer md:cursor-default" onClick={() => setIsRiskExpanded(!isRiskExpanded)}>
                    <h3 className="font-medium text-[#DC2626] text-sm md:text-base">
                      {t('footer.risk_warning_title')}
                    </h3>
                    <CollapsibleTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-[#DC2626] hover:bg-[#DC2626]/10">
                            {isRiskExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>
                    </CollapsibleTrigger>
                </div>
                
                {/* Mobile Content */}
                <div className="md:hidden">
                    {!isRiskExpanded && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1 opacity-80" onClick={() => setIsRiskExpanded(true)}>
                            {t('footer.risk_warning_content')}
                        </p>
                    )}
                    
                    <CollapsibleContent>
                        <p className="text-xs text-gray-400 leading-relaxed mt-2">
                            {t('footer.risk_warning_content')}
                        </p>
                    </CollapsibleContent>
                </div>

                {/* Desktop Content - Always Visible */}
                 <p className="hidden md:block text-sm text-gray-400 leading-relaxed mt-2">
                    {t('footer.risk_warning_content')}
                 </p>
              </div>
            </div>
          </Collapsible>
        </div>

        {/* Help Button with Telegram QR Dialog */}
        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-black font-medium"
              >
                <MessageCircle size={18} className="mr-2" />
                {t('footer.need_help')}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border border-[#F59E0B]/30">
              <DialogHeader>
                <DialogTitle className="text-[#F59E0B]">{t('footer.customer_support')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="text-center">
                  <p className="text-gray-400 mb-4">{t('footer.scan_qr')}</p>
                  {/* Placeholder QR Code - 实际应使用真实的 QR 图片 */}
                  <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                    <div className="text-black text-xs text-center px-4">
                      <MessageCircle size={48} className="mx-auto mb-2" />
                      <p>Telegram QR Code</p>
                      <p className="text-[10px] mt-2">@OneBullExSupport</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">{t('footer.or_contact')}</p>
                  <p className="text-[#F59E0B]">support@onebullex.com</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2 pt-8 border-t border-gray-800/50">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
              <Shield className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold">OneBullEx</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 OneBullEx. {t('footer.rights_reserved')}</p>
          <p className="text-xs text-gray-600">{t('footer.competition_name')}</p>
        </div>
      </div>
    </footer>
  );
}