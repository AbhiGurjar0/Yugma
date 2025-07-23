// async function alerts(text, srcLang = "eng_Latn", tgtLang = "hin_Deva") {
//     const res = await fetch("/trans", {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             text: text,
//             srcLang: srcLang,
//             tgtLang: tgtLang
//         })
//     });
//     const data = await res.json();
//     console.log(data);
// }


// async function getWeather(city) {
//     const apiKey = 'fab1287105dc652116091b8007a1638a';
//     const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
//     const data = await res.json();
//     console.log(data);
//     let rainLevel = data.rain && data.rain["1h"] ? data.rain["1h"] : 0;
//     let text = "";
//     if (rainLevel === 0) {
//         text = "🌤 No recent rain. Weather is clear.";
//     } else if (rainLevel < 2.5) {
//         text = `🌧 Light rain: ${rainLevel} mm in last 1h.`;
//     } else if (rainLevel < 7.6) {
//         text = `🌧🌧 Moderate rain: ${rainLevel} mm in last 1h. Carry an umbrella.`;
//     } else {
//         text = `🌧🌧🌧 Heavy rain alert! ${rainLevel} mm in last 1h. Stay safe.`;
//     }
//     console.log(text);
//     // alerts(text, "eng_Latn", "hin_Deva");



//     return {
//         city: data.name,
//         country: data.sys.country,
//         temperature: Math.floor(data.main.temp),
//         humidity: data.main.humidity,
//         description: data.weather[0].description,
//         icon: data.weather[0].icon,
//         windSpeed: (data.wind.speed * (5 / 18)).toFixed(2),
//         windDirection: data.wind.deg,
//         pressure: data.main.pressure,
//         visibility: (data.visibility / 1000),
//         dateTime: new Date(data.dt * 1000).toLocaleString(),
//         rainChance: data.rain && data.rain["1h"] ? `${data.rain["1h"]} mm (last 1h)` : "No recent rain"
//     }
// }

// // let Weather = getWeather('hindaun');
// Weather.then(data => {
//     // document.getElementById('w-city').innerText = `${data.city}, ${data.country}`;

//     document.getElementById('w-temp').innerText += `${data.temperature} °`;
//     document.getElementById('w-humidity').innerText += `${data.humidity}%`;
//     document.getElementById('w-des').innerText += data.description;
//     document.getElementById('w-windSpeed').innerText += `${data.windSpeed} km/h`;
//     document.getElementById('w-windDirection').innerText = `Wind Direction: ${data.windDirection}°`;
//     document.getElementById('w-pressure').innerText = `Pressure: ${data.pressure} hPa`;
//     document.getElementById('w-visibility').innerText += `${data.visibility} km`;
//     document.getElementById('w-date').innerText = data.dateTime;
//     document.getElementById('w-rain').innerText += data.rainChance;
//     }).catch(err => {
//     console.error('Error fetching weather data:', err);
//     document.getElementById('w-city').innerText = 'Weather data not available';
//     document.getElementById('w-temp').innerText = '';
//     document.getElementById('w-humidity').innerText = '';
//     document.getElementById('w-des').innerText = '';
//     // document.getElementById('w-icon').src = '';
//     document.getElementById('w-windSpeed').innerText = '';
//     document.getElementById('w-windDirection').innerText = '';
//     document.getElementById('w-pressure').innerText = '';
//     document.getElementById('w-visibility').innerText = '';
// });

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
let banners = ["./images/banner/banner0.png", "./images/banner/banner1.png", "./images/banner/banner2.png", "./images/banner/banner3.png", "./images/banner/banner4.jpg"];
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
console.log(close_setup_waterpump);
function openclose_setup(checker) {
    if (checker) {
        setup_irrigation.classList.remove('hidden');
        home_panel.classList.add('blur-sm');
        setTimeout(() => {
            setup_box.classList.remove('-translate-y-full', 'opacity-0');
            setup_box.classList.add('translate-y-0', 'opacity-100');
        }, 50);
    } else {
        console.log("Happy")
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
const stop_irrigation = document.getElementById("stop-irrigation");

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

// Waste Management form 
function openWasteForm(option) {
    document.getElementById('wasteFormModal').classList.remove('hidden');
    document.getElementById('formTitle').innerText = option;
}

function closeWasteForm() {
    document.getElementById('wasteFormModal').classList.add('hidden');
}



// li bullet
const ul_li_bullet = document.querySelectorAll('#ul-bullet');
ul_li_bullet.forEach(ul_bullet => {
    const li_elements = ul_bullet.querySelectorAll('li')
    li_elements.forEach(li_bullet => {
        li_bullet.firstElementChild.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-4 h-4 text-green-500 mr-2 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>';
    });
});

// Form Functionality of Waste reuse suggestion
var currentOptionId = null;

var wasteOptions = {};
wasteOptions[1] = {
    title: "Composting & Organic Matter Recycling",
    color: "bg-gradient-to-r from-green-400 to-emerald-600"
};
wasteOptions[2] = {
    title: "Biomass Energy Generation",
    color: "bg-gradient-to-r from-blue-400 to-cyan-600"
};
wasteOptions[3] = {
    title: "Bio-degradable Material Production",
    color: "bg-gradient-to-r from-purple-400 to-indigo-600"
};

function openForm(element, optionId) {

    var modal = document.getElementById('modalForm');
    var modalTitle = document.getElementById('modalTitle');
    var submitBtn = document.getElementById('submitBtn');
    var form_title = document.getElementById('form-title');
    modalTitle.textContent = element.parentElement.children[0].innerText + ' - Application Form';
    form_title.className = wasteOptions[optionId].color + ' text-gray-200 p-4 flex justify-between shadow-md shadow-gray-400';
    submitBtn.className = 'flex-1 px-6 py-3 text-white rounded-lg hover:shadow-lg transition-all ' + wasteOptions[optionId].color;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeForm() {
    var modal = document.getElementById('modalForm');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    clearForm();
}

function clearForm() {
    document.getElementById('farmerName').value = '';
    document.getElementById('location').value = '';
    document.getElementById('cropType').value = '';
    document.getElementById('wasteAmount').value = '';
    document.getElementById('currentDisposal').value = '';
    document.getElementById('contactNumber').value = '';
    document.getElementById('email').value = '';
    document.getElementById('additionalNotes').value = '';
}

function submitForm() {
    var farmerName = document.getElementById('farmerName').value;
    var location = document.getElementById('location').value;
    var cropType = document.getElementById('cropType').value;
    var wasteAmount = document.getElementById('wasteAmount').value;
    var contactNumber = document.getElementById('contactNumber').value;

    if (!farmerName || !location || !cropType || !wasteAmount || !contactNumber) {
        alert('Please fill in all required fields marked with *');
        return;
    }

    var formData = {
        optionId: currentOptionId,
        optionTitle: wasteOptions[currentOptionId].title,
        farmerName: farmerName,
        location: location,
        cropType: cropType,
        wasteAmount: wasteAmount,
        currentDisposal: document.getElementById('currentDisposal').value,
        contactNumber: contactNumber,
        email: document.getElementById('email').value,
        additionalNotes: document.getElementById('additionalNotes').value,
        timestamp: new Date().toISOString()
    };

    console.log('Submitting data:', formData);
    alert('Form submitted for ' + wasteOptions[currentOptionId].title + '. Data will be processed by backend.');
    closeForm();
}

function initializePage() {
    lucide.createIcons();

    document.getElementById('modalForm').addEventListener('click', function (e) {
        if (e.target === this) {
            closeForm();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}