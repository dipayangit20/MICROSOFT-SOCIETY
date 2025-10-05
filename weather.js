document.addEventListener("DOMContentLoaded", () => {
    const Cityinput = document.getElementById("Cityinput");
    const weather_info = document.getElementById("weather_info");
    const city_name = document.getElementById("city_name");
    const tempurature = document.getElementById("tempurature");
    const Description = document.getElementById("Description");
    const get_weather = document.getElementById("get_weather");
    const error_massage = document.getElementById("error_massage");
    
    const API = "ea4da1bf6c07b9f5e028d1898ba708af";

    get_weather.addEventListener("click" , async () => {
        const city = Cityinput;
        if(!city) return;
        try {
            const weather_data = await fetchweatherdata(city);
            displayweatherdata(weather_data);
        }
        catch(error){
            showError(error);
        }
    })

   async function  fetchweatherdata(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;
    const response = await fetch(url);

    if(!response.ok){
        return showError();
    }
    const data = await response.json();
    return data;
   } 

   function displayweatherdata(data){
    const {name , main , weather} = data;

    city_name.textContent = name;
    tempurature.textContent = `tempurature : ${main.temp}`;
    Description.textContent = `weather : ${weather[0].description}`;

    weather_info.classList.remove("hidden");
    error_massage.classList.add("hidden");
}

function showError(error){
    weather_info.classList.add("hidden");
    error_massage.classList.remove("hidden");
    error_massage.textContent = error.message || "An error occurred";
}

});