import React, { useRef } from 'react'
import { useState } from 'react';
import RangePicker from "react-range-picker"

export const TripDetails = ({trips,setTrips}) => {

    let [location,setLocation] = useState("");
    let [showSuggestion,setShowSuggestions] = useState(false);
    let [suggestionsArray,setSuggestionsArray]  = useState([]);
    let inputVal = useRef();
    let descVal = useRef();
    let startDate = "";
    let endDate = "";
    const getLoction = async (locale) => {

        const key = "pk.eyJ1IjoicmFodWxzaHVrbGEiLCJhIjoiY2twaHpyd2YzMDZ4YTJ2bzN2ZmFndW16aCJ9.wsZ3HRlbKkQ0clwaDtvuHA";
        
        const data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locale}.json?access_token=`+key);
        const response = await data.json();
        // console.log(response.features)
        return response.features;
    }


    const handleChange = async (e) => {

        inputVal = e.target.value
        setLocation(e.target.value.replaceAll(" ","%20"));
        if(e.target.value.length > 3){
            setSuggestionsArray(await getLoction(location));
        }
        if(suggestionsArray.length > 0){
            setShowSuggestions(true);
        }
        
    }
    const onDateChanges = (date, date2) => {
        
        startDate = date.toDateString() ;
        if(date2)endDate = date2.toDateString();
        
    };


    const addValuesToTrip = () =>{
        let details = {
            location: inputVal.current.value,
            description: descVal.current.value,
            dates: [startDate,endDate]
        }
        inputVal.current.value = ""
        descVal.current.value = ""
       
        let trip = [...trips,details];
       
        setTrips(trip)
        
        
    }



    
    const handleSuggestionClick = (item) => {
        inputVal.current.value = item.place_name;
        setShowSuggestions(false);
    }
   
   
    return (
        <div>
            <h1>Trip Details</h1>
            <div className = "trips">
                { trips.length === 0 ? <h1>No trips to display</h1> : trips.map((trip,key) => <div className = "trip" key = {key}>
                    <div className = "trip-title">{trip.location}</div>
                    <div className = "trip-desc">{trip.description}</div>
                    <div className = "status">Start Date: {trip.dates[0]} End Date: {trip.dates[1]}</div>
                </div>
                )}
                
            </div>
            <div className = "new-trip">
                
                <div className = "search">
                    <div style = {{display:"flex",flexDirection: "column"}}>    
                    <input style = {{width: "300px"}} type = "text" onChange = {handleChange} ref = {inputVal} ></input>
                    {showSuggestion && <div>{suggestionsArray.map((item,key) => <div key = {key} className = "suggestions" onClick = {()=>  handleSuggestionClick(item)}>{item.place_name}</div>)}</div>}
                    </div>
                    <input type = "text" ref = {descVal} />
                    <button onClick = {addValuesToTrip}>Add</button>
                </div>
                <div className ="date-picker"><RangePicker onDateSelected={onDateChanges} /></div>
            </div>
            
        </div>
    )
}
