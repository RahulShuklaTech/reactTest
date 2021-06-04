import React from 'react'
import  { useState } from 'react';
import { TripDetails } from './TripDetails';
export const Main = () => {

    let [trips,setTrips] = useState([]);
    return (
        <div>
            <TripDetails trips = {trips} setTrips = {setTrips}/>
        </div>
    )
}
