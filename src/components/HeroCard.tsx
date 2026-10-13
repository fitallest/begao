import React, { useState } from 'react';
import { Heart, Sparkles, MapPin, Calendar, Flame, PartyPopper } from 'lucide-react';
import { InvitationData } from '../types';

interface HeroCardProps {
  data: InvitationData;
  onFireworkBurst: () => void;
  onScrollToRsvp: () => void;
  onScrollToVenue: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  data,
  onFireworkBurst,
  onScrollToRsvp,
  onScrollToVenue,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const currentPhoto = data.photos[selectedPhotoIndex] || data.photos[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md border border-rose-200/70 shadow-2xl p-6 sm:p-10 text-center">
      {/* Decorative top ribbon banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs sm:text-sm font-semibold tracking-widest uppercase border border-rose-200 shadow-sm mb-4">
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        <span>LỄ THÔI NÔI • HAPPY 1ST BIRTHDAY</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-800 tracking-tight leading-tight">
        {data.babyName}
      </h1>

      <div className="flex items-center justify-center gap-2 mt-2 mb-6">
        <span className="text-xl sm:text-2xl font-serif italic text-rose-600 font-semibold">
          {data.babyNickname}
        </span>
        <span className="text-slate-300">•</span>
        <span className="inline-flex items-center gap-1 text-sm sm:text-base font-semibold text-amber-600 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
          <PartyPopper className="w-4 h-4 text-amber-500" />
          <span>{data.milestoneAge}</span>
        </span>
      </div>

      {/* Baby Photo Showcase Frame */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative group p-3 bg-gradient-to-tr from-rose-200 via-amber-100 to-rose-100 rounded-3xl shadow-xl border border-rose-200/60">
          {/* Inner Photo Container */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4] shadow-inner">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft gradient bottom overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-left text-white pointer-events-none">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                {currentPhoto.subtitle}
              </span>
              <h3 className="text-lg font-serif font-bold text-white drop-shadow-sm">
                {currentPhoto.title}
              </h3>
            </div>
          </div>

          {/* Floating heart badge */}
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
            <Heart className="w-5 h-5 fill-white" />
          </div>
        </div>

        {/* Quick Photo Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mt-3.5">
          {data.photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedPhotoIndex === idx
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                  : 'bg-rose-50 text-slate-600 hover:bg-rose-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              <span>Ảnh {idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Milestones badges */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto mb-8 py-3 px-4 rounded-2xl bg-rose-50/70 border border-rose-200/60">
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold font-mono text-rose-700">365</div>
          <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Ngày Yêu Thương</div>
        </div>
        <div className="text-center border-x border-rose-200/80">
          <div className="text-lg sm:text-2xl font-bold font-mono text-amber-600">12</div>
          <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Tháng Khôn Lớn</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold font-mono text-rose-700">100%</div>
          <div className="text-[11px] sm:text-xs text-slate-600 font-medium">Nụ Cười Hạnh Phúc</div>
        </div>
      </div>

      {/* Loving Invitation Prose */}
      <div className="max-w-xl mx-auto space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
        <p className="italic font-serif text-slate-700 text-base sm:text-lg">
          &ldquo;{data.greetingMessage}&rdquo;
        </p>

        <div className="pt-2 text-xs sm:text-sm font-medium text-rose-800">
          <span>Kính mời bởi: </span>
          <span className="font-semibold text-slate-800">{data.parentNames}</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
        <button
          type="button"
          onClick={onScrollToRsvp}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-lg shadow-rose-600/25 transition-all active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>Xác Nhận Tham Dự (RSVP)</span>
        </button>

        <button
          type="button"
          onClick={onScrollToVenue}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-sm border border-rose-200 transition-all active:scale-95"
        >
          <MapPin className="w-4 h-4 text-rose-600" />
          <span>Xem Địa Điểm &amp; Lộ Trình</span>
        </button>

        <button
          type="button"
          onClick={onFireworkBurst}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-sm shadow-md transition-all active:scale-95"
        >
          <Flame className="w-4 h-4 text-amber-900" />
          <span>Bắn Pháo Hoa Ngay!</span>
        </button>
      </div>
    </div>
  );
};
