import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="gallery">
      <img
        src={images[selectedImage]}
        alt={productName}
        className="preview w-full h-auto mb-4 rounded-lg"
      />
      <div className="minis flex space-x-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${productName} - zdjęcie ${index + 1}`}
            className={`mini w-20 h-20 object-cover cursor-pointer rounded-lg transition-all duration-200 ${
              selectedImage === index
                ? "ring-2 ring-orange-500"
                : "hover:opacity-80"
            }`}
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
