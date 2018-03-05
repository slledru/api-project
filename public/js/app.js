$(document).ready(() => {
  if ('geolocation' in navigator) {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        api.getCurrentLocation(supplement.appKey, position.coords.latitude,
          position.coords.longitude, setCurrentLocation)
      })
    } catch (e) {
      setCurrentLocation(supplement.location)
    }
  } else {
    setCurrentLocation(supplement.location)
  }
  initialize()

  function setCurrentLocation(location) {
    supplement.location = location
    api.getCurrentCondition(supplement.appKey, location, dom.drawCurrentCondition)
    api.getWeatherAlerts(supplement.appKey, location, dom.drawWeatherAlerts)
    api.getOneDayForecast(supplement.appKey, location, dom.drawOneDayForecast)
    api.getFiveDayForecast(supplement.appKey, location, dom.drawFiveDayForecast)
  }

  function initialize() {
    $('#home-btn').click(displayHomePage)
    $('#search-btn').click(displaySearchPage)
    $('#planner-btn').click(displayPlannerPage)
    $('#radar-btn').click(displayRadarPage)
    $('#alerts-btn').click(displayAlertsPage)
  }
  function displayHomePage(event) {
    event.preventDefault()
    $('#home-page').removeClass('collapse')
    $('#search-page').addClass('collapse')
    $('#planner-page').addClass('collapse')
    $('#radar-page').addClass('collapse')
    $('#alerts-page').addClass('collapse')
  }
  function displaySearchPage(event) {
    event.preventDefault()
    $('#home-page').addClass('collapse')
    $('#search-page').removeClass('collapse')
    $('#planner-page').addClass('collapse')
    $('#radar-page').addClass('collapse')
    $('#alerts-page').addClass('collapse')
  }
  function displayPlannerPage(event) {
    event.preventDefault()
    $('#home-page').addClass('collapse')
    $('#search-page').addClass('collapse')
    $('#planner-page').removeClass('collapse')
    $('#radar-page').addClass('collapse')
    $('#alerts-page').addClass('collapse')
  }
  function displayRadarPage(event) {
    event.preventDefault()
    $('#home-page').addClass('collapse')
    $('#search-page').addClass('collapse')
    $('#planner-page').addClass('collapse')
    $('#radar-page').removeClass('collapse')
    $('#alerts-page').addClass('collapse')
  }
  function displayAlertsPage(event) {
    event.preventDefault()
    $('#home-page').addClass('collapse')
    $('#search-page').addClass('collapse')
    $('#planner-page').addClass('collapse')
    $('#radar-page').addClass('collapse')
    $('#alerts-page').removeClass('collapse')
    api.getWeatherAlerts(supplement.appKey, supplement.location, dom.drawWeatherDetailAlerts)
  }
  function displayOptionsPage(event) {
    event.preventDefault()
    $('#home-page').addClass('collapse')
    $('#search-page').addClass('collapse')
    $('#planner-page').addClass('collapse')
    $('#radar-page').addClass('collapse')
    $('#alerts-page').addClass('collapse')
  }
})
