import Navbar from './components/Navbar';
import RentalPage from './pages/RentalPage';
import { MapPin, Mail, Bitcoin, CreditCard, Phone, Clock } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <RentalPage />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5" />
                <span>+48 123 456 789</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5" />
                <span>contact@specteam.pl</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5" />
                <span>Warsaw, Poland</span>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5" />
                <span>Mon-Fri: 9:00 - 18:00</span>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <h4 className="font-semibold">Payment Methods:</h4>
                <CreditCard className="h-5 w-5" />
                <Bitcoin className="h-5 w-5" />
              </div>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
              ></textarea>
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 Specteam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
