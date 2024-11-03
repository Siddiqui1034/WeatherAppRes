// Wait for the DOM to fully load
let now = new Date();
let date = now.getDate(); //3
let day = now.getDay(); //
let month = now.getMonth();
let year = now.getFullYear(); //24
let hrs = now.toLocaleTimeString();

document.addEventListener("DOMContentLoaded", function () {
  // Get the button element by its ID
  const searchBtn = document.getElementById("searchBtn");
  const searchInputCity = document.getElementById("searchInputCity");
  const longitude = document.getElementById("longitude");
  const latitude = document.getElementById("latitude");
  const time = document.getElementById("time");
  const dayD = document.getElementById("day");
  const tempD = document.getElementById("temp");
  const cityD = document.getElementById("city");
  const searchedCity = document.getElementById("searchCity");
  const searchTemp = document.getElementById("searchTemp");
  const searchHumidity = document.getElementById("searchHumidity");
  const searchVisibility = document.getElementById("searchVisibility");
  const searchWindSpeed = document.getElementById("searchWindSpeed");
  const searchIcon = document.getElementById("searchIcon");
  const searchIconDes = document.getElementById("searchIconDes");
  const weatherIcon = document.getElementById("weatherIcon");
  const searchfeelsLike = document.getElementById("searchfeelsLike");
  const humidity = document.getElementById("humidity");
  const pressure = document.getElementById("pressure");
  const searchIconD = document.getElementById("searchIcon");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weathercard1 = document.getElementsByClassName(".card1");
  const APIKEY = `08dd9de73419f1b8d9737237fc7cb363`;

  //1. Get current Location and display it in cards
  // function checkLocation(){
  //     // check if the geolocation api is available in the browser
  function getCurrentCityDetails(lat, lon) {
    let WEATHER_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    fetch(WEATHER_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(444,data);
        console.log(data.list[0].main.temp);
        let temp = data.list[0].main.temp;
        let city = data.city.name;
        tempD.innerHTML = `Temperature ${Math.ceil(temp - 273.5)} C`;
        cityD.innerHTML = ` ${city}`;
        searchTemp.innerHTML =`${data.list[0].main.temp}`
        
        searchVisibility.innerHTML=`${data.list[0].visibility}`
        searchWindSpeed.innerHTML=`${data.list[0].wind.speed}`
        searchIcon.innerHTML=`${data.list[0].weather[0].icon}`
        let iconD = `${data.list[0].weather[0].icon}`
        searchIconDes.innerHTML=`${data.list[0].weather[0].description}`
        weatherIcon.style.background = `url("https://openweathermap.org/img/wn/${iconD}@2x.png")`
        searchfeelsLike.innerHTML = `Feels Like ${data.list[0].main.feels_like}`
        pressure.innerHTML = `Pressure ${data.list[0].main.pressure}`
        humidity.innerHTML =  `Humidity ${data.list[0].main.humidity}`
        searchIconD.innerHTML =  `${data.list[0].weather[0].main}`

        
      })
      .catch(() => {
        console.log("Error occured fetching 5 day forecast");
      });
  }

  function searchCityDetails(cityName) {
    let GEO_API = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKEY}`;
    fetch(GEO_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(222, data)
        let city = data[0].name;
        searchedCity.innerHTML = `${city}, ${data[0].country}`

      })
      .catch(() => {
        console.log("Error occured fetching 5 day forecast");
      });
  }
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // success callback
        latitude.innerHTML = `Latitude: ${position.coords.latitude}`;
        longitude.innerHTML = `Longitude: ${position.coords.longitude}`;
        time.innerHTML = ` ${hrs}`;
        dayD.innerHTML = `${days[day]}, ${date} ${months[month]} ${year}`;
        let lat = `${position.coords.latitude}`;
        let lon = `${position.coords.longitude}`;

        getCurrentCityDetails(lat, lon);
        searchCityDetails("France");
      },
      function (error) {
        // Error callback
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable");
            break;
          case error.TIMEOUT:
            console.log("The request to get the user location timed out");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknow erro occured.");
            break;
        }
      }
    );
  } else {
    console.log("Location access Not granted");
  }

  // 2. Change Background color on Search
  const changeBackgroundArray = [
    "images/image1.jpg",
    "images/image3.jpg",
    "images/image4.jpg",
    "images/image0.jpg",
  ];
  function changeBackground() {
    // debouncing concept apply here so that user cann't frequenty click search to change background image
    document.body.style.opacity = 0;
    const randomIndex = Math.floor(
      Math.random() * changeBackgroundArray.length
    );
    // console.log(randomIndex)
    document.body.style.backgroundImage = `url('images/image${randomIndex}.jpg')`;
    document.body.style.opacity = 1;
  }
  document
    .getElementById("searchBtn")
    .addEventListener("click", changeBackground);
});
