// src/pages/Home.jsx

import ListingCard from "../components/ListingCard";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {

    const [listings, setListings] = useState([]);

    //fetching all listing from db.
    useEffect(() => {
        const fetch = async () => {
            try {
                let res = await axios.get('https://rentify-project-1.onrender.com/listing', {withCredentials : true});
                setListings(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetch();
    }, []);

    if (!listings || listings.length === 0) {
        return (
            <p className="text-center mt-10 text-gray-500">
                No listings found
            </p>
        );
    }

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
                <ListingCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default Home;
