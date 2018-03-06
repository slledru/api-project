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
  setupEventHandler()
  setupDatePicker()

  function setCurrentLocation(location) {
    supplement.location = location
    const {
      drawCurrentCondition,
      drawWeatherAlerts,
      drawOneDayForecast,
      drawFiveDayForecast
    } = dom
    retrieveWeatherInformation(location, {
      drawCurrentCondition,
      drawWeatherAlerts,
      drawOneDayForecast,
      drawFiveDayForecast
    })
  }

  function setupDatePicker() {
    var startDate=$('input[name="start-date"]'); //our date input has the name "date"
    var endDate=$('input[name="end-date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
      format: 'mm/dd/yyyy',
      container: container,
      todayHighlight: true,
      orientation: "top left",
      autoclose: true,
    };
    startDate.datepicker(options);
    endDate.datepicker(options);
  }

  function setupEventHandler() {
    $('#home-btn').click(displayHomePage)
    $('#search-btn').click(displaySearchPage)
    $('#planner-btn').click(displayPlannerPage)
    $('#radar-btn').click(displayRadarPage)
    $('#alerts-btn').click(displayAlertsPage)
    $('#location-btn').click(selectLocation)
    $('#date-range-btn').click(selectDateRange)
  }
  function retrieveWeatherInformation(location, funcs) {
    api.getCurrentCondition(supplement.appKey, location, funcs.drawCurrentCondition)
    api.getWeatherAlerts(supplement.appKey, location, funcs.drawWeatherAlerts)
    api.getOneDayForecast(supplement.appKey, location, funcs.drawOneDayForecast)
    api.getFiveDayForecast(supplement.appKey, location, funcs.drawFiveDayForecast)
    dom.drawWaitCursor();
  }
  function displayHomePage(event) {
    event.preventDefault()
    displayPage('home')
  }
  function displaySearchPage(event) {
    event.preventDefault()
    displayPage('search')
  }
  function displayPlannerPage(event) {
    event.preventDefault()
    displayPage('planner')
  }
  function displayRadarPage(event) {
    event.preventDefault()
    displayPage('radar')
    api.getRadarImage(supplement.appKey, supplement.location, dom.drawRadarImage)
  }
  function displayAlertsPage(event) {
    event.preventDefault()
    displayPage('alerts')
    api.getWeatherAlerts(supplement.appKey, supplement.location, dom.drawWeatherDetailAlerts)
  }
  function displayPage(pageName) {
    $('#home-page').addClass('collapse')
    $('#search-page').addClass('collapse')
    $('#planner-page').addClass('collapse')
    $('#radar-page').addClass('collapse')
    $('#alerts-page').addClass('collapse')
    switch (pageName) {
      case 'search':
        $('#search-page').removeClass('collapse')
        break
      case 'planner':
        $('#planner-page').removeClass('collapse')
        break
      case 'radar':
        $('#radar-page').removeClass('collapse')
        break
      case 'alerts':
        $('#alerts-page').removeClass('collapse')
        break
      case 'home':
      default:
        $('#home-page').removeClass('collapse')
        break
    }
  }
  function selectLocation(event) {
    event.preventDefault()
    console.log(`selectLocation: ${$('#location').val()}`);
  }
  function selectDateRange(event) {
    event.preventDefault()
    console.log(`selectDateRange: ${$('#start-date').val()} to ${$('#end-date').val()}`);
  }
})
