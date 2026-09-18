import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowLeft, 
  Clock, 
  Globe, 
  Sparkles, 
  Pause, 
  Play, 
  QrCode, 
  ShieldCheck,
  Share2
} from 'lucide-react';

export default function App() {
  const targetUrl = 'http://linaa.de5.net/';
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(12);
  const [isPaused, setIsPaused] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Automatic redirect timer
  useEffect(() => {
    if (isPaused || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = targetUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, isPaused, targetUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      const textArea = document.createElement('textarea');
      textArea.value = targetUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'الموقع الجديد',
          text: 'يمكنكم زيارة موقعنا الجديد عبر الرابط:',
          url: targetUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-between relative overflow-hidden selection:bg-amber-500 selection:text-stone-950 font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-orange-600/10 blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-400/5 blur-[160px]" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px' 
          }}
        />
      </div>

      {/* Top bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-semibold tracking-wide text-stone-200">بوابة الانتقال السريع</span>
            <span className="block text-xs text-stone-400">نظام التوجيه المباشر</span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/80 border border-stone-700/60 backdrop-blur-sm text-xs font-medium text-amber-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span>جاري التحديث والتطوير</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl mx-auto">
          {/* Central Card */}
          <div className="bg-stone-900/90 border border-stone-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative">
            {/* Top decorative accent */}
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

            {/* Icon Header */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/5">
                  <Wrench className="w-9 h-9 animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-300 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center space-y-3 mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                الموقع تحت الصيانة
              </h1>
              <p className="text-stone-300 text-base leading-relaxed max-w-md mx-auto">
                نعمل حالياً على ترقية خوادمنا وتحسين خدماتنا لنقدم لكم تجربة أفضل. يمكنكم التوجه الآن إلى رابط الموقع الجديد لمتابعة التصفح.
              </p>
            </div>

            {/* Target URL Display & Actions */}
            <div className="space-y-4 mb-8">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-3 group transition-colors hover:border-amber-500/30">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="truncate text-right">
                    <span className="block text-[11px] text-stone-500 font-medium">الرابط الجديد للموقع</span>
                    <span className="text-sm sm:text-base font-mono font-medium text-amber-300 tracking-wide dir-ltr inline-block">
                      {targetUrl}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    id="copy-url-btn"
                    onClick={handleCopy}
                    aria-label="نسخ الرابط"
                    title="نسخ الرابط"
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 transition-all flex items-center gap-1.5 text-xs font-medium border border-stone-700/60"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="hidden sm:inline text-emerald-400 font-semibold">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-stone-300" />
                        <span className="hidden sm:inline">نسخ</span>
                      </>
                    )}
                  </button>

                  <button
                    id="toggle-qr-btn"
                    onClick={() => setShowQr(!showQr)}
                    aria-label="رمز QR"
                    title="عرض رمز الاستجابة السريعة QR"
                    className={`p-2 rounded-xl border transition-all text-xs ${
                      showQr 
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700/60'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* QR Code expansion */}
              {showQr && (
                <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800/80 flex flex-col items-center text-center animate-in fade-in duration-200">
                  <div className="p-3 bg-white rounded-xl shadow-lg mb-3">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(targetUrl)}`}
                      alt="رمز QR للموقع الجديد"
                      className="w-36 h-36"
                    />
                  </div>
                  <span className="text-xs text-stone-300 font-medium">امسح الرمز بكاميرا هاتفك للوصول المباشر</span>
                </div>
              )}

              {/* Primary Call To Action */}
              <a
                id="goto-new-site-btn"
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group relative overflow-hidden flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform active:scale-[0.99]"
              >
                <span>الانتقال إلى الموقع الجديد</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </a>
            </div>

            {/* Auto-redirect countdown panel */}
            <div className="pt-5 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  التحويل التلقائي خلال{' '}
                  <strong className="text-amber-400 font-mono text-sm px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700/80 inline-block">
                    {countdown}
                  </strong>{' '}
                  ثوانٍ
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="toggle-countdown-btn"
                  onClick={() => setIsPaused(!isPaused)}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 flex items-center gap-1.5 transition-colors"
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3 h-3 text-amber-400" />
                      <span>استئناف العداد</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 text-stone-400" />
                      <span>إيقاف مؤقت</span>
                    </>
                  )}
                </button>

                <button
                  id="share-btn"
                  onClick={handleShare}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 flex items-center gap-1.5 transition-colors"
                  title="مشاركة الرابط"
                >
                  <Share2 className="w-3 h-3 text-stone-400" />
                  <span>{shareSuccess ? 'تمت المشاركة' : 'مشاركة'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Guidance Footer */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400/80" />
              <span>الرابط آمن وموثق</span>
            </div>
            <span className="hidden sm:inline text-stone-700">•</span>
            <div>
              <span>جاهز للنشر على Vercel بنقرة واحدة</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 border-t border-stone-800/60 text-center sm:flex sm:items-center sm:justify-between text-xs text-stone-400">
        <p>© {new Date().getFullYear()} جميع الحقوق محفوظة — صفحة إشعار الصيانة والتحويل</p>
        <div className="mt-3 sm:mt-0 flex items-center justify-center gap-4">
          <a 
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <span>linaa.de5.net</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}
