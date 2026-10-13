import React, { useState } from 'react';
import { Download, FileCode, Check, Folder, Copy, X } from 'lucide-react';
import { InvitationData } from '../types';

interface ExportModalProps {
  data: InvitationData;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ data, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateStandaloneHTML = () => {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thiệp Mời Thôi Nôi - Bé ${data.babyName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-serif { font-family: 'Playfair Display', Georgia, serif; }
    .font-cursive { font-family: 'Great Vibes', cursive; }
  </style>
</head>
<body class="bg-[#fff7f9] text-slate-800 antialiased min-h-screen py-8 px-4 selection:bg-rose-200">
  <canvas id="fireworksCanvas" class="fixed inset-0 pointer-events-none z-20"></canvas>

  <main class="max-w-xl mx-auto space-y-6 relative z-10">
    <!-- Thiệp Mời Dạng Vòm Cung Chuẩn Mẫu -->
    <div onclick="burst()" class="cursor-pointer bg-[#fff8fa] rounded-t-[140px] sm:rounded-t-[180px] rounded-b-3xl border-4 sm:border-[6px] border-[#fce7f3] shadow-2xl p-4 sm:p-5">
      <div class="rounded-t-[120px] sm:rounded-t-[160px] rounded-b-2xl border border-[#fda4af]/60 bg-white/95 px-6 pt-12 pb-8 text-center space-y-4">
        
        <!-- Tiêu đề -->
        <p class="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#991b1b] uppercase">
          NHÂN DỊP MỪNG THÔI NÔI BÉ
        </p>

        <!-- Tên Bé Calligraphy -->
        <h1 class="font-cursive text-5xl sm:text-7xl text-[#991b1b] py-1 select-none">
          ${data.babyName}
        </h1>

        <!-- Lời mời -->
        <div class="space-y-1 text-slate-800 pt-2">
          <p class="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#881337]">
            TRÂN TRỌNG KÍNH MỜI: QUÝ GIA ĐÌNH
          </p>
          <p class="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#881337]">
            ĐẾN DỰ BUỔI TIỆC THÂN MẬT CHUNG VUI CÙNG GIA ĐÌNH TẠI:
          </p>
          <div class="py-1">
            <h2 class="font-cursive text-4xl sm:text-5xl text-[#991b1b]">
              ${data.venueName}
            </h2>
          </div>
          <p class="text-xs sm:text-sm font-bold text-[#881337] uppercase max-w-md mx-auto leading-relaxed">
            ${data.venueAddress}
          </p>
        </div>

        <!-- Giờ & Ngày -->
        <div class="pt-4 border-t border-[#fce7f3] space-y-2">
          <p class="text-xs sm:text-sm font-semibold tracking-wider text-[#881337]">
            VÀO LÚC: <span class="font-bold text-sm sm:text-base font-serif">11 GIỜ 00</span>
          </p>
          <div class="flex items-center justify-center gap-3 py-2 border-y border-[#fda4af]/50 text-xs sm:text-sm font-bold text-[#881337]">
            <span>CHỦ NHẬT</span>
            <span class="text-2xl sm:text-3xl font-serif text-[#991b1b] font-extrabold">18.10.2026</span>
            <span>09 tháng 09 ÂL</span>
          </div>
        </div>

        <!-- Chân thiệp -->
        <div class="pt-4 flex items-center justify-between text-right">
          <div class="text-left">
            <span class="text-3xl">🐉</span>
            <span class="text-2xl">🌸</span>
          </div>
          <div>
            <p class="text-[10px] sm:text-[11px] font-semibold text-[#881337] leading-tight uppercase">
              SỰ HIỆN DIỆN CỦA QUÝ KHÁCH<br>
              LÀ LỜI CHÚC Ý NGHĨA NHẤT DÀNH<br>
              CHO BÉ VÀ GIA ĐÌNH
            </p>
            <div class="pt-2">
              <p class="text-xs sm:text-sm font-bold text-[#991b1b] uppercase font-serif">${data.parentNames}</p>
              <p class="text-[10px] sm:text-xs font-semibold text-[#b91c1c] uppercase">KÍNH MỜI!</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Album Ảnh Phá Cách (To nhỏ nghiêng qua lại tự nhiên) -->
    <div class="space-y-3 pt-2">
      <div class="text-center">
        <p class="font-cursive text-3xl sm:text-4xl text-[#991b1b]">Khoảnh Khắc Đáng Yêu Của Bé</p>
        <p class="text-xs text-slate-500">Album kỷ niệm tròn 1 tuổi (ảnh từ thư mục ./image/)</p>
      </div>

      <div class="grid grid-cols-12 gap-3 items-center pt-2">
        <!-- Ảnh 1: Lớn, nghiêng trái -3deg -->
        <div class="col-span-7 bg-white p-3 pb-5 rounded-2xl shadow-xl border border-rose-100 -rotate-3 hover:rotate-0 transition-transform">
          <div class="aspect-[3/4] rounded-xl overflow-hidden bg-rose-50">
            <img src="./image/baby-1.svg" onerror="this.src='./image/baby-1.jpg'" class="w-full h-full object-cover">
          </div>
          <p class="font-cursive text-xl text-[#991b1b] text-center mt-2">Bé Công Chúa Nhỏ</p>
        </div>

        <!-- Ảnh 2: Vừa, nghiêng phải +4deg -->
        <div class="col-span-5 bg-white p-2.5 pb-4 rounded-2xl shadow-xl border border-amber-100 rotate-4 hover:rotate-0 transition-transform -mt-6">
          <div class="aspect-[3/4] rounded-xl overflow-hidden bg-amber-50">
            <img src="./image/baby-2.svg" onerror="this.src='./image/baby-2.jpg'" class="w-full h-full object-cover">
          </div>
          <p class="font-cursive text-lg text-amber-900 text-center mt-1.5">Tung Tăng Bơi Lội</p>
        </div>
      </div>

      <!-- Ảnh 3: Đặt lệch, nghiêng nhẹ -2deg -->
      <div class="flex justify-end pr-4">
        <div class="w-48 bg-white p-3 pb-4 rounded-2xl shadow-xl border border-rose-100 -rotate-2 hover:rotate-0 transition-transform">
          <div class="aspect-[3/4] rounded-xl overflow-hidden bg-rose-50">
            <img src="./image/baby-3.svg" onerror="this.src='./image/baby-3.jpg'" class="w-full h-full object-cover">
          </div>
          <p class="font-cursive text-xl text-[#991b1b] text-center mt-2">Áo Dài Đón Tết</p>
        </div>
      </div>
    </div>

    <!-- Đếm ngược & Nút chỉ đường -->
    <div class="bg-white/95 rounded-3xl p-5 border border-[#fce7f3] shadow-md text-center space-y-3">
      <p class="text-xs font-semibold uppercase tracking-wider text-[#991b1b]">Đếm Ngược Ngày Thôi Nôi</p>
      <div id="countdown" class="text-2xl font-bold font-serif text-[#991b1b] tabular-nums">Đang tính...</div>
      <div class="pt-2">
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venueAddress)}" target="_blank" class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#991b1b] text-white text-xs font-semibold shadow-sm">
          Chỉ Đường Google Maps Đến Tư Gia
        </a>
      </div>
    </div>
  </main>

