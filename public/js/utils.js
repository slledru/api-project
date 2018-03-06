const supplement = {
  appKey: 'd2009af5b68f488b',
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
    storage.myWeather.lastLocation = data
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
