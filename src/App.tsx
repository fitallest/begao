/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { initialInvitationData } from './data/defaultInvitation';
import { InvitationData } from './types';
import { birthdayAudio } from './utils/birthdayAudio';
import { FireworksCanvas } from './components/FireworksCanvas';
import { ArchInvitationCard } from './components/ArchInvitationCard';
import { PlayfulPhotoScrapbook } from './components/PlayfulPhotoScrapbook';
import { CountdownSection } from './components/CountdownSection';

export default function App() {
  const [data, setData] = useState<InvitationData>(() => {
    const saved = localStorage.getItem('thoi_noi_khanh_data_v5');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialInvitationData;
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [burstCount, setBurstCount] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('thoi_noi_khanh_data_v5', JSON.stringify(data));
  }, [data]);

  // Autoplay background music as soon as web finishes loading
  useEffect(() => {
    const startAudio = () => {
      birthdayAudio.play();
      setIsAudioPlaying(birthdayAudio.getIsPlaying());
    };

    // Immediate attempt on load
    startAudio();

    // In case the browser requires any user interaction first, unlock immediately on first interaction
    const unlockEvents = ['click', 'touchstart', 'pointerdown', 'scroll', 'keydown'];
    const onFirstUserAction = () => {
      startAudio();
      unlockEvents.forEach((ev) => window.removeEventListener(ev, onFirstUserAction));
    };

    unlockEvents.forEach((ev) => {
      window.addEventListener(ev, onFirstUserAction, { passive: true });
    });

    return () => {
      unlockEvents.forEach((ev) => {
        window.removeEventListener(ev, onFirstUserAction);
      });
    };
  }, []);

  const handleToggleAudio = () => {
    const playing = birthdayAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const handleFireworkBurst = () => {
    setBurstCount((c) => c + 1);
  };

  const handleUpdatePhotoUrl = (photoId: string, newUrl: string) => {
    setData((prev) => ({
      ...prev,
      photos: prev.photos.map((p) => (p.id === photoId ? { ...p, url: newUrl } : p)),
    }));
  };

  return (
    <div className="min-h-screen bg-[#fff7f9] text-slate-800 antialiased font-sans relative selection:bg-rose-200 py-6 sm:py-10 px-3 sm:px-4">
      {/* Lightweight, zero-lag Fireworks Canvas */}
      <FireworksCanvas burstTrigger={burstCount} />

      {/* Main Container - Clean, authentic card without bloated buttons */}
      <main className="max-w-xl mx-auto space-y-8 relative z-10">
        {/* 1. Authentic Arch Physical Invitation Card */}
        <ArchInvitationCard
          data={data}
          onFireworkBurst={handleFireworkBurst}
          isPlaying={isAudioPlaying}
          onToggleMusic={handleToggleAudio}
        />

        {/* 2. Playful Scrapbook Photos (5 ảnh to nhỏ nghiêng qua lại phá cách tự nhiên) */}
        <PlayfulPhotoScrapbook
          data={data}
          onUpdatePhotoUrl={handleUpdatePhotoUrl}
        />

        {/* 3. Pure Countdown Section (Không còn các nút calendar bên dưới) */}
        <CountdownSection data={data} />

        {/* 4. Elegant Clean Footer (Đã loại bỏ các nút theo ảnh bạn yêu cầu) */}
        <footer className="text-center text-xs text-slate-400 pt-4 pb-12 space-y-2 border-t border-[#fce7f3]">
          <p className="font-serif italic text-slate-600">
            &ldquo;Sự hiện diện của quý khách là lời chúc ý nghĩa nhất dành cho bé và gia đình&rdquo;
          </p>
          <p className="text-[11px] text-slate-400">
            Kính mời bởi <strong>{data.parentNames}</strong> • {data.venueName} ({data.venueAddress})
          </p>
        </footer>
      </main>

      {/* Floating Music Toggle in Bottom Corner */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={handleToggleAudio}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#fda4af] text-[#991b1b] shadow-lg text-xs font-semibold hover:bg-rose-50 transition-all active:scale-95"
          title={isAudioPlaying ? 'Tạm dừng nhạc nền' : 'Bật nhạc nền'}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-[#e11d48] animate-pulse" />
              <span>Đang phát nhạc 🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Bật nhạc nền</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
