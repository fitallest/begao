import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollCueAndNudgeProps {
  targetId?: string;
}

export const ScrollCueAndNudge: React.FC<ScrollCueAndNudgeProps> = ({
  targetId = 'photo-scrapbook',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const isNudgingRef = useRef(false);
  const nudgeTimeoutRef = useRef<number | null>(null);
  const lastUserInteractionRef = useRef<number>(Date.now());
  const nudgeIntervalRef = useRef<number | null>(null);

  // Theo dõi vị trí cuộn để ẩn/hiện nút chỉ báo
  useEffect(() => {
    const handleScroll = () => {
      if (!isNudgingRef.current) {
        lastUserInteractionRef.current = Date.now();
      }

      // Khi người dùng cuộn xuống quá 70px thì ẩn nút
      if (window.scrollY > 70) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ghi nhận bất kỳ tương tác chủ động nào của người dùng để tránh can thiệp
  useEffect(() => {
    const recordUserAction = () => {
      lastUserInteractionRef.current = Date.now();
      // Nếu đang trong nhịp trả về mà người dùng chạm vào, hủy trả về ngay
      if (nudgeTimeoutRef.current) {
        window.clearTimeout(nudgeTimeoutRef.current);
        nudgeTimeoutRef.current = null;
        isNudgingRef.current = false;
      }
    };

    const events = ['touchstart', 'wheel', 'pointerdown', 'keydown', 'mousedown'];
    events.forEach((ev) => window.addEventListener(ev, recordUserAction, { passive: true }));

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, recordUserAction));
    };
  }, []);

  // Thực hiện nhịp cuộn nhẹ xuống ~55px-70px rồi trả lại vị trí cũ
  const triggerNudge = () => {
    // Chỉ cuộn nhẹ khi người dùng đang ở đầu trang và không tương tác trong 3 giây qua
    if (window.scrollY > 25) return;
    if (Date.now() - lastUserInteractionRef.current < 3000) return;
    if (document.visibilityState !== 'visible') return;

    isNudgingRef.current = true;
    const nudgeDistance = window.innerWidth < 640 ? 55 : 75;

    // Cuộn mượt xuống một chút
    window.scrollTo({
      top: nudgeDistance,
      behavior: 'smooth',
    });

    // Giữ khoảng 550ms rồi trượt êm trở lại đỉnh trang
    nudgeTimeoutRef.current = window.setTimeout(() => {
      // Chỉ trả về nếu người dùng chưa tự ý cuộn sâu hơn
      if (window.scrollY <= nudgeDistance + 25) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
      setTimeout(() => {
        isNudgingRef.current = false;
      }, 450);
    }, 550);
  };

  // Khởi tạo chu kỳ cuộn gợi ý
  useEffect(() => {
    // Lần nhấp nhẹ đầu tiên sau 3.8 giây vào trang
    const initialTimer = window.setTimeout(() => {
      triggerNudge();
    }, 3800);

    // Định kỳ mỗi 11 giây nếu người dùng vẫn giữ nguyên ở đầu trang
    nudgeIntervalRef.current = window.setInterval(() => {
      triggerNudge();
    }, 11000);

    return () => {
      window.clearTimeout(initialTimer);
      if (nudgeIntervalRef.current) window.clearInterval(nudgeIntervalRef.current);
      if (nudgeTimeoutRef.current) window.clearTimeout(nudgeTimeoutRef.current);
    };
  }, []);

  const handleScrollClick = () => {
    lastUserInteractionRef.current = Date.now();
    if (nudgeTimeoutRef.current) {
      window.clearTimeout(nudgeTimeoutRef.current);
      isNudgingRef.current = false;
    }

    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.75, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={handleScrollClick}
        className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#fda4af] text-[#991b1b] shadow-xl shadow-rose-950/10 hover:bg-rose-50 hover:border-[#f43f5e] active:scale-95 transition-all text-xs sm:text-sm font-semibold select-none cursor-pointer"
        title="Cuộn xuống xem album ảnh của bé"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f43f5e] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e11d48]"></span>
        </span>
        <span className="tracking-wide">Cuộn xem album bé Gạo</span>
        <ChevronDown className="w-4 h-4 text-[#e11d48] animate-bounce" />
      </button>
    </div>
  );
};
