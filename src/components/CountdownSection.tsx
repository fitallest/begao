import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, Sparkles } from 'lucide-react';
import { InvitationData } from '../types';

interface CountdownSectionProps {
  data: InvitationData;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(data.eventDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.eventDate]);

  const getGoogleCalendarUrl = () => {
    const eventTime = new Date(data.eventDate);
    const endTime = new Date(eventTime.getTime() + 3 * 60 * 60 * 1000);
    const formatGCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const title = encodeURIComponent(`Thôi Nôi Bé ${data.babyName}`);
    const details = encodeURIComponent(
      `Tiệc Thôi Nôi bé ${data.babyName}.\nĐịa điểm: ${data.venueName} - ${data.venueAddress}.\nLiên hệ: ${data.parentNames} (${data.parentPhone})`
    );
    const location = encodeURIComponent(`${data.venueAddress}`);
    const dates = `${formatGCalDate(eventTime)}/${formatGCalDate(endTime)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const handleDownloadICS = () => {
    const eventTime = new Date(data.eventDate);
    const endTime = new Date(eventTime.getTime() + 3 * 60 * 60 * 1000);
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const formatICSDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Thoi Noi Duong An Khanh//VI',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(eventTime)}`,
      `DTEND:${formatICSDate(endTime)}`,
      `SUMMARY:Tiệc Thôi Nôi Bé ${data.babyName}`,
      `DESCRIPTION:Kính mời tham dự tiệc thôi nôi bé ${data.babyName}. Địa điểm: ${data.venueAddress}`,
      `LOCATION:${data.venueAddress}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Thoi-Noi-Be-${data.babyName.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border border-[#fce7f3] shadow-md text-center space-y-4 max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#991b1b]">
        <Clock className="w-4 h-4 text-[#e11d48]" />
        <span>Đếm Ngược Đến Giờ Khai Tiệc</span>
      </div>

      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        {data.eventTimeStr} • {data.eventDateDisplay}
      </p>

      {/* Countdown Digits */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-md mx-auto">
        <div className="p-3 rounded-2xl bg-[#fff5f7] border border-[#fce7f3]">
          <span className="text-2xl sm:text-3xl font-bold font-serif tabular-nums text-[#991b1b]">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1">Ngày</p>
        </div>

        <div className="p-3 rounded-2xl bg-[#fff5f7] border border-[#fce7f3]">
          <span className="text-2xl sm:text-3xl font-bold font-serif tabular-nums text-[#991b1b]">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1">Giờ</p>
        </div>

        <div className="p-3 rounded-2xl bg-[#fff5f7] border border-[#fce7f3]">
          <span className="text-2xl sm:text-3xl font-bold font-serif tabular-nums text-[#991b1b]">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1">Phút</p>
        </div>

        <div className="p-3 rounded-2xl bg-[#fff5f7] border border-[#fce7f3]">
          <span className="text-2xl sm:text-3xl font-bold font-serif tabular-nums text-[#be123c]">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1">Giây</p>
        </div>
      </div>

    </div>
  );
};
