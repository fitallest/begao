import React, { useState } from 'react';
import { Camera, ZoomIn, Upload, Folder, X, Sparkles } from 'lucide-react';
import { InvitationData } from '../types';

interface PhotoGalleryProps {
  data: InvitationData;
  onUpdatePhotoUrl: (photoId: string, newUrl: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ data, onUpdatePhotoUrl }) => {
  const [activePhoto, setActivePhoto] = useState<(typeof data.photos)[0] | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, photoId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onUpdatePhotoUrl(photoId, result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/80 shadow-xl p-6 sm:p-10 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-rose-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Camera className="w-3.5 h-3.5" />
            <span>Khoảnh Khắc Đáng Yêu (Thư mục: image/)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 tracking-tight mt-2">
            Album Kỷ Niệm 1 Năm Đầu Đời
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Những khoảnh khắc tròn 1 tuổi lưu giữ nụ cười và hành trình lớn khôn của bé
          </p>
        </div>

        {/* Folder image hint */}
        <div className="flex items-center gap-2 text-xs text-rose-800 bg-rose-50/80 px-3.5 py-2 rounded-xl border border-rose-200/60 self-start sm:self-auto">
          <Folder className="w-4 h-4 text-rose-500" />
          <span>Lưu trữ tại: <strong className="font-mono text-slate-800">./image/</strong></span>
        </div>
      </div>

      {/* 3 Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-rose-200 shadow-md hover:shadow-xl hover:border-rose-400 transition-all duration-300"
          >
            {/* Image viewport */}
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay with Zoom */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActivePhoto(photo)}
                  className="p-3 rounded-full bg-white text-slate-800 hover:bg-rose-50 shadow-lg transform transition-transform hover:scale-110"
                  title="Xem phóng to ảnh"
                >
                  <ZoomIn className="w-5 h-5 text-rose-600" />
                </button>

                {/* Upload custom replacement button */}
                <label
                  className="p-3 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-lg cursor-pointer transform transition-transform hover:scale-110"
                  title="Tải ảnh bé nhà bạn lên thay thế"
                >
                  <Upload className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, photo.id)}
                  />
                </label>
              </div>

              {/* Number tag */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-rose-950 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                0{index + 1}
              </div>
            </div>

            {/* Photo description */}
            <div className="p-4 flex flex-col justify-between flex-1 bg-gradient-to-b from-white to-rose-50/30">
              <div>
                <h3 className="font-serif font-bold text-slate-800 text-base group-hover:text-rose-600 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {photo.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-rose-100/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">image/baby-{index + 1}</span>
                <label className="text-rose-600 font-semibold hover:underline cursor-pointer flex items-center gap-1">
                  <span>Thay ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, photo.id)}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[3/4] max-h-[70vh] rounded-2xl overflow-hidden bg-slate-900 mx-auto">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activePhoto.subtitle}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-800">
                {activePhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
