const supplement = {
  appKey: 'd2009af5b68f488b',
  location: 'CO/Boulder',
  localStorageKey: 'myWeather'
}

const storage = {
  myWeather: {
    lastLocation: 'Boulder,CO',
    lastTime: '',
    lastAlerts: [],
    lastCondition: {},
    lastOneDay: {},
    lastFiveDay: []
  },
  setLastLocation: function(data) {
    storage.myWeather.lastLocation = data
    storage.putStorage()
  },
  getLastLocation: function() {
    if (storage.myWeather) {
      return storage.myWeather.lastLocation
    }
    return null
  },
  setLastTime: function(data) {
    storage.myWeather.lastTime = data
    storage.putStorage()
  },
  setLastAlerts: function(data) {
    storage.myWeather.lastAlerts = data
    storage.putStorage()
  },
  setLastCondition: function(data) {
    storage.myWeather.lastCondition = data
    storage.putStorage()
  },
  setLastOneDay: function(data) {
    storage.myWeather.lastOneDay = data
    storage.putStorage()
  },
  setLastFiveDay: function(data) {
    storage.myWeather.lastFiveDay = data
    storage.putStorage()
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
