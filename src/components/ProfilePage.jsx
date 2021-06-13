import React from 'react'
import { Nav } from "./Nav"
import "./styles/ProfileStyles.css"
export const ProfilePage = (props) => {

    const { user, handleLogout, trips } = props
    return (

        <div className="profile-page">
            <Nav handleLogout={handleLogout} />
            <div className="profile-header">
                <img src="user.svg" alt="user" />
                <h2 className="user=heading">Welcome, {user} </h2>
            </div>
            <div className="prev-trips">
                <h2>Previous Trips</h2>
                <div className="trips">
                    {trips.length === 0 ? <h1>No trips to display</h1> : trips.map((trip, key) => <div className="trip" key={key}>
                        <div className="trip-title">Location: {trip.location}</div>
                        <div className="trip-desc">Description: {trip.description}</div>
                        <div className="status">Start Date: {trip.startDate} End Date: {trip.endDate}</div>
                    </div>
                    )}

                </div>
            </div>

        </div>
    )
}
