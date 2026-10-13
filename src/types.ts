export interface InvitationData {
  babyName: string;
  babyNickname: string;
  milestoneAge: string;
  eventDate: string; // ISO string or YYYY-MM-DDTHH:mm
  eventTimeStr: string;
  eventDateDisplay: string;
  venueName: string;
  venueAddress: string;
  mapQuery: string;
  parentPhone: string;
  parentNames: string;
  greetingMessage: string;
  photos: {
    id: string;
    title: string;
    subtitle: string;
    url: string;
    aspectRatio: string;
  }[];
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    branch: string;
  };
}

export interface WishItem {
  id: string;
  author: string;
  relation: string;
  message: string;
  timestamp: string;
  attending: boolean;
  guestCount: number;
}
