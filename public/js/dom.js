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
  },
  drawOneDayForecast: function(data) {
    // console.log('drawOneDayForecast');
    // console.log(data);
    $('#high-low-temp').append($(htmlTags.getTempRow('High', data.simple.high.fahrenheit)))
    $('#high-low-temp').append($(htmlTags.getTempRow('Low', data.simple.low.fahrenheit)))
    $('#today').append($(htmlTags.getDivTags(data.simple.date.pretty)))
    $('#today').append($(htmlTags.getDivTags(data.verbose.fcttext)))
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
  },
  drawHistoricalSummary: function(data) {
    // console.log('drawHistoricalSummary');
    // console.log(data);
  }
}
