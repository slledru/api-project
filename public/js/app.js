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
  function generateHistoryString(date) {
    const year = date.getYear() + 1899
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `history_${year}${('00' + month).slice(-2)}${('00' + day).slice(-2)}`
  }
  function generateHistoryArray(date, total, frequency) {
    const array = []

    let year = date.getYear() + 1900
    let month = date.getMonth() + 1
    let day = date.getDate()
    for (let i = 0; i < total; i++) {
      let dateString = generateHistoryString(date)
      array.push(dateString)
      switch (frequency) {
        case 'weeks':
          day += 7
          break;
        case 'months':
          day += 30
          break;
        case 'days':
        default:
          day += 1
          break;
      }
      if (month === 2) {
        if (day > 28) {
          month += 1
          day -= 28
        }
      } else if (month === 4 ||
                 month === 6 ||
                 month === 9 ||
                 month === 11) {
        if (day > 30) {
          month += 1
          day -= 30
        }
      } else {
        if (day > 31) {
          month += 1
          day -= 31
        }
      }
      if (month > 12) {
        year += 1
        month -= 12
      }
      date.setDate(day)
      date.setMonth(month - 1)
      date.setYear(year)
    }
    console.log(array);
    return array
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
            frequencyNumber < 8) {
          const days = generateHistoryArray(d, frequencyNumber, $('#frequency').val())
              $('#dateRangeModal').modal('hide')
              rotateScreen('planner')
              drawPlannerChart()
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
  function rotateScreen(pageName) {
    switch (pageName) {
      case 'planner':
        $('#chart-segment').css('transform', 'rotate(-90deg)')
        $('#chart-segment').css('-webkit-transform', 'rotate(-90deg)')
        $('#chart-segment').addClass('planner-chart')
        break
      default:
        break
    }
  }
  function drawPlannerChart() {
    let ctx = document.getElementById("chart").getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'bar',
      data:
      {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets:
        [
          {
            label: 'High (°F)',
            data: [32, 29, 50, 54, 60, 67, 80, 95, 78, 65, 40, 35],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          }
        ]
      },
      options:
      {
        scales:
        {
          yAxes:
          [
            {
              stacked: false,
              ticks:
              {
                beginAtZero:true
              }
            }
          ],
          xAxes:
          [
            {
              stacked: false
            }
          ]
        }
      }
    })

    var newDataset = {
      label: 'Low (°F)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      data: [15, 5, 26, 34, 46, 50, 65, 70, 54, 43, 30, 26],
     }

     // You add the newly created dataset to the list of `data`
     myChart.data.datasets.push(newDataset);

     // You update the chart to take into account the new dataset
     myChart.update();
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
