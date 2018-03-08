const htmlTags = {
  getImageTag: function(src, width, height) {
    // console.log(src);
    if (src.startsWith('http')) {
      const lastIndex = src.lastIndexOf('/')
      if (lastIndex > 0) {
        src = `https://g-wunder-images.herokuapp.com/${src.substr(lastIndex + 1)}`
      }
    }
    return `<img src="${src}" width="${width}px" height="${height}px">`
  },
  getRadarImageTag: function(src) {
    return `<img src="${src}" width="300px" height="300px">`
  },
  getDivTags: function(text) {
    return `<div>${text}</div>`
  },
  getTempRow: function(label, temp) {
    return `<div class="row"><div class="col-2">&nbsp;</div><div class="col-4">${label}</div><div class="col-5">${temp}°F</div></div>`
  },
  getDayColumn: function(data) {
    const date = `${data.simple.date.month}/${data.simple.date.day}`
    return `<div class="col-2">
              ${htmlTags.getDivTags(date)}
              ${htmlTags.getImageTag(data.day.icon_url, 25, 25)}
              ${htmlTags.getImageTag(data.night.icon_url, 25, 25)}
              ${htmlTags.getDivTags(data.simple.conditions)}
            </div>`
  },
  getAlertRow: function(alert) {
    return `<div class="row">
              <div class="col-12">
                <div class="alert-title">${alert.description}</div>
                <div class="alert-line">Expires on ${alert.expires}</div>
                <div class="alert-line">Issued on ${alert.date}</div>
                <div class="alert-line">${alert.message}</div>
              </div>
            </div>`
  },
  getRadarImageRow: function(src, location) {
    const image = htmlTags.getRadarImageTag(src)
    return `<div class="row">
              <div class="col-12">
                <div class="radar-location">${location}</div>
                <div class="radar-image">${image}</div>
              </div>
            </div>`
  }
}
const dom = {
  drawCurrentCondition: function(data) {
    // console.log('drawCurrentCondition');
    // console.log(data);
    dom.drawNormalCursor()
    $('#weather-image').empty()
    $('#current-temperature').text(`${data.temp_f}°F`)
    const locationTag = $(htmlTags.getDivTags(data.full_location))
    $('#weather-image').append(locationTag)
    const imageTag = $(htmlTags.getImageTag(data.icon_url, 100, 100))
    imageTag.addClass('img-fluid')
    imageTag.addClass('img-thumbnail')
    $('#weather-image').append(imageTag)
  },
  drawWeatherAlerts: function(data) {
    dom.drawNormalCursor()
    if (Array.isArray(data)) {
      if (data.length > 0) {
        let text = '';
        for (let i = 0; i < data.length; i++) {
          if (text.length > 0) {
            text += ', '
          }
          text += data[i].description
        }
        $('#alerts').text(text)
        $('#alerts').removeClass('no-alert')
        $('#alerts').addClass('alert')
      } else {
        $('#alerts').text('No Active Alerts')
        $('#alert-btn').attr('disabled', true)
        $('#alerts').addClass('no-alert')
        $('#alerts').removeClass('alert')
      }
    } else {
      $('#alerts').text('No Active Alerts')
      $('#alert-btn').attr('disabled', true)
      $('#alerts').addClass('no-alert')
      $('#alerts').removeClass('alert')
    }
  },
  drawWeatherDetailAlerts: function(data) {
    dom.drawNormalCursor()
    if (Array.isArray(data)) {
      if (data.length > 0) {
        $('#alert-details').empty()
        for (let i = 0; i < data.length; i++) {
          $('#alert-details').append($(htmlTags.getAlertRow(data[i])))
        }
      } else {
        $('#alert-details').text('There are no active weather alerts in effect.')
      }
    } else {
      $('#alert-details').text('There are no active weather alerts in effect.')
    }
  },
  drawOneDayForecast: function(data) {
    // console.log('drawOneDayForecast');
    // console.log(data);
    dom.drawNormalCursor()
    $('#high-low-temp').empty()
    $('#today').empty()
    $('#high-low-temp').append($(htmlTags.getTempRow('High', data.simple.high.fahrenheit)))
    $('#high-low-temp').append($(htmlTags.getTempRow('Low', data.simple.low.fahrenheit)))
    $('#today').append($(htmlTags.getDivTags(data.simple.date.pretty)))
    $('#today').append($(htmlTags.getDivTags(data.verbose.fcttext)))
  },
  drawFiveDayForecast: function(data) {
    // console.log('drawFiveDayForecast');
    // console.log(data);
    dom.drawNormalCursor()
    $('#five-day-title').text('Five Day Forecast')
    if (Array.isArray(data)) {
      $('#future-forecast').empty()
      for (let i = 0; i < data.length; i++) {
        $('#future-forecast').append($(htmlTags.getDayColumn(data[i])));
      }
    }
  },
  rotateScreen: function(pageName) {
    switch (pageName) {
      case 'planner':
        $('#chart-segment').css('transform', 'rotate(-90deg)')
        $('#chart-segment').css('-webkit-transform', 'rotate(-90deg)')
        $('#chart-segment').addClass('planner-chart')
        break
      default:
        break
    }
  },
  drawPlannerChart: function(data, userData) {
    // console.log('drawHistoricalSummary');
    userData.days[data.dateString] = data
    const keys = Object.keys(userData.days)
    const count = keys.filter((key) => userData.days[key] === false)
    if (count.length === 0) {
      dom.rotateScreen('planner')
      dom.drawNormalCursor()
      chartUtil.drawChart(userData)
    }
  },
  drawRadarImage: function(data, location) {
    dom.drawNormalCursor()
    $('#radar-image').empty()
    $('#radar-image').append($(htmlTags.getRadarImageRow(data, location)))
  },
  drawWaitCursor() {
    setTimeout(() => {
      $('#pleaseWaitModal').modal('show')
    }, 1)
  },
  drawNormalCursor() {
    setTimeout(() => {
      $('#pleaseWaitModal').modal('hide')
    }, 750)
  }
}

const chartUtil = {
  options: {
    scales: {
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero:true
        }
      }],
      xAxes: [{
        stacked: false
      }]
    }
  },
  monthName: {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  },
  highDataset: {
    label: 'High (°F)',
    data: [],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1
  },
  lowDataset: {
    label: 'Low (°F)',
    data: [],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  },

  drawChart: function(data) {
    let ctx = document.getElementById("chart").getContext('2d');
    const labels = []
    for (const key in data.days) {
      switch (data.frequency) {
        case 'months':
          labels.push(chartUtil.monthName[data.days[key].date.mon])
          break;
        case 'weeks':
        case 'days':
        default:
          labels.push(`${data.days[key].date.mon}/${data.days[key].date.mday}`)
          break;
      }
      chartUtil.highDataset.data.push(parseInt(data.days[key].maxtempi, 10))
      chartUtil.lowDataset.data.push(parseInt(data.days[key].mintempi, 10))
    }
    let myChart = new Chart(ctx, {
      type: 'bar',
      data:
      {
        labels: labels,
        datasets:
        [
          chartUtil.highDataset
        ]
      },
      options: chartUtil.options
    })
    myChart.data.datasets.push(chartUtil.lowDataset)
    // You update the chart to take into account the new dataset
    myChart.update();
  }
}
