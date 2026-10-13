import React, { useState } from 'react';
import { Settings, Save, RotateCcw, X, Sparkles } from 'lucide-react';
import { InvitationData } from '../types';

interface CustomizerModalProps {
  data: InvitationData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: InvitationData) => void;
  onReset: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  data,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<InvitationData>(data);

  if (!isOpen) return null;

  const handleChange = (field: keyof InvitationData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-rose-100 pb-4 mb-6">
          <div className="p-2.5 rounded-xl bg-rose-500 text-white shadow-md">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-800">
              Tùy Chỉnh Thông Tin Thiệp Mời
            </h3>
            <p className="text-xs text-slate-500">
              Chỉnh sửa thông tin bé, ngày giờ, địa điểm tổ chức để chia sẻ tới khách quý
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-left text-sm">
          {/* Baby Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Tên Bé (Họ và Tên)
              </label>
              <input
                type="text"
                required
                value={formData.babyName}
                onChange={(e) => handleChange('babyName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Tên Thân Mật / Biệt Danh
              </label>
              <input
                type="text"
                required
                value={formData.babyNickname}
                onChange={(e) => handleChange('babyNickname', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Ngày &amp; Giờ Tiệc (Dùng đếm ngược)
              </label>
              <input
                type="datetime-local"
                required
                value={formData.eventDate}
                onChange={(e) => handleChange('eventDate', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Hiển Thị Ngày Trong Thiệp
              </label>
              <input
                type="text"
                required
                value={formData.eventDateDisplay}
                onChange={(e) => handleChange('eventDateDisplay', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
              />
            </div>
          </div>

          {/* Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Tên Nhà Hàng / Địa Điểm
              </label>
              <input
                type="text"
                required
                value={formData.venueName}
                onChange={(e) => handleChange('venueName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Số Điện Thoại Liên Hệ
              </label>
              <input
                type="text"
                required
                value={formData.parentPhone}
                onChange={(e) => handleChange('parentPhone', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Địa Chỉ Chi Tiết
            </label>
            <input
              type="text"
              required
              value={formData.venueAddress}
              onChange={(e) => handleChange('venueAddress', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
            />
          </div>

          {/* Parents & Greeting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Tên Ba Mẹ
              </label>
              <input
                type="text"
                required
                value={formData.parentNames}
                onChange={(e) => handleChange('parentNames', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Lời Mời Từ Ba Mẹ
            </label>
            <textarea
              rows={3}
              required
              value={formData.greetingMessage}
              onChange={(e) => handleChange('greetingMessage', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm('Khôi phục lại thông tin ban đầu?')) {
                  onReset();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Khôi phục mặc định</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Thay Đổi</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
