import React, { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";
import { cn } from "./ui/utils";
import { Info } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export interface TooltipData {
  title: string;
  formula?: string;
  description: string;
  note?: string;
}

interface FieldTooltipProps {
  data: TooltipData;
  children: React.ReactNode;
  className?: string;
}

export function FieldTooltip({ data, children, className }: FieldTooltipProps) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ContentCard = () => (
    <div className="space-y-2">
      <div className="font-bold text-white text-[14px] leading-tight">
        {data.title}
      </div>
      
      {data.formula && (
        <div className="text-[#FF9500] text-[12px] font-mono bg-black/30 p-1.5 rounded border border-[#FF9500]/20">
          {data.formula}
        </div>
      )}
      
      <div className="text-[#AAAAAA] text-[12px] leading-relaxed">
        <span className="font-medium text-gray-400">{t('common.description')}</span>
        {data.description}
      </div>
      
      {data.note && (
        <div className="text-[#888888] text-[11px] italic mt-1">
          {t('common.note')}{data.note}
        </div>
      )}
    </div>
  );

  const triggerClass = cn(
    "border-b border-dashed border-white/40 cursor-help pb-px transition-colors hover:border-[#FF9500]",
    className
  );

  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <span 
            className={triggerClass}
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              setIsOpen(true);
            }}
          >
            {children}
          </span>
        </DialogTrigger>
        <DialogContent 
          className="w-[90vw] max-w-[320px] bg-[#14141e]/95 backdrop-blur-md border border-[#FF9500] rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.3)] gap-0"
          hideCloseButton={false} // We want the close button
        >
          {/* Hidden title for accessibility */}
          <DialogTitle className="sr-only">{data.title}</DialogTitle>
          <ContentCard />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
           <span className={triggerClass}>
             {children}
           </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          sideOffset={8}
          className="w-[300px] bg-[#14141e]/95 backdrop-blur-md border border-[#FF9500] rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-2"
        >
          <ContentCard />
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-2 h-2 bg-[#14141e] border-r border-b border-[#FF9500] rotate-45" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
