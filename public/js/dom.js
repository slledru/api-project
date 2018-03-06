const htmlTags = {
  getImageTag: function(src, width, height) {
    console.log(src);
    if (src.startsWith('http')) {
      const lastIndex = src.lastIndexOf('/')
      if (lastIndex > 0) {
        src = `../images/${src.substr(lastIndex + 1)}`
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
    return `<div class="row">
          <div class="col-2">&nbsp;</div>
          <div class="col-4">${label}</div>
          <div class="col-5">${temp}°F</div>
        </div>`
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
    $('#current-temperature').text(`${data.temp_f}°F`)
    const locationTag = $(htmlTags.getDivTags(data.full_location))
    $('#weather-image').append(locationTag)
    const imageTag = $(htmlTags.getImageTag(data.icon_url, 100, 100))
    imageTag.addClass('img-fluid')
    imageTag.addClass('img-thumbnail')
    $('#weather-image').append(imageTag)
    dom.drawNormalCursor()
  },
  drawWeatherAlerts: function(data) {
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
    dom.drawNormalCursor()
  },
  drawWeatherDetailAlerts: function(data) {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        $('#alert-details').empty()
        for (let i = 0; i < data.length; i++) {
          $('#alert-details').append($(htmlTags.getAlertRow(data[i])))
        }
      }
    }
    dom.drawNormalCursor()
  },
  drawOneDayForecast: function(data) {
    // console.log('drawOneDayForecast');
    // console.log(data);
    $('#high-low-temp').append($(htmlTags.getTempRow('High', data.simple.high.fahrenheit)))
    $('#high-low-temp').append($(htmlTags.getTempRow('Low', data.simple.low.fahrenheit)))
    $('#today').append($(htmlTags.getDivTags(data.simple.date.pretty)))
    $('#today').append($(htmlTags.getDivTags(data.verbose.fcttext)))
    dom.drawNormalCursor()
  },
  drawFiveDayForecast: function(data) {
    // console.log('drawFiveDayForecast');
    // console.log(data);
    $('#five-day-title').text('Five Day Forecast')
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        $('#future-forecast').append($(htmlTags.getDayColumn(data[i])));
      }
    }
    dom.drawNormalCursor()
  },
  drawHistoricalSummary: function(data) {
    // console.log('drawHistoricalSummary');
    // console.log(data);
    dom.drawNormalCursor()
  },
  drawRadarImage: function(data, location) {
    $('#radar-image').append($(htmlTags.getRadarImageRow(data, location)))
    dom.drawNormalCursor()
  },
  drawWaitCursor() {
    setTimeout(() => {
      $('body').addClass('please-wait')
    }, 10)
  },
  drawNormalCursor() {
    setTimeout(() => {
      $('body').removeClass('please-wait')
    }, 10)
  }
}
