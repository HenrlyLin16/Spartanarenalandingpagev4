import { Shield, AlertCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="px-4 py-16 border-t border-gray-800/50 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Risk Warning */}
        <div className="rounded-xl p-6 border border-[#DC2626]/30 bg-[#DC2626]/5">
          <div className="flex items-start gap-3">
            <AlertCircle size={24} className="text-[#DC2626] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-2 text-[#DC2626]">
                {t('footer.risk_warning_title')}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t('footer.risk_warning_content')}
              </p>
            </div>
          </div>
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