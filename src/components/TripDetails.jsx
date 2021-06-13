import React, { useRef } from 'react'
import { useState } from 'react';
import RangePicker from "react-range-picker";
import { Nav } from './Nav';
import "./styles/TripDetailStyles.css"
import fireDb from "../fireDb";


export const TripDetails = ({ trips, setTrips, user, handleLogout }) => {

    let [location, setLocation] = useState("");
    let [showSuggestion, setShowSuggestions] = useState(false);
    let [suggestionsArray, setSuggestionsArray] = useState([]);
    let inputVal = useRef();
    let descVal = useRef();
    let startDate = "";
    let endDate = "";
    const getLoction = async (locale) => {

        const key = "pk.eyJ1IjoicmFodWxzaHVrbGEiLCJhIjoiY2twaHpyd2YzMDZ4YTJ2bzN2ZmFndW16aCJ9.wsZ3HRlbKkQ0clwaDtvuHA";
        const data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locale}.json?access_token=` + key);
        const response = await data.json();
        return response.features;
    }

    console.log(user)
    const handleChange = async (e) => {

        inputVal = e.target.value
        setLocation(e.target.value.replaceAll(" ", "%20"));
        if (e.target.value.length > 3) {
            setSuggestionsArray(await getLoction(location));
        }
        if (suggestionsArray.length > 0) {
            setShowSuggestions(true);
        }

    }
    const onDateChanges = (date, date2) => {

        startDate = date.toDateString();
        if (date2) endDate = date2.toDateString();

    };



    const addValuesToTrip = async () => {
        let location = inputVal.current.value;
        let tripId = (user + location).replaceAll(".", "");
        let description = descVal.current.value

        let details = {
            tripId,
            location,
            description,
            startDate,
            endDate
        }

        await addToDatabase(tripId, location, description, startDate, endDate, user)

        inputVal.current.value = ""
        descVal.current.value = ""

        let trip = [...trips, details];

        setTrips(trip)


    }

    const handleSuggestionClick = (item) => {
        inputVal.current.value = item.place_name;
        setShowSuggestions(false);
    }


    async function addToDatabase(tripId, location, description, startDate, endDate, user) {
        const ref = fireDb.firestore().collection("trips")

        await ref.add({
            tripId,
            location,
            description,
            startDate,
            endDate,
            user

        });


    }

 

    return (
        <>
            <Nav handleLogout={handleLogout} />
            <div className="trip-details">

                <h1>Trip Details</h1>
                <div className="new-trip">

                    <div className="search gap flex-column">
                        <div className = "row">
                            <label htmlFor="Destination">Destination</label>
                            <input
                                className = "input-bar"
                                type="text"
                                onChange={handleChange}
                                ref={inputVal}
                            />

                            {showSuggestion &&
                                <div className = "suggestions">
                                    {suggestionsArray.map((item, key) =>
                                        <div key={key}
                                            className="suggestions"
                                            onClick={() => handleSuggestionClick(item)}
                                        >{item.place_name}</div>)}
                                </div>}
                        </div>
                        <div className="flex-column">
                            <label htmlFor="Description">Description</label>
                            <input type="text" className = "input-bar" ref={descVal} />
                        </div>
                        <label htmlFor="Dates">Select Dates</label>
                        <div className="date-picker"><RangePicker onDateSelected={onDateChanges} /></div>
                        <button className = "button"disabled = {inputVal === "" || descVal === ""} onClick={addValuesToTrip}>Add</button>
                    </div>

                </div>
                <div className="trips">
                    {trips.length === 0 ? <h1>No trips to display</h1> : trips.map((trip, key) => <div className="trip" key={key}>
                        <div className="trip-title">{trip.location}</div>
                        <div className="trip-desc">{trip.description}</div>
                        <div className="status">Start Date: {trip.startDate} End Date: {trip.endDate}</div>
                    </div>
                    )}

                </div>


            </div>
        </>
    )
}




   // async function getTripsFromDatabase() {

    //     try {
    //         const ref = fireDb.firestore().collection("trips")
    //         const doc = await ref.where('user','==', user).get();
    //         if (doc.empty) {
    //             console.log('No matching documents.');
    //             return;
    //           }  
    //           let dtrips = []
    //           doc.forEach(doc => {
    //               dtrips.push(doc.data())
    //             console.log(doc.id, '=>', doc.data());
    //           });

    //           setTrips(dtrips)
    //     }catch(e){
    //         console.log(e.message)
    //     }

    // }

    //tripid,destination,desc,startdate,enddate