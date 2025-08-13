const apiKey = '2190539c4cc7ca1d582a1b0785ac85d5'; // Replace with your working OpenWeatherMap API key
const weatherDiv = document.getElementById('weather');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }
  getWeather(city);
});

function getWeather(city) {
  const encodedCity = encodeURIComponent(city);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

  weatherDiv.classList.remove('show');
  weatherDiv.innerHTML = `<p class="loading">Fetching weather...</p>`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
          throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      // Update background/theme based on weather
      applyWeatherTheme(data.weather[0].main.toLowerCase());

      weatherDiv.innerHTML = `
        <h2>${getWeatherEmoji(data.weather[0].main)} Weather in ${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>☁ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      `;
      weatherDiv.classList.add('show');
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      console.error(error);
    });
}

// Change background based on weather
function applyWeatherTheme(condition) {
  let background = '';
  switch (condition) {
    case 'clear':
      background = 'linear-gradient(135deg, #ffafbd, #ffc3a0)'; // Sunny warm
      break;
    case 'clouds':
      background = 'linear-gradient(135deg, #bdc3c7, #2c3e50)'; // Cloudy grey
      break;
    case 'rain':
    case 'drizzle':
      background = 'linear-gradient(135deg, #00c6fb, #005bea)'; // Rainy blue
      break;
    case 'thunderstorm':
      background = 'linear-gradient(135deg, #232526, #414345)'; // Dark storm
      break;
    case 'snow':
      background = 'linear-gradient(135deg, #e0eafc, #cfdef3)'; // Cold icy
      break;
    default:
      background = 'linear-gradient(135deg, #6dd5ed, #2193b0)'; // Default
  }
  document.body.style.background = background;
}

// Return matching emoji for header
function getWeatherEmoji(condition) {
  switch (condition.toLowerCase()) {
    case 'clear': return '☀';
    case 'clouds': return '☁';
    case 'rain': return '🌧';
    case 'drizzle': return '🌦';
    case 'thunderstorm': return '⛈';
    case 'snow': return '❄';
    default: return '🌡';
  }
}