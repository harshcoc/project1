const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6ba5c97828msh9e152961322e153p14e8dcjsn6fee5a1eaa22',
		'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
	}
};

// Function to get latitude and longitude from city name using OpenStreetMap
async function getLatLon(cityName) {
  const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`;
  
  const response = await fetch(geoUrl);
  const data = await response.json();
  
  if (data.length === 0) throw new Error('City not found');
  
  return {
    lat: data[0].lat,
    lon: data[0].lon
  };
}

// Main function to fetch weather and update UI
async function fetchWeather() {
  const cityInput = document.getElementById('cityInput').value.trim();
  if (!cityInput) {
    alert('Please enter a city name.');
    return;
  }

  try {
    const { lat, lon } = await getLatLon(cityInput);
    const weatherUrl = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon}/EN`;

    const response = await fetch(weatherUrl, options);
    const data = await response.json();

    document.getElementById('city').innerText = data.name || cityInput;
    document.getElementById('temp').innerText = data.main ? (data.main.temp - 273.15).toFixed(2) : 'N/A';
    document.getElementById('feels_like').innerText = data.main ? (data.main.feels_like - 273.15).toFixed(2) : 'N/A';
    document.getElementById('desc').innerText = data.weather && data.weather[0] ? data.weather[0].description : 'N/A';
    document.getElementById('humidity').innerText = data.main ? data.main.humidity : 'N/A';
    document.getElementById('wind').innerText = data.wind ? data.wind.speed : 'N/A';

  } catch (error) {
    console.error(error);
    alert('Failed to fetch weather. Please check city name.');
  }
}
