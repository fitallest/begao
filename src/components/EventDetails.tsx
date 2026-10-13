import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Copy, Check, ExternalLink, Phone, Gift, Music2 } from 'lucide-react';
import { InvitationData } from '../types';

interface EventDetailsProps {
  data: InvitationData;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${data.venueName}, ${data.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timelineItems = [
    {
      time: '10:30',
      title: 'Đón Tiếp Khách Quý',
      desc: 'Check-in, chụp hình lưu niệm cùng bé tại Photobooth hoa tươi',
      icon: Calendar,
      color: 'bg-rose-500',
    },
    {
      time: '11:15',
      title: 'Nghi Thức Thổi Nến & Cắt Bánh',
      desc: 'Chiếu video 365 ngày đáng yêu của bé và hát mừng sinh nhật 1 tuổi',
      icon: Music2,
      color: 'bg-amber-500',
    },
    {
      time: '11:30',
      title: 'Khai Tiệc Thân Mật',
      desc: 'Thưởng thức thực đơn ẩm thực đặc sắc và nâng ly chúc mừng bé',
      icon: Clock,
      color: 'bg-emerald-500',
    },
    {
      time: '12:15',
      title: 'Nghi Thức Bốc Đồ Vật Thôi Nôi',
      desc: 'Khoảnh khắc truyền thống hồi hộp đoán nghề nghiệp tương lai của bé',
      icon: Gift,
      color: 'bg-indigo-500',
    },
    {
      time: '12:45',
      title: 'Trò Chơi Minigame & Tặng Quà',
      desc: 'Minigame vui nhộn nhận quà kỷ niệm và chào tạm biệt khách quý',
      icon: MapPin,
      color: 'bg-purple-500',
    },
  ];

  return (
    <section id="venue-section" className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/80 shadow-xl p-6 sm:p-10 space-y-8">
      {/* Section Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          <MapPin className="w-3.5 h-3.5" />
          <span>Thời Gian &amp; Địa Điểm</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 tracking-tight">
          Thông Tin Buổi Tiệc Thôi Nôi
        </h2>
        <p className="text-slate-500 text-sm">
          Sự hiện diện của quý khách là niềm hạnh phúc lớn lao của gia đình chúng tôi
        </p>
      </div>

      {/* Grid: Time & Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Card */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-white to-amber-50/40 border border-rose-200/80 shadow-sm">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <Clock className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-700">
                Thời Gian Tổ Chức
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-800 mt-1">
                {data.eventTimeStr}
              </h3>
              <p className="text-rose-600 font-medium text-base mt-1">
                {data.eventDateDisplay}
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              * Khách quý vui lòng đến đúng giờ để cùng lưu lại những tấm hình thật đẹp cùng bé trước khi khai tiệc nhé!
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-rose-100 flex items-center gap-2 text-xs text-slate-600">
            <Phone className="w-4 h-4 text-rose-500" />
            <span>Hotline hỗ trợ: <strong className="text-slate-800">{data.parentPhone}</strong></span>
          </div>
        </div>

        {/* Location Card */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-rose-50 border border-amber-200/80 shadow-sm">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <MapPin className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-700">
                Địa Điểm Tổ Chức
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-800 mt-1">
                {data.venueName}
              </h3>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                {data.venueAddress}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 mt-4 border-t border-amber-100 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200 shadow-sm transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Đã chép địa chỉ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sao chép địa chỉ</span>
                </>
              )}
            </button>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                data.venueAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Chỉ đường Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="pt-6 border-t border-rose-100">
        <h3 className="text-lg font-serif font-bold text-slate-800 mb-6 text-center">
          Chương Trình Lễ Thôi Nôi
        </h3>

        <div className="max-w-xl mx-auto space-y-4">
          {timelineItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-3.5 rounded-2xl bg-rose-50/40 hover:bg-rose-50/80 border border-rose-100 transition-colors"
              >
                <div className={`p-2.5 rounded-xl ${item.color} text-white shrink-0 shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-slate-800 text-sm">{item.title}</h4>
                    <span className="font-mono text-xs font-bold text-rose-600 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
