import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import {Navigate} from 'react-router-dom'; 
import {UserContext} from './UserContext.jsx'; 

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [redirect,setRedirect] = useState('');
    const {user}=useContext(UserContext);

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
        }
    },[user]);

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
          checkIn,checkOut,numberOfGuests,name,email,
          place:place._id,
          price:numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
      }
     
    
      let numberOfNights = 0;
      if (checkIn && checkOut) {
          numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
        }
        
        if (redirect) {
          return <Navigate to={redirect} />
        }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: <b>₹{place.price}</b>/ night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className="flex">
                    <div className="py-4 px-4">
                        <label>Check in:</label>
                        <input type='date'
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-4 px-4 border-l">
                        <label>Check out:</label>
                        <input type='date' value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-4 px-4 border-t">
                    <label>Number of guests:</label>
                    <input type='number' value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-4 px-4 border-t">
                        <label>Name:</label>
                        <input type='text' value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <label>Email:</label>
                        <input type='email' value={email}
                            onChange={ev => setEmail(ev.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
                Book this place
                {numberOfNights > 0 && (
                    <span> ₹{numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    );
}