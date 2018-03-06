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
  setupDatePicker()

  function setCurrentLocation(location) {
    supplement.location = location
    // api.getCurrentCondition(supplement.appKey, location, dom.drawCurrentCondition)
    // api.getWeatherAlerts(supplement.appKey, location, dom.drawWeatherAlerts)
    // api.getOneDayForecast(supplement.appKey, location, dom.drawOneDayForecast)
    // api.getFiveDayForecast(supplement.appKey, location, dom.drawFiveDayForecast)
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

  function initialize() {
    $('#home-btn').click(displayHomePage)
    $('#search-btn').click(displaySearchPage)
    $('#planner-btn').click(displayPlannerPage)
    $('#radar-btn').click(displayRadarPage)
    $('#alerts-btn').click(displayAlertsPage)
    $('#location-btn').click(selectLocation)
    $('#date-range-btn').click(selectDateRange)
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
    api.getRadarImage(supplement.appKey, supplement.location, dom.drawRadarImage)
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
  function selectLocation(event) {
    event.preventDefault()
    console.log(`selectLocation: ${$('#location').val()}`);
  }
  function selectDateRange(event) {
    event.preventDefault()
    console.log(`selectDateRange: ${$('#start-date').val()} to ${$('#end-date').val()}`);
  }
})
