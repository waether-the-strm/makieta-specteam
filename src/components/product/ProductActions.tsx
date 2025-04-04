import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: {
    rental: {
      daily: number;
      weekly: number;
      monthly: number;
      [key: string]: number;
    };
    purchase: number;
  };
  isAvailable: boolean;
}

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [isRental, setIsRental] = useState(true);
  const [rentalPeriod, setRentalPeriod] = useState("daily");
  const [quantity, setQuantity] = useState(1);

  // Mapowanie okresów wypożyczenia na ich polskie etykiety i wartości
  const rentalOptions = [
    { id: "daily", label: "1 dzień", price: product.price.rental.daily },
    { id: "weekly", label: "7 dni", price: product.price.rental.weekly },
    { id: "monthly", label: "30 dni", price: product.price.rental.monthly },
  ];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const getPrice = () => {
    if (isRental) {
      return product.price.rental[rentalPeriod] * quantity;
    }
    return product.price.purchase * quantity;
  };

  return (
    <div className="product__actions">
      <div className="flex gap-2 mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            isRental
              ? "bg-rose-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
          onClick={() => setIsRental(true)}
        >
          Wypożyczenie
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            !isRental
              ? "bg-rose-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
          onClick={() => setIsRental(false)}
        >
          Zakup
        </button>
      </div>

      {isRental && (
        <div className="mb-6">
          <label className="block text-slate-300 mb-2">
            Okres wypożyczenia
          </label>
          <select
            value={rentalPeriod}
            onChange={(e) => setRentalPeriod(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
          >
            {rentalOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} ({option.price} zł)
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-slate-300 mb-2">Ilość</label>
        <div className="product__quantity">
          <button
            className="product__quantity-button"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="product__quantity-value">{quantity}</span>
          <button
            className="product__quantity-button"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-slate-300">Suma:</span>
        <span className="product__price">{getPrice()} zł</span>
      </div>

      <button
        className={`product__button ${
          product.isAvailable
            ? "bg-rose-600 hover:bg-rose-700"
            : "bg-slate-600 cursor-not-allowed"
        }`}
        disabled={!product.isAvailable}
      >
        Dodaj do koszyka
      </button>

      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-slate-400">
          <span role="img" aria-label="delivery">
            🚚
          </span>
          <span>Dostawa od 1zł w 24h</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span role="img" aria-label="support">
            👨‍💻
          </span>
          <span>Pomoc techniczna 24/7</span>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;
