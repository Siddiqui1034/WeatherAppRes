// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get the button element by its ID
    const searchBtn = document.getElementById('searchBtn');
    const searchCity = document.getElementById('searchCity')
    const longitude = document.getElementById("longitude")
    const weathercard1 = document.getElementsByClassName(".card1")
    const APIKEY = `08dd9de73419f1b8d9737237fc7cb363`

    //1. Get current Location and display it in cards
    // function checkLocation(){
    //     // check if the geolocation api is available in the browser
    //     if ("geolocation" in navigator){
    //         // Attempt to get the user's current position 
    //         window.addEventListener('load', () => {
    //             alert
    //         //     const imageContainer = document.querySelector('.imageGif');
    //         //     imageContainer.style.display = 'flex'; // Show the container
    //         //     setTimeout(() => {
    //         //         const image = document.querySelector('.fade-in');
    //         //         image.style.opacity = 1; // Trigger the fade-in effect
    //         //     }, 100); // Small delay to ensure the container is displayed before fading in
    //         });      
    //         // console.log("Location access Not granted") 

    //         navigator.geolocation.getCurrentPosition(
    //             function (position){
    //                 // success callback
    //                 console.log("Location access granted")
    //                 console.log("Latitude:", position.coords.latitude)
    //                 console.log("Longitude:", position.coords.longitude)

    //             },
    //             function (error){
    //                 // Error callback                
    //                 switch(error.code){
    //                     case error.PERMISSION_DENIED:
    //                         console.log("User denied the request for Geolocation.")
    //                         break;
    //                     case error.POSITION_UNAVAILABLE:
    //                         console.log("Location information is unavailable");
    //                         break;
    //                     case error.TIMEOUT:
    //                         console.log("The request to get the user location timed out")
    //                         break;
    //                     case error.UNKNOWN_ERROR:
    //                         console.log("An unknow erro occured.");
    //                         break;
    //                 }
    //             }
    //         )
    //     }
    //     else{
    //         console.log("Location access Not granted")   
    //     }  
    // } 

    // 2. Change Background color on Search
    const changeBackgroundArray = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
        'images/image5.jpg',
        'images/image0.jpg',
    ]
    function changeBackground(){
        
        // debouncing concept apply here so that user cann't frequenty click search to change background image
        document.body.style.opacity = 0;
        const randomIndex = Math.floor(Math.random() * changeBackgroundArray.length);
        // console.log(randomIndex)
        document.body.style.backgroundImage = `url('images/image${randomIndex}.jpg')`;
        document.body.style.opacity = 1;
    }
    document.getElementById('searchBtn').addEventListener('click', changeBackground);

    

    function createWeatherCard(weatherDetails){
        // console.log(weatherDetails)
        const {dt_txt, main, visibility, weather, wind} = weatherDetails
        const {temp} = weatherDetails.main
        const {speed} = weatherDetails.wind
        console.log(dt_txt, temp, speed, visibility, weather)

        if(index===0){
            return `
            <h2 class="location">Current Location${visibility}</h2>
          <h2 class="latitude">latitude</h2>
          <h2 class="longitude">longitude</h2>
          <h1 class="place">place:</h1>
          <h2 class="time">Time</h2>
          <h2 class="day">WeekDay, Day Month Year</h2>
          <h2 class="temperature">Temperature</h2>
            `;
        }else{
            return `
            <div>
              <h4>${weatherDetails.dt_txt.split(" ")[0]}</h4>
              <img src="https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png" alt="">
              <h4>Temperature ${temp-273}*C</h4>
              <h4>Visibility ${visibility}</h4>              
              <h4>Wind Speed ${speed}</h4>
            </div>
        `;
        }   
    }

    function getCityDetails(cityName, country, lat, lon){
        // console.log(cityName, lon, lat, country)
        return `
        <h2 class="location">Current Location${cityName}</h2>
          <h2 class="latitude">latitude${lat}</h2>
          <h2 class="longitude">longitude${lon}</h2>
          <h1 class="place">country:${country}</h1>
          <h2 class="time">Time</h2>
          <h2 class="day">WeekDay, Day Month Year</h2>
          <h2 class="temperature">Temperature</h2>
        `
    }

    function getWeatherDetails(cityName, country, lat, lon){
        let WEATHER_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
        fetch(WEATHER_API).then(res => res.json()).then(data=>{
            // console.log(data)
            getCityDetails(cityName, country, lat, lon)
            const uniqueForecastDay = []
            const Three_ForecastDay = data.list.filter(forecast =>{
                const forecasteDate = new Date(forecast.dt_txt).getDate()
                if(!uniqueForecastDay.includes(forecasteDate))
                    return uniqueForecastDay.push(forecasteDate)
            })
            // searchCity.value =""
            // weatherCardsDiv.innerHTML = ""
            // console.log(Three_ForecastDay)



            // Three_ForecastDay.forEach(weatherDetails =>{
            //     // weathercard1.appendChild("beforeend",  createWeatherCard(weatherDetails, cityName, index))
            //     createWeatherCard(weatherDetails, cityName, index)
            // })

        }).catch(()=>{
            console.log("Error occured fetching 5 day forecast")
        })
    }



    // Add a click event listener to the button
    function getCityCoords(){
        const cityName = searchCity.value.trim()
        if(!cityName) return;
        let  GEO_API =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKEY}`
   
        // get entered city coordinates from the api
        fetch(GEO_API).then(res => res.json()).then(data =>{
            // console.log(data)
            if(!data.length) return alert("Errorno citu with this name")
                const {name, country, lat, lon} = data[0]

            getWeatherDetails(name, country, lat, lon)

        }).catch(()=>{
            console.log("Error occured")
        })
    }

    searchBtn.addEventListener('click', getCityCoords);
}
);


