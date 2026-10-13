import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles, Flame } from 'lucide-react';
import { birthdayAudio } from '../utils/birthdayAudio';

interface MusicPlayerControlProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onFireworkBurst: () => void;
}

export const MusicPlayerControl: React.FC<MusicPlayerControlProps> = ({
  isPlaying,
  onTogglePlay,
  onFireworkBurst,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentSong, setCurrentSong] = useState<'birthday' | 'twinkle'>('birthday');
  const [volume, setVolume] = useState(0.25);

  const handleSongChange = (song: 'birthday' | 'twinkle') => {
    setCurrentSong(song);
    birthdayAudio.setSong(song);
    if (!isPlaying) {
      onTogglePlay();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    birthdayAudio.setVolume(val);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Control Menu */}
      {showMenu && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-rose-200/90 text-left text-xs space-y-3 w-64 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-rose-100 pb-2">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-rose-500" />
              <span>Hộp Nhạc Thôi Nôi</span>
            </span>
            <span className="text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full font-medium">
              Web Audio
            </span>
          </div>

          {/* Song selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-500 font-medium">Chọn Giai Điệu:</span>
            <div className="grid grid-cols-1 gap-1">
              <button
                type="button"
                onClick={() => handleSongChange('birthday')}
                className={`w-full py-1.5 px-2.5 rounded-lg text-left transition-colors flex items-center justify-between ${
                  currentSong === 'birthday'
                    ? 'bg-rose-500 text-white font-medium'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>🎂 Happy Birthday to You</span>
                {currentSong === 'birthday' && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSongChange('twinkle')}
                className={`w-full py-1.5 px-2.5 rounded-lg text-left transition-colors flex items-center justify-between ${
                  currentSong === 'twinkle'
                    ? 'bg-rose-500 text-white font-medium'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>✨ Twinkle Twinkle Little Star</span>
                {currentSong === 'twinkle' && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                )}
              </button>
            </div>
          </div>

          {/* Volume slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Âm Lượng</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Firework trigger */}
          <button
            type="button"
            onClick={onFireworkBurst}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 text-amber-100" />
            <span>Bắn Thêm Pháo Hoa</span>
          </button>
        </div>
      )}

      {/* Floating Button Pill */}
      <div className="flex items-center gap-2">
        {/* Firework quick blast button */}
        <button
          type="button"
          onClick={onFireworkBurst}
          className="p-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 transition-transform active:scale-90"
          title="Bắn pháo hoa"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Music disc & toggle */}
        <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-xl border border-rose-200/80">
          <button
            type="button"
            onClick={onTogglePlay}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          >
            {isPlaying ? (
              <Disc3 className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-rose-600 transition-colors flex items-center gap-1"
          >
            <span>{isPlaying ? 'Đang phát' : 'Âm nhạc'}</span>
            <span className="text-[10px] text-slate-400">▼</span>
          </button>
        </div>
      </div>
    </div>
  );
};
