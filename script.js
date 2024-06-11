let lat;
let lon;
let locationName=document.getElementById("locationName");
let setIcon=document.getElementById("icon");
let desc=document.getElementById("description");
let temperature=document.getElementById("temp");
let minTemp=document.getElementById("minTemp");
let maxTemp=document.getElementById("maxTemp");
let windSpeed=document.getElementById("windSpeed");
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position=>{
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        console.log("latitude: "+lat+"  longitude: "+lon);
        let data =await getWeatherData(lat,lon);
        var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([lat,lon]).addTo(map);
        marker.bindPopup(`<b> ${data.name} </b>`).openPopup()
        // function onMapClick(e) {
        //     popup
        //         .setLatLng(e.latlng)
        //         .setContent("You clicked the map at " + e.latlng.toString())
        //         .openOn(map);
        // }
        
        map.on('click',async function(e){
            let data=await getWeatherData(e.latlng.lat,e.latlng.lng);
            marker.setLatLng([e.latlng.lat,e.latlng.lng])
            marker.bindPopup(`<b>${data.name}</b>`).openPopup();
         
        });
    


        getWeatherData(lat,lon);
    })
}

async function getWeatherData(lat,lon){
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b64a0c9b0cb72c628172e5866124bb92`;
    let response=await fetch(api);
    let data=await response.json();
    console.log(data);
    dataHandler(data);
    return data;
}


function dataHandler(data){
    const {temp,temp_min,temp_max}=data.main;
    const {description}=data.weather[0];
    //const {locationName}=data.name;
    const {speed}=data.wind;
    const {icon}=data.weather[0];
    locationName.innerHTML=data.name;
    desc.innerHTML=description;
    temperature.innerHTML=temp;
    minTemp.innerHTML="Min_Temp : "+temp_min;
    maxTemp.innerHTML="Max_Temp : "+temp_max;
    windSpeed.innerHTML="Wind speed : "+speed;
    setIcon.style["background-image"]=`url(${setIconFunction(icon)})`

}
function setIconFunction(icon) {
 
const icons = {
    "01d": "./animated/day.svg",
    "02d": "./animated/cloudy-day-1.svg",
    "03d": "./animated/cloudy-day-2.svg",
    "04d": "./animated/cloudy-day-3.svg",
    "09d": "./animated/rainy-1.svg",
    "10d": "./animated/rainy-2.svg",
    "11d": "./animated/rainy-3.svg",
    "13d": "./animated/snowy-6.svg",
    "50d": "./animated/mist.svg",
    "01n": "./animated/night.svg",
    "02n": "./animated/cloudy-night-1.svg",
    "03n": "./animated/cloudy-night-2.svg",
    "04n": "./animated/cloudy-night-3.svg",
    "09n": "./animated/rainy-1.svg",
    "10n": "./animated/rainy-2.svg",
    "11n": "./animated/rainy-3.svg",
    "13n": "./animated/snowy-6.svg",
    "50n": "./animated/mist.svg"
};
return icons[icon];
}