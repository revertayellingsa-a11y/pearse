import React, { useState, useEffect } from 'react';
import { Menu, Sun, Moon, Users, MessageCircle, ChevronRight, X, Home, Shield, FileText, HelpCircle, ShoppingCart, DollarSign, RefreshCw, Headphones, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GangsterSearchGhostIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Ghost Body */}
    <path d="M 25 180 
             L 25 100 
             A 75 75 0 0 1 175 100 
             L 175 180 
             Q 162.5 200, 150 180 
             T 125 180 
             T 100 180 
             T 75 180 
             T 50 180 
             T 25 180 Z" fill="#FFFC00" />
    
    {/* Black Bandana */}
    <rect x="25" y="60" width="150" height="70" fill="#000000" />
    
    {/* Bandana Knot (right side) */}
    <path d="M 174 95 
             C 195 95, 205 115, 185 125 
             C 180 128, 175 120, 174 115 Z" fill="#000000" />

    {/* Left Eye (Scope) */}
    <circle cx="75" cy="95" r="35" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
    {/* Crosshairs Left */}
    <line x1="40" y1="95" x2="110" y2="95" stroke="#A0A0A0" strokeWidth="2" />
    <line x1="75" y1="60" x2="75" y2="130" stroke="#A0A0A0" strokeWidth="2" />
    {/* Pupil and Glint Left */}
    <circle cx="85" cy="95" r="16" fill="#000000" />
    <circle cx="90" cy="90" r="5" fill="#FFFFFF" />

    {/* Right Eye (Scope) */}
    <circle cx="145" cy="95" r="35" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
    {/* Crosshairs Right */}
    <line x1="110" y1="95" x2="180" y2="95" stroke="#A0A0A0" strokeWidth="2" />
    <line x1="145" y1="60" x2="145" y2="130" stroke="#A0A0A0" strokeWidth="2" />
    {/* Pupil and Glint Right */}
    <circle cx="155" cy="95" r="16" fill="#000000" />
    <circle cx="160" cy="90" r="5" fill="#FFFFFF" />
  </svg>
);

const SnapchatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
  </svg>
);

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'faq' | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFeatureLoading, setIsFeatureLoading] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateSnapchatUsername = (name: string) => {
    // 3 to 15 chars, starts with letter, ends with letter/number
    // allows hyphens, underscores, and periods inside
    const snapchatRegex = /^[A-Za-z][A-Za-z0-9_\-\.]{1,13}[A-Za-z0-9]$/;
    return snapchatRegex.test(name);
  };

  const handleConnect = () => {
    if (username.trim() && !isConnected && !isLoading) {
      if (!validateSnapchatUsername(username.trim())) {
        setError("Please enter a valid Snapchat username");
        return;
      }
      setError(null);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsConnected(true);
      }, 3000);
    }
  };

  const handleFeatureClick = () => {
    if (!isConnected) return;
    setIsFeatureLoading(true);
    setTimeout(() => {
      setIsFeatureLoading(false);
      setShowCaptchaModal(true);
    }, 2000);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError(null);
    if (e.target.value === '') {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const features = [
    { id: 'best-friend', icon: <Users className="text-blue-500 w-7 h-7" />, title: "Best Friend List", subtitle: "Reveal 8 Best friends of any user" },
    { id: 'my-eyes-only', icon: <span className="text-2xl grayscale brightness-200 dark:brightness-200 brightness-0">👀</span>, title: "My Eyes Only", subtitle: "Request memories, bsf and chat history" },
    { id: 'profile-score', icon: <span className="text-2xl grayscale brightness-150 dark:brightness-150 brightness-0">🕵️</span>, title: "Profile Score & Views", subtitle: "See who checked your profile & score" },
    { id: 'chatting-mod', icon: <MessageCircle className="text-text-quaternary w-6 h-6 fill-current" />, title: "Chatting with Mod", subtitle: "Find out who they're chatting with" },
  ];

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex min-h-screen bg-black flex-col items-center justify-center p-4 selection:bg-[#FFFC00] selection:text-black">
        <div className="flex items-center gap-3 mb-6">
          <GangsterSearchGhostIcon className="w-8 h-8 text-[#FFFC00]" />
          <h1 className="font-bold text-3xl tracking-wider text-white font-sans">PEEKVADE</h1>
        </div>
        <p className="text-[#A0A0A0] text-[16px] mb-10 font-sans">Mobile Only Experience</p>
        
        <div className="bg-[#1E1E1E] rounded-2xl p-8 max-w-[460px] w-full text-center shadow-2xl border border-white/[0.05]">
          <p className="text-white font-sans text-base font-medium leading-relaxed tracking-wide">
            This application is designed exclusively for mobile devices.
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden min-h-screen bg-bg-base text-text-primary font-sans overflow-x-hidden flex flex-col transition-colors duration-300 relative">
      
      {/* Graphic Logo Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen dark:mix-blend-normal">
        {/* Animated Background Ghosts */}
        <SnapchatIcon className="absolute top-[5%] left-[-15%] w-64 h-64 text-[#FFFC00] opacity-[0.15] dark:opacity-[0.03] transform -rotate-12 blur-[1px]" />
        <SnapchatIcon className="absolute top-[35%] right-[-20%] w-80 h-80 text-[#FFFC00] opacity-[0.15] dark:opacity-[0.02] transform rotate-[30deg] blur-[2px]" />
        <SnapchatIcon className="absolute bottom-[-10%] left-[10%] w-56 h-56 text-[#FFFC00] opacity-[0.15] dark:opacity-[0.04] transform -rotate-[15deg] blur-[1px]" />
        <SnapchatIcon className="absolute top-[65%] right-[-10%] w-72 h-72 text-[#FFFC00] opacity-[0.15] dark:opacity-[0.035] transform rotate-[45deg] blur-[1.5px]" />
        <SnapchatIcon className="absolute top-[-5%] right-[15%] w-48 h-48 text-[#FFFC00] opacity-[0.2] dark:opacity-[0.045] transform -rotate-[25deg] blur-[0.5px]" />
        <SnapchatIcon className="absolute bottom-[20%] left-[-20%] w-96 h-96 text-[#FFFC00] opacity-[0.1] dark:opacity-[0.015] transform rotate-[105deg] blur-[3px]" />
        
        {/* Soft glowing ambient light behind center content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,252,0,0.04)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,252,0,0.02)_0%,transparent_60%)] pointer-events-none" />
      </div>

      <div className="w-full relative z-10 min-h-screen transition-colors duration-300 mx-auto max-w-full sm:max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-5">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 rounded-full bg-bg-button flex items-center justify-center hover:bg-bg-button-hover transition-colors"
            >
              <Menu className="w-5 h-5 text-text-tertiary" />
            </button>
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-bg-button flex items-center justify-center hover:bg-bg-button-hover transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-text-tertiary" />
              ) : (
                <Moon className="w-5 h-5 text-text-tertiary" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <GangsterSearchGhostIcon className="w-8 h-8 text-black dark:text-[#FFFC00]" />
            <span className="font-bold text-lg tracking-wider">PEEKVADE</span>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-5 mt-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className={`relative flex items-center rounded-full p-1.5 border shadow-sm dark:shadow-inner transition-colors ${isLoading || isConnected ? 'bg-bg-input border-transparent justify-center py-4' : 'bg-bg-input ' + (error ? 'border-red-500/70' : 'border-border-main')}`}>
              {!isLoading && !isConnected ? (
              <>
                <input 
                  type="text" 
                  placeholder="Enter Username" 
                  value={username}
                  onChange={handleUsernameChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                  className="bg-transparent text-text-primary border-none outline-none pl-4 pr-24 w-full flex-1 placeholder-text-muted"
                />
                <button 
                  onClick={handleConnect}
                  disabled={!username.trim()}
                  className={`absolute right-1.5 text-sm font-semibold rounded-full px-5 py-2 transition-colors ${
                    username.trim()
                      ? 'bg-[#FFFC00] hover:bg-[#E6E300] text-black' 
                      : 'bg-bg-connect text-text-connect cursor-not-allowed opacity-50'
                  }`}
                >
                  Connect
                </button>
              </>
            ) : isLoading ? (
              <div className="flex items-center gap-3 text-text-secondary font-medium text-[15px]">
                <svg className="w-[18px] h-[18px] animate-[spin_0.8s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="2.5" strokeDasharray="42 15" strokeLinecap="round" />
                </svg>
                <span>Connecting {username}...</span>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-2">
                 <div className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 12l2.5 2.5 5.5-5.5"></path>
                    </svg>
                    <span className="text-text-primary font-bold tracking-wide text-[16px]">{username}</span>
                 </div>
                 <button 
                   onClick={() => setIsConnected(false)} 
                   className="text-[15px] font-medium text-[#4A90E2] hover:text-[#3A70B2] transition-colors"
                 >
                   Change
                 </button>
              </div>
             )}
            </div>
            {error && (
              <p className="text-red-500/90 text-sm px-4 mt-2 font-medium">
                {error}
              </p>
            )}
          </div>

          {/* Cards Container */}
          <div className="bg-bg-surface border border-border-main rounded-[32px] p-4 flex flex-col gap-3 min-h-[500px] transition-colors duration-300 shadow-sm dark:shadow-none">
            {features.map((feature, i) => (
              <div 
                key={i}
                onClick={isConnected ? handleFeatureClick : undefined}
                className={`flex items-center gap-4 transition-all duration-300 border border-border-card rounded-2xl p-4 ${
                  isConnected 
                    ? 'bg-bg-card hover:bg-bg-card-hover cursor-pointer group shadow-sm dark:shadow-none' 
                    : 'bg-bg-card/40 opacity-40 grayscale-[0.3] cursor-not-allowed pointer-events-none'
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-transparent">
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-secondary text-base">{feature.title}</h3>
                  <p className="text-text-muted text-sm truncate">{feature.subtitle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-text-quaternary group-hover:text-text-secondary transition-colors" />
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-black/60 dark:bg-black/80 z-40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 bottom-0 w-[280px] bg-bg-sidebar z-50 flex flex-col shadow-2xl transition-colors duration-300"
              >
                <div className="p-6 pt-8 flex items-center gap-3 mb-8">
                  <GangsterSearchGhostIcon className="w-8 h-8 text-black dark:text-[#FFFC00]" />
                  <span className="font-bold text-lg tracking-wider text-text-primary">PEEKVADE</span>
                </div>
                
                <nav className="flex flex-col px-4 gap-2">
                  <button onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-bg-sidebar-hover transition-colors w-full text-left">
                    <Home className="w-5 h-5 text-text-tertiary" />
                    <span className="font-medium text-text-secondary">Home</span>
                  </button>
                  <button onClick={() => setActiveModal('privacy')} className="flex items-center gap-4 p-4 rounded-xl hover:bg-bg-sidebar-hover transition-colors w-full text-left">
                    <Shield className="w-5 h-5 text-text-tertiary" />
                    <span className="font-medium text-text-secondary">Privacy Policy</span>
                  </button>
                  <button onClick={() => setActiveModal('terms')} className="flex items-center gap-4 p-4 rounded-xl hover:bg-bg-sidebar-hover transition-colors w-full text-left">
                    <FileText className="w-5 h-5 text-text-tertiary" />
                    <span className="font-medium text-text-secondary">Terms of Service</span>
                  </button>
                  <button onClick={() => setActiveModal('faq')} className="flex items-center gap-4 p-4 rounded-xl hover:bg-bg-sidebar-hover transition-colors w-full text-left">
                    <HelpCircle className="w-5 h-5 text-text-tertiary" />
                    <span className="font-medium text-text-secondary">FAQs</span>
                  </button>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Modals */}
        <AnimatePresence>
          {activeModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setActiveModal(null)} 
                className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-sm bg-bg-modal rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden transition-colors duration-300"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-border-modal">
                  <h2 className="text-xl font-bold text-text-primary">
                    {activeModal === 'terms' ? 'Terms of Service' : 
                     activeModal === 'privacy' ? 'Privacy Policy' : 'FAQs'}
                  </h2>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="p-1 hover:bg-bg-button-hover rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-text-quaternary" />
                  </button>
                </div>
                
                {/* Modal Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                  {activeModal === 'terms' && <TermsContent />}
                  {activeModal === 'privacy' && <PrivacyContent />}
                  {activeModal === 'faq' && <FaqContent />}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Full Screen Loading Overlay */}
        <AnimatePresence>
          {isFeatureLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black flex items-center justify-center w-full min-h-screen"
            >
              <svg className="w-[30px] h-[30px] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="rgba(255,255,255,0.2)" />
                <path d="M12 2 A10 10 0 0 1 22 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Captcha Modal */}
        <AnimatePresence>
          {showCaptchaModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40"
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white w-full max-w-[360px] shadow-2xl relative z-10 overflow-hidden flex flex-col rounded-[2px]"
              >
                {!showOffers ? (
                  <>
                    {/* Thin blue top bar */}
                    <div className="w-full h-1 bg-gray-100">
                      <div className="h-full bg-[#1A73E8] w-[45%]"></div>
                    </div>
                    
                    <div className="p-6 flex flex-col items-center">
                      <h2 className="text-[22px] text-black mb-2 font-normal" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>Verify that it's you</h2>
                      <p className="text-[14px] mb-8 text-black" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>Confirm that you're not a robot</p>
                      
                      <div className="w-full bg-[#FAFAFA] border border-[#D3D3D3] rounded-[3px] p-2 flex items-center justify-between shadow-sm max-w-[300px]">
                        <div className="flex items-center gap-3 pl-1">
                          {isCaptchaLoading ? (
                            <div className="w-7 h-7 flex items-center justify-center">
                              <div className="w-5 h-5 border-[3px] border-[#e0e0e0] border-t-[#4A90E2] rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <button 
                              className="w-7 h-7 bg-white border-2 border-[#C1C1C1] rounded-[2px] transition-all hover:border-[#b2b2b2] hover:shadow-inner outline-none relative cursor-pointer"
                              onClick={() => {
                                setIsCaptchaLoading(true);
                                setTimeout(() => {
                                  setIsCaptchaLoading(false);
                                  setShowOffers(true);
                                }, 1500);
                              }}
                            ></button>
                          )}
                          <span className="text-[14px] text-[#222]" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>I'm not a robot</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center pt-1 pr-1">
                          <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" width="32" height="32" className="object-contain" />
                          <div className="text-[10px] text-[#555] mt-1" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>reCAPTCHA</div>
                          <div className="text-[8px] text-[#555] mt-[1px] flex gap-[2px]" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>
                            <span className="hover:underline cursor-pointer">Privacy</span>
                            <span>-</span>
                            <span className="hover:underline cursor-pointer">Terms</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col w-full bg-white relative">
                    {/* Verification Error Message */}
                    <AnimatePresence>
                      {verificationError && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none p-2"
                        >
                          <div className="bg-[#D93025] text-white text-[13px] px-3 py-1.5 rounded shadow-sm flex items-center font-medium">
                            Please complete an offer to verify yourself.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Blue banner */}
                    <div className="bg-[#4285F4] p-[18px] text-white text-[16px] leading-[1.3] font-normal" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>
                      Complete one task from the list below.<br/>
                      Click verify once finished.
                    </div>
                    
                    {/* List of tasks */}
                    <div className="flex flex-col border-b border-[#E0E0E0] p-2 gap-2">
                      
                      {/* Costco Task */}
                      <button 
                        className="flex items-start gap-3 p-2 border border-[#E0E0E0] border-b-[1px] hover:bg-gray-50 bg-white cursor-pointer w-full text-left"
                        onClick={() => window.open('https://giftclick.org/aff_c?offer_id=1402&aff_id=144760')}
                      >
                        <div className="w-[50px] h-[50px] shrink-0 bg-[#2C62A3] flex items-center justify-center overflow-hidden relative border border-[#1e4e85]">
                          <svg className="absolute inset-0 w-full h-full">
                            <defs>
                              <pattern id="blue-stripes" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                                <rect width="4" height="8" fill="#1e4e85" />
                                <rect x="4" width="4" height="8" fill="#2C62A3" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#blue-stripes)" />
                          </svg>
                          <div className="z-10 flex flex-col items-center justify-center pt-[2px]" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                            <div className="text-white font-bold flex items-start leading-none drop-shadow-md">
                              <span className="text-[8px] mt-[1px]">$</span>
                              <span className="text-[17px] tracking-tight">750</span>
                            </div>
                            <div className="text-[#E31837] font-black text-[9px] tracking-[0.5px] leading-none mt-[1px]" style={{ textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>
                              COSTCO
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col max-w-full">
                          <span className="text-black text-[15px] leading-[1.3] mb-1 font-normal break-words">Don't miss out! $750 on the line for Costco, enter NOW!</span>
                          <span className="text-[#888] text-[12px] leading-[1.3] mb-1 break-words">complete 4-5 deals and Receive your Costco gift card</span>
                          <div className="flex text-[#FFB400] text-[14px]">★★★★★</div>
                        </div>
                      </button>
                      
                      {/* Cash App Task */}
                      <button 
                        className="flex items-start gap-3 p-2 border border-[#E0E0E0] hover:bg-gray-50 bg-white cursor-pointer w-full text-left"
                        onClick={() => window.open('https://giftclick.org/aff_c?offer_id=1598&aff_id=144760')}
                      >
                        <div className="w-[50px] h-[50px] shrink-0 flex items-center justify-center">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Square_Cash_app_logo.svg" alt="Cash App" className="w-[45px] h-[45px]" />
                        </div>
                        <div className="flex flex-col max-w-full">
                          <span className="text-black text-[15px] leading-[1.3] mb-1 font-normal break-words">Get $750 to your CashApp here!</span>
                          <span className="text-[#888] text-[12px] leading-[1.3] mb-1 break-words">complete 4-5 deals to Get $750 to your CashApp!</span>
                          <div className="flex text-[#FFB400] text-[14px]">★★★★★</div>
                        </div>
                      </button>

                      {/* Walmart Task */}
                      <button 
                        className="flex items-start gap-3 p-2 border border-[#E0E0E0] hover:bg-gray-50 bg-white cursor-pointer w-full text-left"
                        onClick={() => window.open('https://trksy.org/aff_c?offer_id=1913&aff_id=144760')}
                      >
                        <div className="w-[50px] h-[50px] shrink-0 bg-[#0071ce] flex items-center justify-center p-[6px]">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-[#ffc220]" stroke="currentColor" strokeWidth="15" strokeLinecap="round">
                            <line x1="50" y1="18" x2="50" y2="35" />
                            <line x1="50" y1="82" x2="50" y2="65" />
                            <line x1="78" y1="34" x2="63" y2="43" />
                            <line x1="78" y1="66" x2="63" y2="57" />
                            <line x1="22" y1="66" x2="37" y2="57" />
                            <line x1="22" y1="34" x2="37" y2="43" />
                          </svg>
                        </div>
                        <div className="flex flex-col max-w-full">
                          <span className="text-black text-[15px] leading-[1.3] mb-1 font-normal break-words">Get a $750 Walmart Gift Card!</span>
                          <span className="text-[#888] text-[12px] leading-[1.3] mb-1 break-words">complete 4-5 deals to get your walmart gift card!</span>
                          <div className="flex text-[#FFB400] text-[14px]">★★★★★</div>
                        </div>
                      </button>

                    </div>
                    
                    {/* Bottom action bar */}
                    <div className="flex items-center justify-between p-3 bg-white">
                      <div className="flex items-center gap-3 text-[#5F6368] pl-2">
                        <RefreshCw className="w-5 h-5 hover:text-black cursor-pointer" />
                        <Headphones className="w-5 h-5 hover:text-black cursor-pointer" />
                        <Info className="w-5 h-5 hover:text-black cursor-pointer" />
                      </div>
                      <button 
                        className="bg-[#4285F4] hover:bg-[#3367d6] text-white px-6 py-2 text-[14px] font-bold rounded-[2px] transition-colors uppercase outline-none"
                        onClick={() => {
                          setVerificationError(true);
                          setTimeout(() => setVerificationError(false), 3000); // Hide after 3 seconds
                        }}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <div className="text-sm text-text-quaternary mb-2">Last Updated: November 19, 2025</div>
      <div>
        <h3 className="font-bold text-text-secondary mb-2">1. Acceptance of Terms</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          By accessing or using PeekVade, you agree to these Terms of Service.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-text-secondary mb-2">2. Purpose of the Site</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          PeekVade is a coding practice project. All features are fictional and exist only for demonstration.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-text-secondary mb-2">3. Use Restrictions</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          You agree not to use the Site for illegal activities, attempt to hack or exploit the code.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-text-secondary mb-2">4. No Warranties</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          PeekVade is provided AS IS and AS AVAILABLE.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-text-secondary mb-2">5. Limitation of Liability</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          PeekVade and its creators will not be liable for any damages, losses, errors, or misuse of the Site.
        </p>
      </div>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <div className="text-sm text-text-quaternary mb-2">Last Updated: November 19, 2025</div>
      <div>
        <h3 className="font-bold text-text-secondary mb-2">1. Introduction</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          PeekVade is a demo project created solely for entertainment, educational, and coding-practice purposes.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-text-secondary mb-2">2. No Personal Data Collection</h3>
        <p className="text-text-muted text-sm leading-relaxed mb-2">
          PeekVade does not collect, store, or process any personal information from users.
        </p>
        <ul className="list-disc pl-5 text-text-muted text-sm space-y-1">
          <li>No name, email address, phone number</li>
          <li>No account creation</li>
          <li>No location tracking</li>
          <li>No analytics</li>
          <li>No advertising profiles</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-text-secondary mb-2">3. No Cookies or Tracking</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          PeekVade does not use cookies, web beacons, tracking pixels, local storage, or any other technologies that monitor user activity.
        </p>
      </div>
    </>
  );
}

function FaqContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-bg-faq border border-border-main transition-colors p-4 rounded-xl pb-5">
        <h3 className="font-bold text-text-secondary mb-2 text-sm">1. What is PeekVade?</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          A platform that offers enhanced streak-style visuals, profile effects, and interactive features to make your experience more engaging.
        </p>
      </div>
      <div className="bg-bg-faq border border-border-main transition-colors p-4 rounded-xl pb-5">
        <h3 className="font-bold text-text-secondary mb-2 text-sm">2. Do I need an account?</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          No. All features are accessible instantly without creating an account.
        </p>
      </div>
      <div className="bg-bg-faq border border-border-main transition-colors p-4 rounded-xl pb-5">
        <h3 className="font-bold text-text-secondary mb-2 text-sm">3. Does PeekVade collect data?</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          No. We do not collect personal information, store data, or use cookies.
        </p>
      </div>
      <div className="bg-bg-faq border border-border-main transition-colors p-4 rounded-xl pb-5">
        <h3 className="font-bold text-text-secondary mb-2 text-sm">4. Is PeekVade free?</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          Yes, all current features are free to use.
        </p>
      </div>
      <div className="bg-bg-faq border border-border-main transition-colors p-4 rounded-xl pb-5">
        <h3 className="font-bold text-text-secondary mb-2 text-sm">5. Will my streaks or settings save?</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          Not permanently. Since we do not store user data, your session resets.
        </p>
      </div>
    </div>
  );
}
