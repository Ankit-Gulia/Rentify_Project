import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-blue-600">Rentify</h2>
          <p className="mt-2 text-sm text-gray-500">
            Find your perfect rental property with ease and confidence.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/listing" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/properties" className="hover:text-blue-600">Properties</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Buy Property</li>
            <li>Rent Property</li>
            <li>List Property</li>
            <li>Property Management</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Developer Details</h3>
          <p className="text-sm text-gray-500">Developed by : @Ankit Gulia</p>
          <p className="text-sm text-gray-500">📍India, Haryana</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className=" py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rentify. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
