$(document).ready(() => {
  dom.drawWaitCursor();
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
    const today = new Date(Date.now())
    $('#start-date').val(`${historicData.generateDateString(today)}`)
    $('#freq-number').val('7')
    $('#message-board').text('Looking back 7 days from today')
    $('#dateRangeModal').modal('show')
    displayPage('planner')
  }
  function displayRadarPage(event) {
    event.preventDefault()
    dom.drawWaitCursor();
    displayPage('radar')
    api.getRadarImage(supplement.appKey, supplement.location, dom.drawRadarImage)
  }
  function displayAlertsPage(event) {
    event.preventDefault()
    dom.drawWaitCursor();
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
      $('#locationModal').modal('hide')
      supplement.location = location
      storage.setLastLocation(location)
      dom.drawWaitCursor();
      retrieveWeatherInformation(location)
    } else {
      $('#location').focus()
    }
  }

  function selectDateRange(event) {
    event.preventDefault()
    const datePattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/
    const startDate = $('#start-date').val()
    if (startDate.length > 0 &&
        startDate.match(datePattern) != null) {
      const d = new Date(startDate);
      const numberString = $('#freq-number').val()
      if (numberString.length > 0) {
        const frequencyNumber = parseInt(numberString, 10)
        if (frequencyNumber > 1 &&
            frequencyNumber < 13) {
          const frequency = $('#frequency').val()
          const days = historicData.generateHistoryArray(d, frequencyNumber, frequency)
          $('#dateRangeModal').modal('hide')
          dom.drawWaitCursor();
          api.getHistoricalSummary(supplement.location,
            { frequency: frequency, days: days }, dom.drawPlannerChart)
        } else {
          $('#freq-number').val('2')
          $('#freq-number').focus()
        }
      } else {
        $('#freq-number').val('2')
        $('#freq-number').focus()
      }
    } else {
      $('#start-date').focus()
    }
  }
})



// colors
//  backgroundColor: [
//     'rgba(255, 99, 132, 0.2)',
//     'rgba(54, 162, 235, 0.2)',
//     'rgba(255, 206, 86, 0.2)',
//     'rgba(75, 192, 192, 0.2)',
//     'rgba(153, 102, 255, 0.2)',
//     'rgba(255, 159, 64, 0.2)',
//     'rgba(255, 99, 132, 0.2)',
//     'rgba(54, 162, 235, 0.2)',
//     'rgba(255, 206, 86, 0.2)',
//     'rgba(75, 192, 192, 0.2)',
//     'rgba(153, 102, 255, 0.2)',
//     'rgba(255, 159, 64, 0.2)'
// ],
// borderColor: [
//   'rgba(255,99,132,1)',
//   'rgba(54, 162, 235, 1)',
//   'rgba(255, 206, 86, 1)',
//   'rgba(75, 192, 192, 1)',
//   'rgba(153, 102, 255, 1)',
//   'rgba(255, 159, 64, 1)',
//   'rgba(255,99,132,1)',
//   'rgba(54, 162, 235, 1)',
//   'rgba(255, 206, 86, 1)',
//   'rgba(75, 192, 192, 1)',
//   'rgba(153, 102, 255, 1)',
//   'rgba(255, 159, 64, 1)'
// ],
