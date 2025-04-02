import { useParams } from "react-router-dom";
import ProductGallery from "../components/product/ProductGallery";
import ProductBreadcrumbs from "../components/product/ProductBreadcrumbs";
import ProductActions from "../components/product/ProductActions";

// Mock data - później zastąpimy danymi z API
const mockProduct = {
  id: "1",
  name: "DJI Mavic 3 Pro",
  category: "Drony",
  images: [
    "https://example.com/drone1.jpg",
    "https://example.com/drone2.jpg",
    "https://example.com/drone3.jpg",
    "https://example.com/drone4.jpg",
  ],
  rentalPrices: [
    { days: 3, price: 1200, dailyPrice: 400 },
    { days: 7, price: 2100, dailyPrice: 300 },
    { days: 14, price: 3500, dailyPrice: 250 },
  ],
  deposit: 5000,
  purchasePrice: {
    gross: 15999,
    net: 13007.32,
  },
  features: ["Kamera 4K", "Zasięg 15km", "Czas lotu 46min", "Waga 958g"],
  description: "Profesjonalny dron DJI Mavic 3 Pro z kamerą Hasselblad...",
};

const ProductPage = () => {
  const { id } = useParams();
  // Później pobierzemy dane produktu na podstawie id
  const product = mockProduct;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <ProductBreadcrumbs category={product.category} name={product.name} />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Actions Panel */}
          <ProductActions
            rentalPrices={product.rentalPrices}
            deposit={product.deposit}
            purchasePrice={product.purchasePrice}
          />
        </div>

        {/* Features and Additional Info */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Specyfikacja</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.features.map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Opis produktu</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>

        {/* Bottom CTA Buttons */}
        <div className="mt-12 flex gap-4 justify-center">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors">
            Wypożycz teraz
          </button>
          <button className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors">
            Kup teraz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
