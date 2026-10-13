import React, { useState } from 'react';
import { Mail, Sparkles, Music, Heart } from 'lucide-react';
import { InvitationData } from '../types';

interface EnvelopeIntroProps {
  data: InvitationData;
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ data, onOpen, isOpen }) => {
  const [opening, setOpening] = useState(false);

  const handleOpenClick = () => {
    if (opening) return;
    setOpening(true);
    // Allow flap flip animation then trigger onOpen
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-rose-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg mx-auto text-center">
        {/* Envelope container */}
        <div
          onClick={handleOpenClick}
          className="group cursor-pointer relative bg-gradient-to-b from-rose-50 to-white rounded-3xl p-8 sm:p-10 border border-rose-200/80 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-rose-400/30"
          style={{
            boxShadow: '0 25px 60px -15px rgba(244, 63, 94, 0.25), 0 0 40px rgba(251, 191, 36, 0.15)',
          }}
        >
          {/* Top Envelope Flap visual */}
          <div className="relative mb-6 flex justify-center">
            <div className="relative">
              {/* Wax Seal */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg border-2 border-amber-200/60 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                <div className="w-18 h-18 rounded-full border border-amber-300/40 flex flex-col items-center justify-center text-amber-100">
                  <span className="text-xs uppercase tracking-widest font-semibold text-amber-200">Bé</span>
                  <span className="text-2xl font-bold tracking-tight text-white font-serif">1</span>
                  <span className="text-[10px] tracking-wide text-amber-200">TUỔI</span>
                </div>
              </div>
              {/* Sparkle badge */}
              <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 p-1.5 rounded-full shadow-md animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Invitation title */}
          <div className="space-y-3 mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-rose-700 bg-rose-100/80 px-3.5 py-1 rounded-full border border-rose-200">
              <Mail className="w-3.5 h-3.5" />
              <span>Thiệp Mời Thôi Nôi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 tracking-tight leading-tight">
              {data.babyName}
            </h1>

            <p className="text-rose-600 font-medium text-base sm:text-lg flex items-center justify-center gap-1.5">
              <span>{data.babyNickname}</span>
              <span className="text-slate-300">•</span>
              <span>Tròn 1 Tuổi</span>
            </p>

            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed pt-1">
              Trân trọng kính mời quý khách đến chung vui ngày kỷ niệm dấu mốc đầu đời đặc biệt của bé.
            </p>
          </div>

          {/* Pulsing Open CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-semibold shadow-lg shadow-rose-500/30 hover:from-rose-600 hover:to-amber-600 transition-all transform active:scale-95"
            >
              <Music className="w-5 h-5 animate-bounce" />
              <span>Chạm Để Mở Thiệp &amp; Hòa Âm Nhạc</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </button>
            <p className="text-xs text-slate-400 mt-2.5 flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Bật nhạc nền du dương &amp; pháo hoa rực rỡ</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
