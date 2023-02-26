require('electron').ipcRenderer.on('appconfig', (event, message) => {
  appconfig = message
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("init-data").value = JSON.stringify(appconfig)
  })
})