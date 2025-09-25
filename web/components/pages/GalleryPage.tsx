import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_GALLERY_ALBUMS } from '../../constants';
import { GalleryAlbum } from '../../types';
import useOnScreen from '../hooks/useOnScreen';
import { sanityClient } from '../../lib/sanity.client';
import { ALBUMS } from '../../lib/queries';
import { urlFor } from '../../lib/image';

const AlbumCard: React.FC<{ album: GalleryAlbum & { slug?: string } }> = ({ album }) => (
  <Link to={`/gallery/${album.slug || album.id}`} className="group relative block bg-black rounded-lg overflow-hidden h-96">
    <img
      alt={album.title}
      src={album.coverImageUrl}
      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
    />
    <div className="relative p-8 flex flex-col justify-end h-full">
        <div>
          <h3 className="text-2xl font-bold text-white">{album.title}</h3>
          <p className="text-sm text-blue-200 mt-1">{album.images.length} Photos</p>
        </div>
    </div>
  </Link>
);


const GalleryPage: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isGridVisible = useOnScreen(gridRef);
    const [albums, setAlbums] = useState<Array<GalleryAlbum & { slug?: string }> | null>(null);

    useEffect(() => {
      let cancelled = false;
      (async () => {
        try {
          const res = await sanityClient.fetch<any[]>(ALBUMS);
          if (cancelled) return;
          const mapped: Array<GalleryAlbum & { slug?: string }> = (res || []).map((a, i) => ({
            id: i + 1,
            title: a.title || 'Album',
            coverImageUrl: a.coverImage ? urlFor(a.coverImage).width(800).height(800).fit('crop').url() : 'https://picsum.photos/800/800?random=88',
            images: Array.isArray(a.images) ? a.images.map((img: any, idx: number) => ({ id: idx + 1, imageUrl: urlFor(img).width(1200).height(800).fit('max').url(), caption: img.caption })) : [],
            slug: a.slug?.current,
          }));
          setAlbums(mapped);
        } catch {
          setAlbums(null);
        }
      })();
      return () => { cancelled = true };
    }, []);
  
  return (
    <PageWrapper>
      <SectionHeader title="Event Gallery" subtitle="A Visual Journey" />
      <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${isGridVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {(albums || MOCK_GALLERY_ALBUMS).map(album => (
          <AlbumCard key={(album as any).slug || album.id} album={album as any} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default GalleryPage;
