export type Language = 'en' | 'ol';

export interface Notice {
  id: string;
  titleEn: string;
  titleOl: string;
  contentEn: string;
  contentOl: string;
  date: string;
  isImportant: boolean;
  link?: string;
}

export interface Member {
  id: string;
  nameEn: string;
  nameOl: string;
  designationEn: string;
  designationOl: string;
  roleEn: string;
  roleOl: string;
  photoUrl: string;
  contact?: string;
  order: number;
}

export interface Event {
  id: string;
  titleEn: string;
  titleOl: string;
  descriptionEn: string;
  descriptionOl: string;
  date: string;
  images: string[];
  year: number;
  category: 'Annual Picnic' | 'Freshers Welcome' | 'Other';
}

export interface Achievement {
  id: string;
  nameEn: string;
  nameOl: string;
  exam: 'WBJEE' | 'IITJEE' | 'AIEEE';
  rank: number;
  year: number;
  descriptionEn: string;
  descriptionOl: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: 'Events' | 'Awards' | 'Community Activities' | 'Freshers Welcome' | 'Annual Picnic';
  captionEn: string;
  captionOl: string;
}
