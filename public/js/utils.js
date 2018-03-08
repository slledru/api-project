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
  generateDateString: function(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${('00' + month).slice(-2)}/${('00' + day).slice(-2)}/${year}`
  },
  generateHistoryString: function(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `history_${year}${('00' + month).slice(-2)}${('00' + day).slice(-2)}`
  },
  isThirtyDayMonth: function(month) {
    return (month === 4 ||
            month === 6 ||
            month === 9 ||
            month === 11)
  },
  addDays(date, days) {
    const newDate = new Date(date.valueOf())
    newDate.setDate(newDate.getDate() + parseInt(days))
    return newDate
  },
  generateHistoryArray: function(date, total, frequency) {
    const dateStringArray = []
    for (let i = 0; i < total; i++) {
      let month = date.getMonth() + 1
      const dateString = historicData.generateHistoryString(date)
      dateStringArray.unshift(dateString)
      switch (frequency) {
        case 'weeks':
          date = historicData.addDays(date, -7)
          break;
        case 'months':
          if (date.getMonth() <= 0) {
            date = new Date(date.getFullYear() - 1, 11, date.getDate())
          } else {
            date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
          }
          break;
        case 'days':
        default:
          date = historicData.addDays(date, -1)
          break;
      }
    }
    const historyObj = dateStringArray.reduce((acc, element) => {
      acc[element] = false
      return acc
    }, {})
    return historyObj
  },
  generateFutureArray: function(date, total, frequency) {
    const dateStringArray = []
    for (let i = 0; i < total; i++) {
      let month = date.getMonth() + 1
      const dateString = historicData.generateHistoryString(date)
      dateStringArray.push(dateString)
      switch (frequency) {
        case 'weeks':
          date = historicData.addDays(date, 7)
          break;
        case 'months':
          if (date.getMonth() >= 11) {
            date = new Date(date.getYear(), 0, date.getDate())
          } else {
            date = new Date(date.getYear(), date.getMonth() + 1, date.getDate())
          }
          break;
        case 'days':
        default:
          date = historicData.addDays(date, 1)
          break;
      }
    }
    const historyObj = dateStringArray.reduce((acc, element) => {
      acc[element] = false
      return acc
    }, {})
    return historyObj
  }
}
