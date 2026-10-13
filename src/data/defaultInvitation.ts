import { InvitationData, WishItem } from '../types';

export const initialInvitationData: InvitationData = {
  babyName: 'Dương An Khánh',
  babyNickname: 'Bé An Khánh 🌸',
  milestoneAge: 'Mừng Thôi Nôi',
  eventDate: '2026-10-18T11:00',
  eventTimeStr: '11 Giờ 00 Sáng',
  eventDateDisplay: 'Chủ Nhật, 18.10.2026 (09.09 ÂL)',
  venueName: 'Tư Gia',
  venueAddress: 'Khóm Hóa Thành - Phường Đông Thành - Tỉnh Vĩnh Long',
  mapQuery: 'Khóm Hóa Thành Phường Đông Thành Vĩnh Long',
  parentPhone: '0908 123 456',
  parentNames: 'TRUNG - HON',
  greetingMessage:
    'SỰ HIỆN DIỆN CỦA QUÝ KHÁCH LÀ LỜI CHÚC Ý NGHĨA NHẤT DÀNH CHO BÉ VÀ GIA ĐÌNH',
  photos: [
    {
      id: 'photo-1',
      title: 'Bé Công Chúa Nhỏ',
      subtitle: 'Đầm ren trắng kiêu sa tròn 1 tuổi',
      url: '/image/baby-1.svg',
      aspectRatio: '3:4',
    },
    {
      id: 'photo-2',
      title: 'Tung Tăng Bơi Lội',
      subtitle: 'Mùa hè vui đùa cùng vịt vàng',
      url: '/image/baby-2.svg',
      aspectRatio: '3:4',
    },
    {
      id: 'photo-3',
      title: 'Áo Dài Đón Tết',
      subtitle: 'Nét duyên dáng sum vầy yêu thương',
      url: '/image/baby-3.svg',
      aspectRatio: '3:4',
    },
    {
      id: 'photo-4',
      title: 'Chiếc Bánh Đầu Đời',
      subtitle: 'Khoảnh khắc thổi nến ước nguyện tuổi mới',
      url: '/image/baby-4.svg',
      aspectRatio: '3:4',
    },
    {
      id: 'photo-5',
      title: 'Bước Chân Đầu Đời',
      subtitle: 'Nụ cười rạng rỡ 365 ngày khôn lớn',
      url: '/image/baby-5.svg',
      aspectRatio: '3:4',
    },
  ],
  bankInfo: {
    bankName: 'Vietcombank',
    accountNumber: '1018868686',
    accountHolder: 'DUONG AN KHANH',
    branch: 'Vĩnh Long',
  },
};

export const initialWishes: WishItem[] = [
  {
    id: 'w-1',
    author: 'Ông Bà Nội Ngoại',
    relation: 'Ông Bà',
    message: 'Chúc cháu gái An Khánh hay ăn chóng lớn, luôn bình an, ngoan ngoãn và mạnh khỏe!',
    timestamp: 'Hôm nay',
    attending: true,
    guestCount: 2,
  },
];
