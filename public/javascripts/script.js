
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



// Moisture Update work using IOT
function updateMoisture(moisture) {
    const circle = document.getElementById('moisture-fill');
    const text = document.getElementById('moisture-percentage');
    const percentage = Math.max(0, Math.min(100, moisture));
    circle.setAttribute('stroke-dasharray', `${percentage}, 100`);
    text.textContent = `${percentage}%`;
}
// Example usage:
updateMoisture(20);


// Banner Functionality
let banners = ["../images/banner/banner0.png", "../images/banner/banner1.png", "../images/banner/banner2.png", "../images/banner/banner3.png", "../images/banner/banner4.jpg"];
let currentIndex = 0;
let sliderInterval;
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const banner_box = document.getElementById('banner-img')
console.log(banner_box);

function functBtn() {
    prevBtn.addEventListener("click", () => {
        prevSlide();
    });
    nextBtn.addEventListener("click", () => {
        nextSlide();
    });
}

function updateBanner() {
    banner_box.src = banners[currentIndex];
    for (let i = 0; i < banners.length; i++) {
        document.getElementById(`dot-${i}`).classList.remove('bg-gray-700');
        document.getElementById(`dot-${i}`).classList.remove('w-9');
        document.getElementById(`dot-${i}`).classList.remove('active');
        document.getElementById(`dot-${i}`).classList.add('bg-gray-400');
        document.getElementById(`dot-${i}`).classList.add('w-3');
    }
    document.getElementById(`dot-${currentIndex}`).classList.add('bg-gray-700');
    document.getElementById(`dot-${currentIndex}`).classList.add('w-9');
    document.getElementById(`dot-${currentIndex}`).classList.add('active');
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + banners.length) % banners.length;
    updateBanner();
    resetAutoSlider();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % banners.length;
    updateBanner();
    resetAutoSlider();
}

function startAutoSlider() {
    sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % banners.length;
        updateBanner();
    }, 3000); // Change slide every 3 seconds
}

function resetAutoSlider() {
    clearInterval(sliderInterval);
    startAutoSlider();
}

// Touch swipe functionality
let startX = 0;
document.getElementById('banner-container').addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
});

document.getElementById('banner-container').addEventListener('touchend', function (e) {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        nextSlide();
    } else if (endX - startX > 50) {
        prevSlide();
    }
});

functBtn();
updateBanner();
startAutoSlider();


// Irrigation: Water Supply Checker
let waterSupply_checker = false;


// Setup Water Pump
const home_panel = document.getElementById("home-panel");
const setup_irrigation = document.querySelector(".setup-irrigation");
const btn_setup_waterpump = document.getElementById("setup-waterpump");
const close_setup_waterpump = document.getElementById("close-waterpump-setup");
const setup_box = setup_irrigation.querySelector(".setup-box");

function openclose_setup(checker) {
    if (checker) {
        setup_irrigation.classList.remove('hidden');
        home_panel.classList.add('blur-sm');
        setTimeout(() => {
            setup_box.classList.remove('-translate-y-full', 'opacity-0');
            setup_box.classList.add('translate-y-0', 'opacity-100');
        }, 50);
    } else {
        setup_box.classList.remove('translate-y-0', 'opacity-100');
        setup_box.classList.add('-translate-y-full', 'opacity-0');
        home_panel.classList.remove('blur-sm');
        setTimeout(() => {
            setup_irrigation.classList.add('hidden');
        }, 500);
    }
}

btn_setup_waterpump.addEventListener("click", function () {
    openclose_setup(1);
});

close_setup_waterpump.addEventListener("click", function () {
    openclose_setup(0);
});


// Notification Function
function showToast(text) {
    const toast = document.getElementById('toast');
    toast.innerText = text;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000); // auto hide after 3 seconds
}


// Function that start irrigation manually
const start_irrigation = document.getElementById('start-irrigation');

function startIrrigation() {
    showToast('Now, Irrigation Started');
}

start_irrigation.addEventListener("click", () => {
    if (waterSupply_checker == false) {
        waterSupply_checker = true;
        startIrrigation();
    } else {
        showToast('Already, Irrigation Working');
    }
});


// Function that stop irrigation on emergency 
const  stop_irrigation = document.getElementById("stop-irrigation");

function stopIrrigation() {
    showToast('Successfully, Irrigation Stopped');
}

stop_irrigation.addEventListener("click", () => {
    if (waterSupply_checker) {
        waterSupply_checker = false;
        stopIrrigation();
    } else {
        showToast('Already, Irrigation Not Stopped');
    }
});