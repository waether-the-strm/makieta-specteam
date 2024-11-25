import RentalFeatures from "./RentalFeatures";

export default function Hero() {
  return (
    <div className="relative bg-slate-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80"
          alt="Security Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wypożyczalnia Sprzętu Detektywistycznego
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Profesjonalny sprzęt dostępny od zaraz
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#devices"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Zobacz nasz sprzęt
            </a>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition">
              Skontaktuj się z nami
            </button>
          </div>
        </div>
        <div className="mt-14">
          <RentalFeatures />
        </div>
      </div>
    </div>
  );
}
