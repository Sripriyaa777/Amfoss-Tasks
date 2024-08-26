# Weather-App
## Overview
The Django Weather App is a web application that allows users to view the current weather for a specified city. The application integrates with the OpenWeatherMap API to fetch real-time weather data and displays it in a user-friendly interface. Users can search for weather information by entering the name of a city.
## Feature
- **City Weather Lookup:** View current weather conditions for multiple cities.
- **Add Cities:** Add new cities to track weather information.
- **Delete Cities:** Remove cities from your weather list.
- **Real-Time Data:** Fetch and display up-to-date weather information using the OpenWeatherMap API.
## Setup Instructions
Follow these steps to set up and run the Django Weather App:
1. Clone the Repository

   ```bash
   git clone https://github.com/Kalpana98/Weather-App.git
   
2. Navigate to the Project Directory

   ```bash
   cd Weather-App/My_Weather_Webapp
   
3. Create and Activate a Virtual Environment
   
   ```bash
   python -m venv env
   source env/bin/activate
   
4. Install the Dependencies

   ```
   pip install -r requirements.txt
   ```
5. Apply Migrations
   
   ```bash
   python manage.py makemigrations
   python manage.py migrate
  
   
6. Run the Development Server
```
python manage.py runserver
```
   
   
   
8. Access the Application
   Open your web browser and navigate to `http://127.0.0.1:8000/.`
## Usage
- **Viewing Weather Data:** On the main page, you can see the weather information for all cities currently stored in the database.
- **Adding a City:** Use the form provided to add a new city to the list. Enter the city name and submit the form.
- **Deleting a City:** Click the "Delete" link next to a city to remove it from the list.
  
## Contribution Guidelies

- **Reporting Issues:** Please report any issues or bugs using the GitHub Issues tab.

- **Submitting Pull Requests:** Fork the repository, make your changes, and submit a pull request with a description of your changes.

   

  
 

   

