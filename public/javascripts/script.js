
// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
async function getWeather(city) {
    const apiKey = 'fab1287105dc652116091b8007a1638a';
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    console.log(data);
    return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: (data.wind.speed * (5 / 18)).toFixed(2),
        windDirection: data.wind.deg,
        pressure: data.main.pressure,
        visibility: (data.visibility / 1000), // Convert visibility from meters to kilometers
        // Add date and time from API (dt is in seconds since epoch, UTC)
        dateTime: new Date(data.dt * 1000).toLocaleString()
    }
}
// getWeather('hindaun');
let Weather = getWeather('hindaun');
Weather.then(data => {
    document.getElementById('w-city').innerText = `${data.city}, ${data.country}`;

        document.getElementById('w-temp').innerText = `${data.temperature} °`;
        document.getElementById('w-humidity').innerText = `${data.humidity}%`;
        document.getElementById('w-des').innerText = data.description;
         document.getElementById("w-icon").src = `http://openweathermap.org/img/wn/${data.icon}.png`;
        // console.log(document.getElementById('w-temp + w-icon'));
        document.getElementById('w-windSpeed').innerText = `${data.windSpeed} km/h`;
        // document.getElementById('w-windDirection').innerText = `Wind Direction: ${data.windDirection}°`;
    //     document.getElementById('w-pressure').innerText = `Pressure: ${data.pressure} hPa`;
        document.getElementById('w-visibility').innerText = `${data.visibility} km`;
        document.getElementById('w-date').innerText = data.dateTime;
    // }).catch(err => {
    // console.error('Error fetching weather data:', err);
    // document.getElementById('w-city').innerText = 'Weather data not available';
    // document.getElementById('w-temp').innerText = '';
    // document.getElementById('w-humidity').innerText = '';
    // document.getElementById('w-des').innerText = '';
    // // document.getElementById('w-icon').src = '';
    // document.getElementById('w-windSpeed').innerText = '';
    // document.getElementById('w-windDirection').innerText = '';
    // document.getElementById('w-pressure').innerText = '';
    // document.getElementById('w-visibility').innerText = '';
});