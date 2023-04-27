const API_KEY = 'd1b5d97cb0bb6cff785bf32bd2917c73';
const cityname = document.getElementById("city");
const temp = document.getElementById("temp");

// Move this line above the API_URL line

const spinner = document.getElementById('spinner');
spinner.style.display = 'block';

const submit = document.getElementById("button");
submit.addEventListener("click", handleClick);

function handleClick() {
    const city = document.getElementById("myInput").value;

    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none';
            const temperature = data.main.temp;
            temp.textContent = `${temperature}° Celsius`;
            cityname.textContent = `${city}`;
            console.log(`The temperature in ${city} is ${temperature}°C.`);
        })
        .catch(error => console.error(error));
}

function getUserCityLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    spinner.style.display = 'none';
                    const city1 = data.name;
                    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${API_KEY}`;
                    fetch(cityUrl)
                        .then(response => response.json())
                        .then(data => {
                            const temperature = data.main.temp;
                            temp.textContent = `${temperature}° Celsius`;
                            cityname.textContent = `${city1}`;
                            console.log(`The temperature in ${city1} is ${temperature}°C.`);
                        })
                        .catch(error => console.error(error));
                    console.log(city1);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

getUserCityLocation();