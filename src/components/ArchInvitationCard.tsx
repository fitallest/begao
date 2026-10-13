import React from 'react';
import { Navigation, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { InvitationData } from '../types';
import { CherryBlossom, ChibiDragonMascot } from './FloralDecor';

interface ArchInvitationCardProps {
  data: InvitationData;
  onFireworkBurst: () => void;
  isPlaying: boolean;
  onToggleMusic: () => void;
}

export const ArchInvitationCard: React.FC<ArchInvitationCardProps> = ({
  data,
  onFireworkBurst,
  isPlaying,
  onToggleMusic,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-5">
      {/* The Physical Arch Invitation Card */}
      <div
        onClick={onFireworkBurst}
        className="cursor-pointer relative overflow-hidden bg-[#fff8fa] rounded-t-[140px] sm:rounded-t-[190px] rounded-b-3xl border-4 sm:border-[6px] border-[#fce7f3] shadow-2xl p-3 sm:p-5 transition-transform duration-300 hover:scale-[1.008]"
        style={{
          boxShadow: '0 20px 50px -10px rgba(244, 63, 94, 0.18), 0 0 30px rgba(251, 207, 232, 0.3)',
        }}
      >
        {/* Inner Delicate Card Frame */}
        <div className="relative rounded-t-[120px] sm:rounded-t-[170px] rounded-b-2xl border border-[#fda4af]/60 bg-white/95 px-5 sm:px-8 pt-10 sm:pt-14 pb-8 text-center">
          {/* Top Corner Floral Accents */}
          <CherryBlossom className="absolute top-2 left-2" />
          <CherryBlossom className="absolute top-2 right-2" flipped />

          {/* Section 1: Intro */}
          <div className="space-y-1">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#991b1b] uppercase">
              NHÂN DỊP MỪNG THÔI NÔI BÉ
            </p>

            {/* Baby Calligraphy Name */}
            <h1 className="font-cursive text-5xl sm:text-6xl md:text-7xl text-[#991b1b] tracking-wide py-1 select-none leading-none">
              {data.babyName}
            </h1>
          </div>

          {/* Section 2: Invitation Prose */}
          <div className="mt-4 sm:mt-6 space-y-1 text-slate-800">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#881337]">
              TRÂN TRỌNG KÍNH MỜI: QUÝ GIA ĐÌNH
            </p>
            <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#881337]">
              ĐẾN DỰ BUỔI TIỆC THÂN MẬT CHUNG VUI CÙNG GIA ĐÌNH TẠI:
            </p>

            {/* Venue Calligraphy */}
            <div className="py-1">
              <h2 className="font-cursive text-4xl sm:text-5xl text-[#991b1b] select-none leading-tight">
                {data.venueName}
              </h2>
            </div>

            {/* Venue Address */}
            <p className="text-xs sm:text-sm font-bold text-[#881337] tracking-wide uppercase px-2 max-w-md mx-auto leading-relaxed">
              {data.venueAddress}
            </p>
          </div>

          {/* Section 3: Time & Date Highlights */}
          <div className="mt-5 pt-3 border-t border-[#fce7f3]/80 space-y-2">
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#881337]">
              VÀO LÚC: <span className="font-bold text-sm sm:text-base font-serif">11 GIỜ 00</span>
            </p>

            {/* Date Row Matching Physical Card */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 py-2 border-y border-[#fda4af]/50 text-xs sm:text-sm font-bold text-[#881337]">
              <span className="uppercase tracking-wider">CHỦ NHẬT</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-serif text-[#991b1b] font-extrabold tracking-tight">
                18.10.2026
              </span>
              <span className="uppercase tracking-wider">09 tháng 09 ÂL</span>
            </div>
          </div>

          {/* Section 4: Bottom Mascot & Host Signature */}
          <div className="mt-5 grid grid-cols-12 items-center gap-2 text-left pt-2">
            {/* Chibi Mascot Statue on bottom left */}
            <div className="col-span-5 flex justify-center items-end">
              <ChibiDragonMascot />
            </div>

            {/* Host signature & appreciation on bottom right */}
            <div className="col-span-7 pl-1 space-y-2 text-right sm:text-center">
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#881337] leading-tight uppercase tracking-tight">
                SỰ HIỆN DIỆN CỦA QUÝ KHÁCH
                <br />
                LÀ LỜI CHÚC Ý NGHĨA NHẤT DÀNH
                <br />
                CHO BÉ VÀ GIA ĐÌNH
              </p>

              <div className="pt-2">
                <p className="text-xs sm:text-sm font-bold text-[#991b1b] tracking-wider uppercase font-serif">
                  {data.parentNames}
                </p>
                <p className="text-[11px] sm:text-xs font-semibold text-[#b91c1c] tracking-widest uppercase">
                  KÍNH MỜI!
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Right Corner Flower */}
          <CherryBlossom className="absolute bottom-2 right-2 w-12 h-12 opacity-80" />
        </div>
      </div>

      {/* Quick Action Buttons for Guests */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <a
          href={data.mapUrl || 'https://maps.app.goo.gl/vknpmrXkD6VcJi8W8'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-rose-50 text-[#991b1b] text-xs sm:text-sm font-semibold border border-[#fda4af] shadow-md transition-all active:scale-95"
        >
          <Navigation className="w-4 h-4 text-[#e11d48]" />
          <span>Chỉ Đường Google Maps</span>
        </a>

        <button
          type="button"
          onClick={onToggleMusic}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#991b1b] hover:bg-[#881337] text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-900/15 transition-all active:scale-95"
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span>{isPlaying ? 'Tắt Nhạc' : 'Bật Nhạc Nền'}</span>
        </button>

        <button
          type="button"
          onClick={onFireworkBurst}
          className="p-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-md transition-all active:scale-95"
          title="Bắn pháo hoa mừng bé"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
