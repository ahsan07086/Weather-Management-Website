//Weather app
const weather = document.querySelector(".container");
const weatherinput = document.querySelector(".weather-input");
const card = document.querySelector(".card");
const apikey="6a91e9ea7de8589edbfa573cada93f64";
let temp1;

weather.addEventListener("submit",async event=>{
    const cityinput = weatherinput.value;
    event.preventDefault();
    if(cityinput){
       try{
          const weatherdata = await gatherweatherinfo(cityinput);
          displayweatherdata(weatherdata);
       }
       catch(error){
         console.error("Error found here!");
         displayerror(error);
       }
    }
    else{
        displayerror("Please enter a city");
    }
});

async function gatherweatherinfo(city){
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response = await fetch(api_url);
    //console.log(response);
    if(!response.ok){
        throw new Error("Invalid response.");
    }
    return await response.json();
}

function displayweatherdata(data){
    console.log(data);
    const {name:city,
        main: {temp, humidity},
        weather: [{description,id}]} = data;
    card.textContent="";
    card.style.display="flex";

    const cityname = document.createElement("h1");
    cityname.textContent = city;
    cityname.classList.add("cityname");
    card.appendChild(cityname);
    const temperature = document.createElement("p");
    temp1=(temp-273.15).toFixed(2);
    temperature.textContent = `${temp1}°C`;
    temperature.classList.add("temperature");
    card.appendChild(temperature);
    const humidities = document.createElement("p");
    humidities.textContent = `humidity: ${humidity}%`;
    humidities.classList.add("humidity");
    card.appendChild(humidities);
    const descriptions = document.createElement("p");
    descriptions.textContent = description;
    descriptions.classList.add("description");
    card.appendChild(descriptions);
    const weatheremoji = document.createElement("p");
    weatheremoji.textContent = displayweatherimoji(id);
    weatheremoji.classList.add("weather-emoji");
    card.appendChild(weatheremoji);
}

function displayweatherimoji(weatherid){
     switch(true){
        case (weatherid>=200 && weatherid<=232):
            return `⛈️`;
        case (weatherid>=300 && weatherid<=321):
            return `🌧️`;
        case (weatherid>=500 && weatherid<=531):
            return `🌧️`;
        case (weatherid>=600 && weatherid<=622):
            return `❄️`;
        case (weatherid>=700 && weatherid<=781):
            return `☀️`;
        case (weatherid>=801 && weatherid<=804):
            return `☁️`;
        case (weatherid==800):
            return `☀️`;
        default:
            return '❓';
     }
}

function displayerror(message){
     const displayError = document.createElement("p");
     displayError.textContent=message;
     displayError.classList.add("error");

     card.textContent="";
     card.style.display="block";
     card.appendChild(displayError);
}
