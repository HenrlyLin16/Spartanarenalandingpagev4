import { Shield, Globe, Trophy, ChevronDown, Lock, User } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Navigation() {
  const { setLanguage, t } = useLanguage();
  const { isLoggedIn, login, logout } = useAuth();
  
  return (
    <nav className="border-b border-gray-800 bg-[#0D0D0D] sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo + Nav */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <Shield className="w-8 h-8 text-[#F59E0B]" strokeWidth={1.5} />
              <span className="text-xl font-bold text-[#F59E0B]">OneBullEx</span>
            </div>

            {/* Nav Items */}
            <div className="hidden lg:flex items-center gap-8">
              <button className="text-sm font-medium text-gray-300 hover:text-[#F59E0B] transition-colors">
                {t('nav.market')}
              </button>
              <button className="text-sm font-medium text-gray-300 hover:text-[#F59E0B] transition-colors">
                {t('nav.spot')}
              </button>
              <button className="text-sm font-medium text-gray-300 hover:text-[#F59E0B] transition-colors">
                {t('nav.futures')}
              </button>
              <button className="text-sm font-medium text-[#F59E0B] hover:text-[#F59E0B]/80 transition-colors">
                {t('nav.spartans')}
              </button>
              <button className="text-sm font-medium text-gray-300 hover:text-[#F59E0B] transition-colors flex items-center gap-1.5">
                <Trophy size={16} className="text-[#F59E0B]" />
                {t('nav.campaign')}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm font-medium text-gray-300 hover:text-[#F59E0B] transition-colors flex items-center gap-1 outline-none">
                    {t('nav.more')}
                    <ChevronDown size={14} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1f2e] border-gray-800 text-gray-200">
                  <DropdownMenuItem className="hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer">
                    Academy
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer">
                    Blog
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer">
                    Support
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Actions: Auth State Dependent */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-transparent font-medium text-sm"
                    onClick={login}
                >
                  {t('nav.login')}
                </Button>

                <Button 
                    className="bg-gradient-to-r from-[#FFE29F] to-[#FFA940] text-black hover:opacity-90 font-medium px-6 rounded-md flex items-center gap-2 border-none"
                >
                  <Lock size={14} className="text-black/80" />
                  {t('nav.register')}
                </Button>
              </>
            ) : (
              <Button 
                  className="bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 font-medium px-6 rounded-md border-none"
              >
                {t('nav.deposit')}
              </Button>
            )}

            {/* Language Switcher - Icon Only (Always Visible) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-[#F59E0B] hover:text-[#F59E0B]/80 transition-colors outline-none ml-2">
                  <Globe size={20} strokeWidth={1.5} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1a1f2e] border-gray-800 text-gray-200 mt-2">
                <DropdownMenuItem 
                  className="hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer focus:bg-[#F59E0B]/10 focus:text-[#F59E0B]"
                  onClick={() => setLanguage('en')}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer focus:bg-[#F59E0B]/10 focus:text-[#F59E0B]"
                  onClick={() => setLanguage('zh')}
                >
                  简体中文
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar (Only when logged in) */}
            {isLoggedIn && (
              <button 
                onClick={logout}
                className="ml-2 w-9 h-9 rounded-full bg-[#F59E0B] flex items-center justify-center text-black hover:opacity-90 transition-opacity"
                title="Click to Logout (Demo)"
              >
                 <User size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}