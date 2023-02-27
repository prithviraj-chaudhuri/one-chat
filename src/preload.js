const { app } = require('electron')

require('electron').ipcRenderer.on('appconfig', (event, message) => {
  appconfig = message
  window.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    localStorage.setItem("appconfig", JSON.stringify(appconfig));
  })
})