'use client';

import { useState } from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    title: 'Single Occupancy Room',
    desc: 'Spacious room with study desk and natural light',
  },
  {
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    title: 'Double Sharing Room',
    desc: 'Comfortable beds with ample storage space',
  },
  {
    url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
    title: 'Triple Sharing Room',
    desc: 'Most affordable option with all amenities',
  },
  {
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    title: 'Common Area',
    desc: 'TV area and relaxation space',
  },
  {
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    title: 'Kitchen',
    desc: 'Common kitchen for all residents',
  },
  {
    url: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800',
    title: 'Study Area',
    desc: 'Dedicated study space with WiFi',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, i) => (
          <div
            key={i}
            className="relative group cursor-pointer rounded-xl overflow-hidden aspect-[4/3]"
            onClick={() => setSelectedImage(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-semibold">{image.title}</h3>
              <p className="text-sm text-white/80">{image.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1);
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0);
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-semibold">{images[selectedImage].title}</h3>
              <p className="text-gray-300">{images[selectedImage].desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
