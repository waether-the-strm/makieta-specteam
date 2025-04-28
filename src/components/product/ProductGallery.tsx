import React, { useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductGalleryProps {
  images: string[]
}

const ProductGallery: React.FC<ProductGalleryProps> = memo(({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const handleThumbnailClick = useCallback(
    (index: number) => {
      if (images && index >= 0 && index < images.length) {
        setSelectedImage(index)
        setPreviewIndex(null)
      }
    },
    [images]
  )

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')

  const getFullImageUrl = (imagePath: string): string => {
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    if (imagePath.startsWith('/')) {
      const effectiveBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
      return `${effectiveBaseUrl}${imagePath}`
    }
    return imagePath
  }

  const displayImages = images
  if (!displayImages || displayImages.length === 0) {
    return <div className="product__gallery-placeholder">Brak zdjęć produktu</div>
  }

  const displayIndex = previewIndex !== null ? previewIndex : selectedImage
  const mainImageSrc = getFullImageUrl(displayImages[displayIndex])

  const handleMouseEnter = (index: number) => {
    if (index >= 0 && index < displayImages.length) {
      setPreviewIndex(index)
    }
  }

  const handleMouseLeave = () => {
    setPreviewIndex(null)
  }

  const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
  }

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
          />
        </AnimatePresence>
      </div>
      <div className="product__gallery-thumbs" onMouseLeave={handleMouseLeave}>
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={`product__gallery-thumb flex-shrink-0 ${
              selectedImage === index && previewIndex === null ? 'active' : ''
            } ${previewIndex === index ? 'previewing' : ''}`}
            onClick={() => handleThumbnailClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <img
              src={getFullImageUrl(image)}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
})

ProductGallery.displayName = 'ProductGallery'

export default ProductGallery
