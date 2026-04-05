
import { Link } from "react-router-dom";

const ListingCard = ({ item }) => {
  return (
    <Link to={`/listing/${item._id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">
        
        {/* 🖼 Image */}
        <div className="relative">
          <img
            src={item.image.url}
            alt={item.image.filename}
            className="h-52 w-full object-cover"
          />

          {/* ❤️ Wishlist Icon */}
          <span className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
            ❤️
          </span>
        </div>

        {/* 📄 Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold truncate">
            {item.title}
          </h2>

          <p className="text-gray-500 text-sm">
            {item.location}
          </p>

          <p className="text-red-500 font-bold mt-2">
            ₹{item.price} / month
          </p>
        </div>

      </div>
    </Link>
  );
};

export default ListingCard;
