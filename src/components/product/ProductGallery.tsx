import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
}

// Domyślne zdjęcia z domeny specteam.pl
const DEFAULT_IMAGES = [
  // TX
  "https://www.specteam.pl/products/TX/pics/m11.jpg",
  "https://www.specteam.pl/products/TX/pics/m12.jpg",
  "https://www.specteam.pl/products/TX/pics/1.jpg",
  "https://www.specteam.pl/products/TX/pics/3.jpg",
  // video_recorder
  "https://www.specteam.pl/products/video_recorder/pics/a.jpg",
  "https://www.specteam.pl/products/video_recorder/pics/b.jpg",
  "https://www.specteam.pl/products/video_recorder/pics/c.jpg",
  "https://www.specteam.pl/products/video_recorder/pics/1.jpg",
];

const ProductGallery: React.FC<ProductGalleryProps> = memo(({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const displayImages = images.length > 0 ? images : DEFAULT_IMAGES;

  const displayIndex = previewIndex !== null ? previewIndex : selectedImage;

  const mainImageSrc = failedImages.has(displayIndex)
    ? DEFAULT_IMAGES[displayIndex % DEFAULT_IMAGES.length]
    : displayImages[displayIndex];

  const handleImageError = useCallback(
    (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
      const target = event.currentTarget;
      if (!target || failedImages.has(index)) return;

      console.log(`[ProductGallery] Image load error for index ${index}:`, {
        failedUrl: target.src,
        isMainImage: target.dataset.isMain === "true",
      });

      setFailedImages((prev) => new Set([...prev, index]));
    },
    [failedImages]
  );

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImage(index);
    setPreviewIndex(null);
  }, []);

  const handleMouseEnter = (index: number) => {
    setPreviewIndex(index);
  };

  const handleMouseLeave = () => {
    setPreviewIndex(null);
  };

  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  return (
    <div className="product__gallery">
      <div className="product__gallery-main">
        <AnimatePresence initial={false}>
          <motion.img
            key={displayIndex}
            src={mainImageSrc}
            alt={`Widok produktu ${displayIndex + 1}`}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full object-contain absolute inset-0"
            data-is-main="true"
            onError={(e) => handleImageError(displayIndex, e)}
          />
        </AnimatePresence>
      </div>
      <div className="product__gallery-thumbs" onMouseLeave={handleMouseLeave}>
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={`product__gallery-thumb flex-shrink-0 ${
              selectedImage === index && previewIndex === null ? "active" : ""
            } ${previewIndex === index ? "previewing" : ""}`}
            onClick={() => handleThumbnailClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <img
              src={image}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => handleImageError(index, e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

ProductGallery.displayName = "ProductGallery";

export default ProductGallery;
