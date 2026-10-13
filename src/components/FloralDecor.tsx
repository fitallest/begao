import React from 'react';

// SVG Watercolor Blossom for top corners and bottom corner of the card
export const CherryBlossom: React.FC<{ className?: string; flipped?: boolean }> = ({
  className = '',
  flipped = false,
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`w-16 h-16 sm:w-20 sm:h-20 pointer-events-none select-none ${flipped ? '-scale-x-100' : ''} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Branch */}
      <path
        d="M10 110 C 35 85, 55 60, 95 35"
        stroke="#854d0e"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M45 70 C 60 55, 75 52, 90 60"
        stroke="#854d0e"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Main flower */}
      <g transform="translate(65, 45)">
        {/* 5 Pink Petals */}
        <ellipse cx="0" cy="-14" rx="10" ry="14" fill="#fda4af" opacity="0.85" />
        <ellipse cx="13" cy="-4" rx="10" ry="14" transform="rotate(72, 13, -4)" fill="#f43f5e" opacity="0.75" />
        <ellipse cx="8" cy="12" rx="10" ry="14" transform="rotate(144, 8, 12)" fill="#fda4af" opacity="0.85" />
        <ellipse cx="-8" cy="12" rx="10" ry="14" transform="rotate(216, -8, 12)" fill="#fb7185" opacity="0.8" />
        <ellipse cx="-13" cy="-4" rx="10" ry="14" transform="rotate(288, -13, -4)" fill="#fda4af" opacity="0.85" />
        {/* Center pistils */}
        <circle cx="0" cy="0" r="4" fill="#fbbf24" />
        <circle cx="0" cy="0" r="2" fill="#b45309" />
      </g>

      {/* Secondary smaller flower */}
      <g transform="translate(35, 75) scale(0.7)">
        <ellipse cx="0" cy="-14" rx="10" ry="14" fill="#fbcfe8" opacity="0.85" />
        <ellipse cx="13" cy="-4" rx="10" ry="14" transform="rotate(72, 13, -4)" fill="#fda4af" opacity="0.8" />
        <ellipse cx="8" cy="12" rx="10" ry="14" transform="rotate(144, 8, 12)" fill="#fbcfe8" opacity="0.85" />
        <ellipse cx="-8" cy="12" rx="10" ry="14" transform="rotate(216, -8, 12)" fill="#fda4af" opacity="0.8" />
        <ellipse cx="-13" cy="-4" rx="10" ry="14" transform="rotate(288, -13, -4)" fill="#fbcfe8" opacity="0.85" />
        <circle cx="0" cy="0" r="3.5" fill="#f59e0b" />
      </g>
    </svg>
  );
};

// Cute Chibi Mascot with Birthday Number 1 (Matching the card in user's photo)
export const ChibiDragonMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-end select-none ${className}`}>
      <svg
        viewBox="0 0 160 180"
        className="w-28 h-32 sm:w-36 sm:h-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="numGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe4e6" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>

        {/* Number 1 Statue on the left */}
        <g transform="translate(10, 20)">
          {/* Big number 1 */}
          <path
            d="M25 35 L40 20 L55 20 L55 130 L30 130 L30 135 L75 135 L75 130 L55 130 L55 35 L38 48 Z"
            fill="url(#numGrad)"
            stroke="#ffffff"
            strokeWidth="3"
          />
          {/* Daisy flower on top of 1 */}
          <circle cx="48" cy="22" r="5" fill="#fbbf24" />
          <circle cx="48" cy="14" r="3.5" fill="#ffffff" />
          <circle cx="56" cy="19" r="3.5" fill="#ffffff" />
          <circle cx="54" cy="28" r="3.5" fill="#ffffff" />
          <circle cx="42" cy="28" r="3.5" fill="#ffffff" />
          <circle cx="40" cy="19" r="3.5" fill="#ffffff" />
        </g>

        {/* Adorable Pink Baby Dragon / Mascot sitting on the right */}
        <g transform="translate(90, 85)">
          {/* Coiled dragon tail & body */}
          <path
            d="M-30 45 C-10 65, 30 65, 45 45 C55 30, 45 15, 30 18 C15 22, 10 35, -5 32 C-20 30, -35 25, -30 45 Z"
            fill="#fb7185"
            stroke="#f43f5e"
            strokeWidth="2"
          />
          {/* Belly ridges */}
          <path d="M-15 48 Q 0 54 15 48" stroke="#ffe4e6" strokeWidth="3" fill="none" />
          <path d="M-10 40 Q 5 46 20 40" stroke="#ffe4e6" strokeWidth="3" fill="none" />

          {/* Dragon Head */}
          <ellipse cx="5" cy="-5" rx="38" ry="34" fill="#fff1f2" stroke="#fda4af" strokeWidth="2.5" />
          
          {/* Rosy Cheeks */}
          <ellipse cx="-18" cy="5" rx="8" ry="5" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="28" cy="5" rx="8" ry="5" fill="#f43f5e" opacity="0.4" />

          {/* Big Sparkly Anime Eyes */}
          <ellipse cx="-10" cy="-8" rx="8.5" ry="11" fill="#881337" />
          <circle cx="-12" cy="-12" r="3.5" fill="#ffffff" />
          <circle cx="-7" cy="-5" r="1.5" fill="#ffffff" />

          <ellipse cx="20" cy="-8" rx="8.5" ry="11" fill="#881337" />
          <circle cx="18" cy="-12" r="3.5" fill="#ffffff" />
          <circle cx="23" cy="-5" r="1.5" fill="#ffffff" />

          {/* Sweet Smile */}
          <path d="M 0 10 Q 5 16 10 10" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Cute Little Dragon Horns with flowers */}
          <path d="M-15 -35 Q-18 -48 -12 -50 Q-6 -45 -8 -34" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <path d="M25 -35 Q28 -48 22 -50 Q16 -45 18 -34" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />

          {/* Crown / Flower tiara */}
          <path d="M-8 -38 L5 -46 L18 -38 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
          <circle cx="5" cy="-44" r="3" fill="#e11d48" />

          {/* Cute Tiny Paws */}
          <ellipse cx="-5" cy="18" rx="7" ry="6" fill="#fed7aa" stroke="#f43f5e" strokeWidth="1.5" />
          <ellipse cx="15" cy="18" rx="7" ry="6" fill="#fed7aa" stroke="#f43f5e" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};
