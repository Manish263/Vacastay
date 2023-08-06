import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('/places');
        setPlaces(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaces();
  }, []);                                                                                                                                   

  return (
    <div className="mt-8 gap-x-6 gap-y-7 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} className="text-left ">
          <div className="bg-gray-500 mb-2 rounded-2xl flex ">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
            )}
          </div>
          <h2 className="font-bold truncate">{place.title}</h2>
          <h3 className="text-sm text-gray-500">{place.address}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> night
          </div>
        </Link>
      ))}
    </div>
  );
}