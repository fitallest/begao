import React, { useState } from 'react';
import { Heart, Send, MessageSquareHeart, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { WishItem } from '../types';

interface RSVPAndWishesProps {
  wishes: WishItem[];
  onAddWish: (wish: WishItem) => void;
  onFireworkBurst: () => void;
}

export const RSVPAndWishes: React.FC<RSVPAndWishesProps> = ({
  wishes,
  onAddWish,
  onFireworkBurst,
}) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Bạn bè ba mẹ');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [attending, setAttending] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      author: name.trim(),
      relation,
      message: message.trim(),
      timestamp: 'Vừa xong',
      attending,
      guestCount,
    };

    onAddWish(newWish);
    onFireworkBurst();
    setSubmitted(true);
    setName('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="rsvp-section" className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/80 shadow-xl p-6 sm:p-10 space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Sổ Lưu Bút &amp; RSVP</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 tracking-tight">
          Gửi Lời Chúc &amp; Xác Nhận Tham Dự
        </h2>
        <p className="text-slate-500 text-sm">
          Mỗi lời chúc là món quà tinh thần quý giá dành tặng em bé trong ngày sinh nhật 1 tuổi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Form */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-50/60 to-white p-6 rounded-2xl border border-rose-200/80 shadow-sm">
          <h3 className="font-serif font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>Xác Nhận Tham Dự</span>
          </h3>

          {submitted && (
            <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-semibold">Cảm ơn bạn rất nhiều!</p>
                <p className="text-xs text-emerald-700">Lời chúc và xác nhận tham dự đã được lưu lại.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Tên Của Bạn / Gia Đình *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Cô Minh Thư, Bác Hùng..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Mối Quan Hệ
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all bg-white"
                >
                  <option value="Ông Bà">Ông Bà</option>
                  <option value="Cô Chú">Cô Chú</option>
                  <option value="Dì Bác">Dì Bác</option>
                  <option value="Bạn bè ba mẹ">Bạn bè ba mẹ</option>
                  <option value="Đồng nghiệp">Đồng nghiệp</option>
                  <option value="Người thân">Người thân</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Số Người Đi
                </label>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all bg-white"
                  >
                    <option value={1}>1 Người</option>
                    <option value={2}>2 Người</option>
                    <option value={3}>3 Người</option>
                    <option value={4}>4+ Người (Cả nhà)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Bạn Sẽ Đến Chung Vui Chứ?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    attending
                      ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  🎉 Chắc chắn sẽ đến!
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    !attending
                      ? 'bg-slate-700 text-white border-slate-800 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Tiếc quá, gửi lời chúc thôi
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Lời Chúc Dành Cho Bé *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Chúc bé hay ăn chóng lớn, luôn vui vẻ và hạnh phúc..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold text-sm shadow-md shadow-rose-500/25 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Gửi Lời Chúc &amp; Bắn Pháo Hoa</span>
            </button>
          </form>
        </div>

        {/* Right column: Live wishes list */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-slate-800 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Lời Chúc Yêu Thương ({wishes.length})</span>
            </h3>
            <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Trực tiếp
            </span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-2xl bg-white border border-rose-100/90 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">{w.author}</span>
                    <span className="text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md font-medium border border-rose-200/60">
                      {w.relation}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{w.timestamp}</span>
                </div>

                <p className="text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{w.message}&rdquo;
                </p>

                {w.attending && (
                  <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tham dự cùng gia đình ({w.guestCount} người)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
