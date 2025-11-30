import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { TopPerformersSection } from "./components/TopPerformersSection";
import { MyDashboard } from "./components/MyDashboard";
import { LeaderboardSection } from "./components/LeaderboardSection";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./components/LanguageProvider";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#F59E0B] selection:text-black">
      {/* Warm background glow effect */}
      <div 
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(180, 83, 9, 0.25) 0%, rgba(0, 0, 0, 0) 60%), radial-gradient(ellipse at 20% 80%, rgba(217, 119, 6, 0.15) 0%, rgba(0, 0, 0, 0) 50%)'
        }}
      />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        
        <main className="flex-grow space-y-6 md:space-y-12 pb-20">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* Top 5 Performers Battle */}
          <div id="top-performers">
            <TopPerformersSection />
          </div>
          
          {/* 2. My Bots Dashboard - Handles its own login state */}
          {isLoggedIn && (
            <div id="my-dashboard">
                <MyDashboard />
            </div>
          )}

          {/* 3. Main Leaderboard */}
          <div id="leaderboard">
            <LeaderboardSection />
          </div>

          {/* 4. Terms and Conditions */}
          <div id="terms-section">
            <TermsAndConditions />
          </div>
        </main>

        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}