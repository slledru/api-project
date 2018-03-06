$(document).ready(() => {
  storage.getStorage();
  let lastLocation = storage.getLastLocation()
  if (lastLocation === null) {
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
  } else {
    setCurrentLocation(lastLocation)
  }
  setupEventHandler()
  setupDatePicker()

  function setCurrentLocation(location) {
    supplement.location = location
    storage.setLastLocation(location)
    retrieveWeatherInformation(location)
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
  function retrieveWeatherInformation(location) {
    try {
      api.getCurrentCondition(supplement.appKey, location, dom.drawCurrentCondition)
      api.getWeatherAlerts(supplement.appKey, location, dom.drawWeatherAlerts)
      api.getOneDayForecast(supplement.appKey, location, dom.drawOneDayForecast)
      api.getFiveDayForecast(supplement.appKey, location, dom.drawFiveDayForecast)
    } catch (e) {
      console.log(e);
    }
    dom.drawWaitCursor();
  }
  function displayHomePage(event) {
    event.preventDefault()
    displayPage('home')
  }
  function displaySearchPage(event) {
    event.preventDefault()
    $('#locationModal').modal('show')
    setTimeout(() => {
      $('#location').focus()
    }, 500)
    displayPage('home')
  }
  function displayPlannerPage(event) {
    event.preventDefault()
    $('#dateRangeModal').modal('show')
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
    // console.log(`switching to ${pageName}`);
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
    let location = $('#location').val()
    if (location.length > 0) {
      console.log(location)
      $('#locationModal').modal('hide')
      supplement.location = location
      storage.setLastLocation(location)
      retrieveWeatherInformation(location)
    } else {
      $('#location').focus()
    }
  }
  function selectDateRange(event) {
    event.preventDefault()
    console.log(`selectDateRange: ${$('#start-date').val()} to ${$('#end-date').val()}`);
    $('#dateRangeModal').modal('hide')
    rotateScreen('planner')
  }
  function resetScreenOrientation(pageName) {
    switch (pageName) {
      case 'search':
        $('#search-page').removeClass('rotate-90')
        break
      case 'planner':
        $('#planner-page').removeClass('rotate-90')
        break
      case 'radar':
        $('#radar-page').removeClass('rotate-90')
        break
      case 'alerts':
        $('#alerts-page').removeClass('rotate-90')
        break
      case 'home':
      default:
        $('#home-page').removeClass('rotate-90')
        break
    }
  }
  function rotateScreen(pageName) {
    switch (pageName) {
      case 'search':
        $('#search-page').addClass('rotate-90')
        break
      case 'planner':
        // $('#planner-page').addClass('rotate-90')
        $('#chart').css('transform', 'rotate(-90deg)')
        $('#chart').css('-webkit-transform', 'rotate(-90deg)')
        $('#chart').addClass('planner-chart')
        break
      case 'radar':
        $('#radar-page').addClass('rotate-90')
        break
      case 'alerts':
        $('#alerts-page').addClass('rotate-90')
        break
      case 'home':
      default:
        $('#home-page').addClass('rotate-90')
        break
    }
  }
})
