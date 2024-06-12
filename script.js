document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "4bd263c9a226583dcc3fe66f4e28238f";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const weatherDiv = document.querySelector(".weather");
    const errorDiv = document.querySelector(".error");
    const themeToggleBtn = document.getElementById("theme-toggle");

    // Function to fetch weather data
    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            errorDiv.style.display = "block";
            weatherDiv.style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
            document.querySelector(".humidity-value").textContent = `${data.main.humidity}`;
            document.querySelector(".wind-value").textContent = `${data.wind.speed}`;
            document.querySelector(".pressure-value").textContent = `${data.main.pressure}`;
            document.querySelector(".visibility-value").textContent = `${data.visibility / 1000}`;
            document.querySelector(".sunrise-value").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            document.querySelector(".sunset-value").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            document.querySelector(".description").textContent = data.weather[0].description;

            const weatherCondition = data.weather[0].main;
            switch (weatherCondition) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Rain":
                case "Thunderstorm":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "images/clear.png";
                    break;
            }

            weatherDiv.style.display = "block";
            errorDiv.style.display = "none";

            // Store the city in localStorage
            localStorage.setItem("lastCity", city);
        }
    }

    // Function to fetch weather for the last city on page load
    function loadLastCityWeather() {
        const lastCity = localStorage.getItem("lastCity");
        if (lastCity) {
            checkWeather(lastCity);
            searchBox.value = lastCity;
        }
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        }
    });

    // Event listener for theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggleBtn.textContent = document.body.classList.contains('light-mode') ? '🌜' : '🌞';
    });

    // Load weather for the last city on page load
    loadLastCityWeather();
});
