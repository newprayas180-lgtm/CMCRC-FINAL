export enum EventStatus {
  Upcoming = 'Upcoming',
  Past = 'Past',
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description:string;
  imageUrl: string;
  status: EventStatus;
}

export interface Publication {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  link: string;
  imageUrl: string;
}

export interface Resource {
    id: number;
    title: string;
    description: string;
    link: string;
    type: 'Download' | 'External Link';
}

export interface GalleryImage {
    id: number;
    imageUrl: string;
    caption?: string;
}

export interface GalleryAlbum {
    id: number;
    title: string;
    coverImageUrl: string;
    images: GalleryImage[];
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
    category: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}
