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
    api.getCurrentCondition(supplement.appKey, location, dom.drawCurrentCondition)
    api.getWeatherAlerts(supplement.appKey, location, dom.drawWeatherAlerts)
    api.getOneDayForecast(supplement.appKey, location, dom.drawOneDayForecast)
    //api.getFiveDayForecast(supplement.appKey, location, dom.drawFiveDayForecast)
  }
})
