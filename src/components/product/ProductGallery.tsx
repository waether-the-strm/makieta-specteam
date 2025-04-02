import React, { useState, useCallback, memo, useEffect } from "react";

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
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Użyj zdjęć z props jeśli są dostępne, w przeciwnym razie użyj domyślnych
  const displayImages = images.length > 0 ? images : DEFAULT_IMAGES;

  // Stan dla głównego zdjęcia z wartością początkową
  const [mainImageSrc, setMainImageSrc] = useState(displayImages[0]);

  // Aktualizuj główne zdjęcie przy zmianie wybranego indeksu
  useEffect(() => {
    const newSrc = failedImages.has(selectedImage)
      ? DEFAULT_IMAGES[selectedImage % DEFAULT_IMAGES.length]
      : displayImages[selectedImage];
    setMainImageSrc(newSrc);
  }, [selectedImage, displayImages, failedImages]);

  const handleImageError = useCallback(
    (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
      const target = event.currentTarget;
      if (!target || failedImages.has(index)) return;

      console.log(`[ProductGallery] Image load error for index ${index}:`, {
        failedUrl: target.src,
        isMainImage:
          target.parentElement?.className === "product__gallery-main",
      });

      const fallbackIndex = index % DEFAULT_IMAGES.length;
      const fallbackSrc = DEFAULT_IMAGES[fallbackIndex];

      // Aktualizuj źródło obrazu
      target.src = fallbackSrc;

      // Jeśli to główne zdjęcie, zaktualizuj również stan
      if (target.parentElement?.className === "product__gallery-main") {
        setMainImageSrc(fallbackSrc);
      }

      setFailedImages((prev) => new Set([...prev, index]));
    },
    [failedImages]
  );

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  return (
    <div className="product__gallery">
      <div className="product__gallery-main">
        <img
          src={mainImageSrc}
          alt={`Widok produktu ${selectedImage + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300"
          onError={(e) => handleImageError(selectedImage, e)}
        />
      </div>
      <div className="product__gallery-thumbs">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={`product__gallery-thumb ${
              selectedImage === index ? "active" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
