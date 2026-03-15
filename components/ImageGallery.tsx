"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";

interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  photos: GalleryPhoto[];
}

export default function ImageGallery({ photos }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* 1 col mobile · 2 col tablet · 3 col desktop */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: (index % 3) * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => setLightboxIndex(index)}
          >
            <div
              className="relative overflow-hidden rounded-lg placeholder-image transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <span className="text-sm">{photo.alt}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex(lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1)
          }
          onNext={() =>
            setLightboxIndex(lightboxIndex === photos.length - 1 ? 0 : lightboxIndex + 1)
          }
        />
      )}
    </>
  );
}
