import React, { useState } from 'react';
import { ZoomIn, Upload, X, Heart, Sparkles } from 'lucide-react';
import { InvitationData } from '../types';

interface PlayfulPhotoScrapbookProps {
  data: InvitationData;
  onUpdatePhotoUrl?: (photoId: string, newUrl: string) => void;
}

export const PlayfulPhotoScrapbook: React.FC<PlayfulPhotoScrapbookProps> = ({
  data,
  onUpdatePhotoUrl,
}) => {
  const [activePhoto, setActivePhoto] = useState<(typeof data.photos)[0] | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, photoId: string) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdatePhotoUrl) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onUpdatePhotoUrl(photoId, result);
      }
    };
    reader.readAsDataURL(file);
  };

  const [p1, p2, p3, p4, p5] = data.photos;

  return (
    <div className="relative pt-6 pb-4">
      {/* Title */}
      <div className="text-center mb-8 space-y-1">
        <p className="font-cursive text-3xl sm:text-4xl text-[#991b1b] select-none">
          5 Khoảnh Khắc Đáng Yêu Của Bé
        </p>
        <p className="text-xs text-slate-500 font-medium">
          Chặng đường 365 ngày khôn lớn (Chạm vào ảnh để phóng to)
        </p>
      </div>

      {/* Main Scrapbook Collage Container */}
      <div className="relative max-w-xl mx-auto px-2 space-y-6 sm:space-y-8">
        {/* Soft Background Connecting Ribbon / Floral Garland SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none -z-0 opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 120 Q 280 200 480 140 T 260 480 T 120 720 T 450 820"
            fill="none"
            stroke="#fda4af"
            strokeWidth="1.5"
            strokeDasharray="6,8"
          />
        </svg>

        {/* Floating Cute Accent Stickers */}
        <div className="absolute -top-3 left-6 text-2xl select-none animate-bounce">
          🌸
        </div>
        <div className="absolute top-1/4 -right-1 text-2xl select-none">
          ✨
        </div>
        <div className="absolute top-1/2 -left-3 text-2xl select-none">
          🧸
        </div>
        <div className="absolute top-3/4 -right-2 text-2xl select-none">
          🎈
        </div>

        {/* TẦNG 1: Ảnh 1 (Lớn, nghiêng trái -3°) & Ảnh 2 (Vừa, nghiêng phải +3.5°) */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Photo 1: Big Polaroid */}
          {p1 && (
            <div className="col-span-7 relative group z-10 transition-transform duration-300 hover:z-30 hover:scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-rose-200/90 rounded-sm shadow-xs -rotate-2 z-20 pointer-events-none border border-rose-300/40" />

              <div
                onClick={() => setActivePhoto(p1)}
                className="cursor-pointer bg-white p-3 sm:p-4 pb-4 sm:pb-6 rounded-2xl shadow-xl hover:shadow-2xl border border-rose-100 transition-all -rotate-3 hover:rotate-0"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-rose-50 shadow-inner">
                  <img
                    src={p1.url}
                    alt={p1.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white drop-shadow" />
                  </div>
                </div>

                <div className="mt-2.5 text-center">
                  <p className="font-cursive text-xl sm:text-2xl text-[#991b1b] leading-tight">
                    {p1.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-sans">{p1.subtitle}</p>
                </div>
              </div>
            </div>
          )}

          {/* Photo 2: Medium Polaroid */}
          {p2 && (
            <div className="col-span-5 relative group z-10 transition-transform duration-300 hover:z-30 hover:scale-105 -mt-4 sm:-mt-6">
              <div className="absolute -top-2.5 right-6 w-16 h-4 bg-amber-200/90 rounded-sm shadow-xs rotate-3 z-20 pointer-events-none border border-amber-300/40" />

              <div
                onClick={() => setActivePhoto(p2)}
                className="cursor-pointer bg-white p-2.5 sm:p-3 pb-3.5 sm:pb-5 rounded-2xl shadow-xl hover:shadow-2xl border border-amber-100 transition-all rotate-3.5 hover:rotate-0"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-amber-50 shadow-inner">
                  <img
                    src={p2.url}
                    alt={p2.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white drop-shadow" />
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <p className="font-cursive text-lg sm:text-xl text-amber-900 leading-tight">
                    {p2.title}
                  </p>
                  <p className="text-[9px] text-slate-400 font-sans">{p2.subtitle}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TẦNG 2: ĐÃ KHẮC PHỤC CHỖ TRỐNG - Ghép đôi Ảnh 3 cùng Thư Kỷ Niệm / Note Card Yêu Thương */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Họa tiết Scrapbook Thư Kỷ Niệm của Ba Mẹ (Lấp đầy khoảng trống bên trái) */}
          <div className="col-span-6 relative group z-10 transition-transform duration-300 hover:z-30 hover:scale-105">
            {/* Cute Gold Wax Seal on corner */}
            <div className="absolute -top-3 left-4 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-amber-950 flex items-center justify-center shadow-md z-20 border-2 border-white">
              <Sparkles className="w-4 h-4 text-white" />
            </div>

            <div className="bg-[#fff9fa] p-3.5 sm:p-4 rounded-2xl shadow-lg border border-[#fce7f3] rotate-2 hover:rotate-0 transition-transform relative overflow-hidden">
              {/* Floral watermark in card */}
              <div className="absolute -right-4 -bottom-4 text-5xl opacity-20 pointer-events-none select-none">
                🌸
              </div>

              <div className="border border-dashed border-[#fda4af]/60 rounded-xl p-3 sm:p-3.5 text-center space-y-1.5 bg-white/70">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#991b1b] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  💌 Lời Yêu Thương
                </span>

                <h4 className="font-cursive text-xl sm:text-2xl text-[#991b1b] leading-tight">
                  Bé An Khánh Tròn 1 Tuổi
                </h4>

                <p className="text-[10px] sm:text-[11px] text-slate-600 font-serif italic leading-relaxed pt-1">
                  &ldquo;Cảm ơn con gái đã đến bên ba mẹ. Chúc thiên thần nhỏ luôn bình an, mạnh khỏe và rạng rỡ mỗi ngày!&rdquo;
                </p>

                <div className="pt-1 border-t border-rose-100 flex items-center justify-between text-[9px] text-[#881337] font-semibold">
                  <span>365 Ngày Lớn Khôn</span>
                  <span>Ba Trung &amp; Mẹ Hon 💕</span>
                </div>
              </div>
            </div>
          </div>

          {/* Photo 3: Ảnh Bé Diện Áo Dài Đón Tết (Cân đối hoàn hảo bên phải) */}
          {p3 && (
            <div className="col-span-6 relative group z-10 transition-transform duration-300 hover:z-30 hover:scale-105">
              <div className="absolute -top-3 right-6 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md z-20 border-2 border-white">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </div>

              <div
                onClick={() => setActivePhoto(p3)}
                className="cursor-pointer bg-white p-3 pb-4 sm:pb-5 rounded-2xl shadow-xl hover:shadow-2xl border border-rose-100 transition-all -rotate-2.5 hover:rotate-0"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-rose-50 shadow-inner">
                  <img
                    src={p3.url}
                    alt={p3.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white drop-shadow" />
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <p className="font-cursive text-xl sm:text-2xl text-[#991b1b] leading-tight">
                    {p3.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-sans">{p3.subtitle}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TẦNG 3: Ảnh 4 (Nghiêng phải +2.5°) & Ảnh 5 (Nghiêng trái -3°) */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Photo 4: Polaroid */}
          {p4 && (
            <div className="col-span-6 relative group z-10 transition-transform duration-300 hover:z-30 hover:scale-105">
              <div className="absolute -top-2.5 left-8 w-16 h-4 bg-rose-200/90 rounded-sm shadow-xs -rotate-3 z-20 pointer-events-none border border-rose-300/40" />

              <div
                onClick={() => setActivePhoto(p4)}
                className="cursor-pointer bg-white p-2.5 sm:p-3.5 pb-3.5 sm:pb-5 rounded-2xl shadow-xl hover:shadow-2xl border border-rose-100 transition-all rotate-3 hover:rotate-0"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-rose-50 shadow-inner">
                  <img
                    src={p4.url}
                    alt={p4.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white drop-shadow" />
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <p className="font-cursive text-lg sm:text-xl text-[#991b1b] leading-tight">
                    {p4.title}
                  </p>
                  <p className="text-[9px] text-slate-400 font-sans">{p4.subtitle}</p>
                </div>
              </div>
            </div>
          )}

          {/* Photo 5: Polaroid */}
          {p5 && (
            <div className="col-span-6 relative group z-10 transition-transform duration-300 hover:z-30 hover:scale-105 -mt-3 sm:-mt-4">
              <div className="absolute -top-2.5 right-8 w-16 h-4 bg-purple-200/90 rounded-sm shadow-xs rotate-3 z-20 pointer-events-none border border-purple-300/40" />

              <div
                onClick={() => setActivePhoto(p5)}
                className="cursor-pointer bg-white p-2.5 sm:p-3.5 pb-3.5 sm:pb-5 rounded-2xl shadow-xl hover:shadow-2xl border border-purple-100 transition-all -rotate-3 hover:rotate-0"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-purple-50 shadow-inner">
                  <img
                    src={p5.url}
                    alt={p5.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white drop-shadow" />
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <p className="font-cursive text-lg sm:text-xl text-purple-900 leading-tight">
                    {p5.title}
                  </p>
                  <p className="text-[9px] text-slate-400 font-sans">{p5.subtitle}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-rose-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden aspect-[3/4] max-h-[70vh] bg-slate-100 mx-auto">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-3 text-center">
              <p className="font-cursive text-3xl text-[#991b1b]">{activePhoto.title}</p>
              <p className="text-xs text-slate-500">{activePhoto.subtitle}</p>

              {onUpdatePhotoUrl && (
                <div className="mt-3 pt-3 border-t border-rose-100">
                  <label className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Thay bằng ảnh của bé từ máy bạn</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        handleFileUpload(e, activePhoto.id);
                        setActivePhoto(null);
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
