document.addEventListener('DOMContentLoaded', () =>{
const current = new Date();

const api = {
    key: "a1d1361ee4b375252cb8a6721ea11005"
}
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(event){
    if(event.keyCode == 13){
        getResults(searchbox.value)
    }
}

function getResults (query){ 
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${api.key}`)
.then(response => {    ;
    return response.json();
})
.then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");    
    let temp = document.querySelector(".current .temp");
    let condition = document.querySelector(".current .weather");
    let date = document.querySelector(".location .date");
    let noError = true;
    try {        
    city.innerText =`${weather.city.name}, ${weather.city.country}`;
    temp.innerHTML = `${Math.round(weather.list[0].main.temp)}<span>c°</span>`;    
    condition.innerText = `${weather.list[0].weather[0].main}`;    
    date.innerText = dateBuilder();
    } catch (error) {
        noError = false;
        let input = document.querySelector(".search-box");
        input.value = "";
        input.placeholder="Input has to be an actual Location";
        console.log("Error, City must be an actual Location");
    }

    if(noError)upcomingDays(weather);
}

function dateBuilder (){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[current.getDay()];
    let d = current.getDate();
    let month = months[current.getMonth()];
    let year = current.getFullYear();

    return `${day} ${d} ${month} ${year}`;
}

function upcomingDays (weather){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const upcoming = document.querySelector("upcoming")
    let daycounter = 1;

    for(let counter = 8;counter<=24;counter+=8){
        
        let box = document.querySelector(`.upcoming #container${counter}`);
        box.style.border = "solid";
        box.innerHTML = "";

        let day = document.createElement("div");        
        day.innerText = days[(current.getDay()+daycounter)% 7];
        box.appendChild(day);

        let smallCondition = document.createElement("div");
        smallCondition.innerText = `${Math.round(weather.list[counter].main.temp)}c°`;        
        box.appendChild(smallCondition);

        let smallWeather = document.createElement("div");
        smallWeather.innerText = `${weather.list[counter].weather[0].main}`;
        box.appendChild(smallWeather);


        daycounter++;
    }
}
})
