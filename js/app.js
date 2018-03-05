$(document).ready(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      api.getCurrentLocation(supplement.appKey, position.coords.latitude,
        position.coords.longitude, setCurrentLocation)
    })
  } else {
    setCurrentLocation(supplement.location)
  }

  function setCurrentLocation(location) {
    //api.getCurrentCondition(appKey, location, dom.drawCurrentCondition)
    api.getWeatherAlerts(supplement.appKey, location, dom.drawWeatherAlerts)
    //api.getOneDayForecast(appKey, location, dom.drawOneDayForecast)
    //api.getFiveDayForecast(appKey, location, dom.drawFiveDayForecast)
  }
})
