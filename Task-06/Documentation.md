# Documentation for Weather-App
## Overview
The Weather App is a web-based application which utilizes the OpenWeatherMap API to retrieve and present real-time weather data, encompassing temperature, weather conditions, and additional details. It is developed using HTML, CSS, and JavaScript.
## Project Structure
- **index.html:** The main HTML file that structures the user interface of the weather app.

- **style.css:** Contains the CSS styles that define the look and feel of the weather app.

- **script.js:** The JavaScript file that handles the app's functionality, including fetching data from the weather API and updating the UI.
## Funtionality

- `getLocation():` This function checks if location is supported by the browser. If supported, it retrieves the user's current position and

   calls `showPosition()` to store the coordinates.

- **Event Listeners:** These listeners trigger the switchTab function when the user clicks on either the "Your Weather" or "Search Weather"        tabs.

  ```
  userTab.addEventListener("click", () => {
    switchTab(userTab);
  });

  searchTab.addEventListener("click", () => {
    switchTab(searchTab);
  });
  ```
  
- `fetchUserWeatherInfo(coordinates): `This function uses the provided coordinates to fetch weather data from the OpenWeatherMap API.
  

- `renderWeatherInfo(weatherInfo):` This function updates the UI with the weather data fetched from the API.
  

- `fetchSearchWeatherInfo() `function fetches and displays weather data for the searched city.

## Implementation Details
1. **User's Location:**
   
   When the user grants location access, the `getLocation()` function is called,by which browser's geolocation API fetches latitude and           longitude.These coordinates are stored in session storage and are used to call the OpenWeatherMap API in `fetchUserWeatherInfo() ` to get      weather details. 
   
2. **City Search:**

   Users can also search for the weather by entering a city name in the search form (task_form.html),upon which the `fetchSearchWeatherInfo()`     sends a request to the OpenWeatherMap API to get weather info.

3. **UI Interaction**

   The response from the API is analyzed and presented in the user interface to show weather data,which encompasses temperature, wind             speed, humidity, and cloud cover.
    
   The `renderWeatherInfo()` function updates various UI elements to display weather details.

   Upon the initiation of a request to the API, a loading screen is presented by applying an `"active"` class to the loadingScreen element.        After the data has been successfully retrieved , the loading screen is hidden.

 ## Code Example
 
  Fetching User's Location Weather Details

 ```javascript
async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        
    }
}
```
   
   




