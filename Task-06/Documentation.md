# Documentation for Weather-App
## Overview
The Weather App is a web-based application which utilizes the OpenWeatherMap API to retrieve and present real-time weather data, encompassing temperature, weather conditions, and additional details. It is developed using HTML, CSS, and JavaScript.
## Project Structure
- **index.html:** The main HTML file that structures the user interface of the weather app.

- **style.css:** Contains the CSS styles that define the look and feel of the weather app.

- **script.js:** The JavaScript file that handles the app's functionality, including fetching data from the weather API and updating the UI.
## Funtionality

- `getLocation():` This function checks if location is supported by the browser. If supported, it retrieves the user's current position and calls `showPosition()` to store the coordinates.

* **Event Listeners:** These listeners trigger the switchTab function when the user clicks on either the "Your Weather" or "Search Weather" tabs.

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
1. User's Location:
   When the user grants location access, the getLocation() function is called, triggering the browser's geolocation API to obtain latitude and longitude.
   




