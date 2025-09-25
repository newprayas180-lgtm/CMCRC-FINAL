import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_GALLERY_ALBUMS } from '../../constants';
import { GalleryAlbum } from '../../types';
import useOnScreen from '../hooks/useOnScreen';

const AlbumCard: React.FC<{ album: GalleryAlbum }> = ({ album }) => (
  <Link to={`/gallery/${album.id}`} className="group relative block bg-black rounded-lg overflow-hidden h-96">
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
  
  return (
    <PageWrapper>
      <SectionHeader title="Event Gallery" subtitle="A Visual Journey" />
      <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${isGridVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {MOCK_GALLERY_ALBUMS.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default GalleryPage;
