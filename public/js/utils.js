const supplement = {
  location: 'CO/Boulder',
  localStorageKey: 'myWeather'
}

const storage = {
  myWeather: {
    lastLocation: null,
    lastTime: null,
    lastAlerts: null,
    lastCondition: null,
    lastOneDay: null,
    lastFiveDay: null
  },
  withinLimits: function() {
    // less than 5 minutes??
    let elapsed = Math.floor((Date.now() - storage.myWeather.lastTime)/1000/60)
    return (elapsed < 5)
  },
  setLastLocation: function(data) {
    if (data !== storage.getLastLocation()) {
      storage.myWeather.lastLocation = data
      storage.myWeather.lastTime = null
      storage.putStorage()
    }
  },
  getLastLocation: function() {
    if (storage.myWeather) {
      return storage.myWeather.lastLocation
    }
    return null
  },
  setLastTime: function() {
    storage.myWeather.lastTime = Date.now()
  },
  getLastTime: function() {
    if (storage.myWeather) {
      return storage.myWeather.lastTime
    }
    return null
  },
  setLastAlerts: function(data) {
    storage.myWeather.lastAlerts = data
    if (data !== null) {
      storage.setLastTime()
    }
    storage.putStorage()
  },
  getLastAlerts: function() {
    if (storage.myWeather && storage.withinLimits()) {
      return storage.myWeather.lastAlerts
    }
    return null
  },
  setLastCondition: function(data) {
    storage.myWeather.lastCondition = data
    if (data !== null) {
      storage.setLastTime()
    }
    storage.putStorage()
  },
  getLastCondition: function() {
    if (storage.myWeather && storage.withinLimits()) {
      return storage.myWeather.lastCondition
    }
    return null
  },
  setLastOneDay: function(data) {
    storage.myWeather.lastOneDay = data
    if (data !== null) {
      storage.setLastTime()
    }
    storage.putStorage()
  },
  getLastOneDay: function() {
    if (storage.myWeather && storage.withinLimits()) {
      return storage.myWeather.lastOneDay
    }
    return null
  },
  setLastFiveDay: function(data) {
    storage.myWeather.lastFiveDay = data
    if (data !== null) {
      storage.setLastTime()
    }
    storage.putStorage()
  },
  getLastFiveDay: function() {
    if (storage.myWeather && storage.withinLimits()) {
      return storage.myWeather.lastFiveDay
    }
    return null
  },
  putStorage: function() {
    if (window.localStorage) {
      window.localStorage.setItem(supplement.localStorageKey, JSON.stringify(storage.myWeather))
    }
  },
  getStorage: function() {
    if (window.localStorage) {
      let local = JSON.parse(window.localStorage.getItem(supplement.localStorageKey))
      if (local !== null) {
        storage.myWeather = local
      }
    }
  }
}

const historicData = {
  generateHistoryString: function(date) {
    const year = date.getYear() + 1899
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `history_${year}${('00' + month).slice(-2)}${('00' + day).slice(-2)}`
  },
  generateHistoryArray: function(date, total, frequency) {
    const historyObj = {}
    let year = date.getYear() + 1900
    let month = date.getMonth() + 1
    let day = date.getDate()
    for (let i = 0; i < total; i++) {
      const dateString = historicData.generateHistoryString(date)
      historyObj[dateString] = {}
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
    return historyObj
  }
}
