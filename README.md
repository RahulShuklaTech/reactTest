# Trip planner Challenge

A collabarative trip planner website which uses Firebase as the Backend.

## Create a react app with following features

- Email Login with Firebase
- Profile Page
  - It shows the details of the current user profile
  - Should show the places where you have been to
  
- Plan a trip page
  - It should ask for details like Trips Title, Description, Status (Planning, Completed and Cancelled)
  - There should be a date range picker where you select the trip dates (start and end)
  - It should have a search box which search results  for the places you search
    - Show the list of places from the API, such that user can select them
    - Show a button ``Add places`` to the trip, this will add all the selected places to the trip you are planning for
  - Add users to the trip
    - Show the list of registered user, such that user can select them
    - Show the search box and show all the users registered on the platform based on query
    - Show a ``Add user`` button, that adds all the selected users to the trip
  
- Trip Detail Page
  - Allows you to modify status, title and description
  - You can add/remove users and places
  
- Trips Page
  - ``Upcoming Trips``
    - Shows all the trips that are not yet started
  - ``Completed Trips``
    - Show all the trips that are completed
  - ``Cancelled Trips``
    - Show all the trips that were cancelled
  - On Click on each trip instance
    - It should show the details of the trip
      - Places
      - Users
      - Date Range when it’s planned for
      - Status

### API for Places

[API](https://docs.mapbox.com/api/search/geocoding/)
[GENERATE TOKEN INSTRUCTIONS](https://docs.mapbox.com/help/glossary/access-token/)

### You can come up with your Own UI/UX, Show us how creative you are

### Hints

- You can manage the registered user in the database when they register in your platform
  - Maintain a unique identifier like email or Id

- You can maintain a seprate entity in database that stores the userId and TripId
  - So that when the invited users LogsIn, you can get/show all the trips details `logged in user` is associated with
