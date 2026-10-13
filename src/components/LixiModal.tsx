import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, X, Heart } from 'lucide-react';
import { InvitationData } from '../types';

interface LixiModalProps {
  data: InvitationData;
  isOpen: boolean;
  onClose: () => void;
}

export const LixiModal: React.FC<LixiModalProps> = ({ data, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(data.bankInfo.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-rose-500/25 mb-4">
          <Gift className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-serif font-bold text-slate-800">
          Gửi Quà Mừng &amp; Lì Xì Cho Bé
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto">
          Dành cho những người thân yêu ở xa muốn gửi lời chúc may mắn và món quà đầu đời đến bé {data.babyName}
        </p>

        {/* Bank Box */}
        <div className="mt-6 p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-left space-y-3">
          <div className="flex items-center justify-between text-xs text-rose-800 font-semibold border-b border-rose-200/60 pb-2">
            <span>Ngân hàng: {data.bankInfo.bankName}</span>
            <QrCode className="w-4 h-4 text-rose-600" />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500">Số tài khoản</span>
            <div className="flex items-center justify-between mt-0.5">
              <span className="font-mono text-xl font-bold text-slate-900 tracking-wider">
                {data.bankInfo.accountNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium shadow-sm transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500">Chủ tài khoản</span>
            <p className="font-semibold text-slate-800 text-sm">{data.bankInfo.accountHolder}</p>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500">Nội dung chuyển</span>
            <p className="text-xs font-mono text-rose-700 bg-white p-2 rounded-lg border border-rose-200">
              Mung Thoi Noi {data.babyNickname.replace(/[^\w\s]/gi, '')} - [Ten cua ban]
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Gia đình xin trân trọng cảm ơn tình cảm của quý vị!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
