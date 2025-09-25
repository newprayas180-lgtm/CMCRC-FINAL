import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import { MOCK_GALLERY_ALBUMS } from '../../constants';
import useOnScreen from '../hooks/useOnScreen';
import { sanityClient } from '../../lib/sanity.client';
import { ALBUM_BY_SLUG } from '../../lib/queries';
import { urlFor } from '../../lib/image';

const AlbumDetailPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [album, setAlbum] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!albumId) return;
      const numericId = Number(albumId);
      if (!Number.isNaN(numericId)) {
        const mock = MOCK_GALLERY_ALBUMS.find(a => a.id === numericId);
        setAlbum(mock || null);
        return;
      }
      try {
        const res = await sanityClient.fetch<any>(ALBUM_BY_SLUG, { slug: albumId });
        if (cancelled) return;
        if (res) {
          setAlbum({
            id: res.slug?.current || 1,
            title: res.title || 'Album',
            images: Array.isArray(res.images) ? res.images.map((img: any, idx: number) => ({ id: idx + 1, imageUrl: urlFor(img).width(1400).height(900).fit('max').url(), caption: img.caption })) : [],
          });
        } else {
          setAlbum(null);
        }
      } catch {
        setAlbum(null);
      }
    })();
    return () => { cancelled = true };
  }, [albumId]);

  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useOnScreen(gridRef);

  if (!album) {
    return (
      <PageWrapper>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800">Album not found</h1>
          <p className="mt-4 text-slate-600">The album you're looking for doesn't exist.</p>
          <div className="mt-8">
            <Link to="/gallery" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              &larr; Back to All Albums
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <>
      <header className="bg-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{album.title}</h1>
        </div>
      </header>

      <PageWrapper>
        <div className="mb-12">
            <Link to="/gallery" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors group/link flex items-center w-fit">
                 <span className="inline-block transition-transform group-hover/link:-translate-x-1">&larr;</span>&nbsp;Back to All Albums
            </Link>
        </div>

        {album.images.length > 0 ? (
            <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${isGridVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
                {album.images.map(image => (
                    <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
                        <img src={image.imageUrl} alt={image.caption || `Image ${image.id} from ${album.title}`} className="w-full h-64 object-cover" />
                        {image.caption && (
                            <div className="p-4 bg-slate-50 border-t border-slate-200">
                                <p className="text-slate-700">{image.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-xl text-slate-500">There are no photos in this album yet.</p>
            </div>
        )}
      </PageWrapper>
    </>
  );
};

export default AlbumDetailPage;
