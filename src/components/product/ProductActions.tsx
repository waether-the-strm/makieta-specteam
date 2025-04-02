interface RentalPrice {
  days: number;
  price: number;
  dailyPrice: number;
}

interface PurchasePrice {
  gross: number;
  net: number;
}

interface ProductActionsProps {
  rentalPrices: RentalPrice[];
  deposit: number;
  purchasePrice: PurchasePrice;
}

const ProductActions = ({
  rentalPrices,
  deposit,
  purchasePrice,
}: ProductActionsProps) => {
  return (
    <div className="bg-white p-8 rounded-lg">
      {/* Rental Options */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Wypożyczenie</h2>
        {rentalPrices.map((price) => (
          <div key={price.days} className="mb-2">
            <span className="font-bold text-gray-800">
              {price.price}zł / {price.days} dni
            </span>
            <span className="ml-2 text-gray-500 italic">
              ≈ {price.dailyPrice}zł / dzień
            </span>
          </div>
        ))}
        <div className="text-sm text-gray-500 mt-4">
          <p>ℹ️ Minimalny okres najmu: 3 dni</p>
          <p>ℹ️ Kaucja zwrotna: {deposit}zł</p>
        </div>
        <button className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 hover:bg-orange-600 transition-colors">
          Wypożycz
        </button>
      </div>

      {/* Purchase Options */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-bold mb-4">Zakup</h2>
        <div className="mb-4">
          <span className="font-bold text-gray-800">
            {purchasePrice.gross.toFixed(2)}zł brutto
          </span>
          <span className="ml-2 text-gray-500 italic">
            ≈ {purchasePrice.net.toFixed(2)}zł netto
          </span>
        </div>
        <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
          Kup
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
