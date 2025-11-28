import { CountdownTimer } from "./CountdownTimer";
import { Button } from "./ui/button";
import { Trophy, Users, TrendingUp, Shield, Calendar, BookOpen } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";

export function HeroSection() {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);


  const handleRegisterClick = () => {
    if (!isLoggedIn) {
      // Redirect to signup
      console.log("Redirect to signup");
      window.location.href = "/signup";
    } else {
        // Redirect to portfolio
        console.log("Redirect to portfolio");
        window.location.href = "/portfolio";
    }
  };

  const handleCreateBotClick = () => {
    if (!isLoggedIn) {
        setShowLoginModal(true);
    } else {
        // Redirect to Google Form
        console.log("Redirect to Google Form application");
        window.open("https://forms.google.com/your-application-form", "_blank");
    }
  };

  const handleGuideClick = () => {
    const element = document.getElementById('terms-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative px-4 py-12 md:py-20 overflow-hidden">
       {/* Background decoration */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D97706]/10 rounded-full blur-[80px]" />
       </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Title Group */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-sm font-medium mb-2">
                <Shield size={14} />
                <span>{t('hero.official_tournament')}</span>
              </div>
              
              <h1 
                className="text-5xl md:text-7xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#D97706] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  {t('hero.title')}
                </span>
              </h1>
              
              <div className="text-xl md:text-2xl font-medium text-white flex items-center gap-3">
                <span className="bg-[#F59E0B] text-black px-2 py-0.5 text-lg font-bold rounded">2025</span>
                <span>{t('hero.subtitle')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-lg">
                <Calendar size={18} className="text-[#F59E0B]" />
                <span>{t('hero.date')}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 font-bold text-lg px-8 py-6 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
                onClick={handleRegisterClick}
              >
                {!isLoggedIn ? t('hero.register_now') : t('hero.my_assets')}
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className={`border-2 font-bold text-lg px-8 py-6 transition-all ${
                    !isLoggedIn 
                    ? "border-gray-700 text-gray-500 hover:bg-gray-800" // Greyed out style
                    : "border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/10"
                }`}
                onClick={handleCreateBotClick}
              >
                {t('hero.create_bot')}
              </Button>

              <Button
                  size="lg"
                  className="bg-transparent border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black font-bold text-lg px-6 py-6 transition-all aspect-square"
                  onClick={handleGuideClick}
                  title="Guide & Terms"
              >
                  <BookOpen size={24} />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-mono font-bold text-[#F59E0B]">$120K</div>
                <div className="text-xs text-gray-400 flex items-center gap-1 sm:justify-start justify-center">
                    <Trophy size={12} /> {t('hero.prize_pool')}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-mono font-bold text-white">300</div>
                <div className="text-xs text-gray-400 flex items-center gap-1 sm:justify-start justify-center">
                    <Users size={12} /> {t('hero.spartans')}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-mono font-bold text-[#0ECB81]">+450%</div>
                <div className="text-xs text-gray-400 flex items-center gap-1 sm:justify-start justify-center">
                    <TrendingUp size={12} /> {t('hero.top_roi')}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Countdown */}
          <div className="flex justify-center lg:justify-end relative">
             {/* Decorative Helmet Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#F59E0B]/5 blur-3xl rounded-full -z-10" />
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="bg-[#1a1f2e] border-[#F59E0B]/20 text-white">
            <DialogHeader>
                <DialogTitle>{t('hero.login_required')}</DialogTitle>
                <DialogDescription>
                    {t('hero.login_msg')}
                </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-4">
                <Button variant="ghost" onClick={() => setShowLoginModal(false)}>{t('hero.cancel')}</Button>
                <Button className="bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90" onClick={() => window.location.href = '/login'}>{t('hero.login_now')}</Button>
            </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