  <!-- Nút Bật/Tắt Nhạc & Bắn Pháo Hoa Nổi -->
  <div class="fixed bottom-5 right-5 z-40 flex items-center gap-2">
    <button onclick="burst()" class="p-3 rounded-full bg-amber-400 text-amber-950 shadow-lg text-lg">🎆</button>
    <button id="musicBtn" onclick="toggleAudio()" class="px-4 py-2.5 rounded-full bg-white border border-[#fce7f3] text-[#991b1b] font-semibold text-xs shadow-lg">
      🎵 Bật Nhạc
    </button>
  </div>

  <script>
    // Audio synthesizer
    let ctx = null, isPlaying = false, noteTimer = null;
    const notes = [
      { f: 261.63, d: 0.75 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 1 }, { f: 261.63, d: 1 }, { f: 349.23, d: 1 }, { f: 329.63, d: 2 },
      { f: 261.63, d: 0.75 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 1 }, { f: 261.63, d: 1 }, { f: 392.00, d: 1 }, { f: 349.23, d: 2 },
      { f: 261.63, d: 0.75 }, { f: 261.63, d: 0.25 }, { f: 523.25, d: 1 }, { f: 440.00, d: 1 }, { f: 349.23, d: 1 }, { f: 329.63, d: 1 }, { f: 293.66, d: 1.5 },
      { f: 493.88, d: 0.75 }, { f: 493.88, d: 0.25 }, { f: 440.00, d: 1 }, { f: 349.23, d: 1 }, { f: 392.00, d: 1 }, { f: 349.23, d: 2 },
      { f: 0, d: 1 }
    ];
    let noteIdx = 0;
    function playNote(freq, dur) {
      if (!ctx || freq <= 0) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur * 0.95);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch(e){}
    }
    function stepMusic() {
      if (!isPlaying) return;
      const n = notes[noteIdx];
      const dur = n.d * (60 / 110);
      if (n.f > 0) playNote(n.f, dur);
      noteIdx = (noteIdx + 1) % notes.length;
      noteTimer = setTimeout(stepMusic, dur * 1000);
    }
    function toggleAudio() {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      isPlaying = !isPlaying;
      if (isPlaying) {
        document.getElementById('musicBtn').innerText = '🎵 Tắt Nhạc';
        stepMusic();
      } else {
        document.getElementById('musicBtn').innerText = '🎵 Bật Nhạc';
        if (noteTimer) clearTimeout(noteTimer);
      }
    }

    // Countdown
    const target = new Date('${data.eventDate}').getTime();
    function tick() {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        document.getElementById('countdown').innerText = 'Hôm nay là ngày vui của bé!';
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      document.getElementById('countdown').innerText = d + ' Ngày ' + h + ' Giờ ' + m + ' Phút ' + s + ' Giây';
    }
    setInterval(tick, 1000);
    tick();

    // Lightweight Canvas Fireworks (Zero-lag, strictly capped)
    const canvas = document.getElementById('fireworksCanvas');
    const c = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
    let particles = [];
    const colors = ['#f43f5e', '#fb7185', '#f59e0b', '#fbbf24', '#ec4899'];

    function burst(x, y) {
      if (particles.length > 50) return;
      const px = x || (W * (0.3 + Math.random() * 0.4));
      const py = y || (H * (0.2 + Math.random() * 0.25));
      for (let i = 0; i < 30; i++) {
        const a = Math.random() * Math.PI * 2, sp = Math.random() * 3.5 + 1.2;
        particles.push({ x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, a: 1, c: colors[Math.floor(Math.random() * colors.length)] });
      }
    }
    setTimeout(() => burst(), 600);

    function loop() {
      if (document.hidden) { requestAnimationFrame(loop); return; }
      if (particles.length === 0) { c.clearRect(0, 0, W, H); requestAnimationFrame(loop); return; }
      c.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.a -= 0.02;
        if (p.a <= 0) { particles.splice(i, 1); continue; }
        c.save(); c.globalAlpha = p.a; c.fillStyle = p.c;
        c.beginPath(); c.arc(p.x, p.y, 2, 0, Math.PI * 2); c.fill(); c.restore();
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
  };

  const handleDownload = () => {
    const html = generateStandaloneHTML();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateStandaloneHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-rose-100 pb-4 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#991b1b] to-amber-500 text-white shadow-md">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-800">
              Xuất File index.html &amp; Thư Mục image/
            </h3>
            <p className="text-xs text-slate-500">
              Cấu trúc 1 file HTML và thư mục ảnh độc lập
            </p>
          </div>
        </div>

        {/* Folder Structure Preview */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2 mb-5">
          <div className="flex items-center gap-2 text-amber-400">
            <Folder className="w-4 h-4" />
            <span>image/</span>
          </div>
          <div className="pl-6 text-slate-400 space-y-1">
            <p>├── baby-1.svg (hoặc baby-1.jpg)</p>
            <p>├── baby-2.svg (hoặc baby-2.jpg)</p>
            <p>└── baby-3.svg (hoặc baby-3.jpg)</p>
          </div>
          <div className="flex items-center gap-2 text-rose-300 pt-1">
            <FileCode className="w-4 h-4" />
            <span>index.html (thiệp mời thôi nôi bé Dương An Khánh)</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          File <strong className="font-mono text-slate-900">index.html</strong> chứa toàn bộ giao diện thiệp vòm cung đúng như mẫu in thật, không bị giật lag, có nhạc nền và tự động liên kết tới ảnh trong thư mục <strong className="font-mono text-slate-900">./image/</strong>.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã chép mã' : 'Sao chép HTML'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#991b1b] hover:bg-[#881337] text-white text-xs font-bold shadow-lg shadow-rose-900/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Tải File index.html</span>
          </button>
        </div>
      </div>
    </div>
  );
};
