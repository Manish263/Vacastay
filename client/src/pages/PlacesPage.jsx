import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav.jsx";
import PlaceImg from "../PlaceImg.jsx";


export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);
    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>

                    Add new place
                </Link>
            </div>
            <div className="mt-4 text-left">
               {places.length >0 && places.map(place =>(
                <Link to={'/account/places/'+place._id} className="flex cursor-pointer gap-2 bg-gray-100 p-4 rounded-2xl">
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                   <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2 text-left">{place.description}</p>
                </div>
                </Link>
               ))} 
            </div>
        </div>
    )
}
