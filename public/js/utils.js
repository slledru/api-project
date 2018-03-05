const supplement = {
  appKey: 'd2009af5b68f488b',
  location: 'CO/Boulder'
}

const storage = {
  putStorage: function(key, data) {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(data))
    }
  },
  getStorage: function(key) {
    if (window.localStorage) {
      return JSON.parse(window.localStorage.getItem(key))
    }
    return null;
  }
}
