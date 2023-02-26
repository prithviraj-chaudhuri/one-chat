const { app, BrowserWindow } = require('electron')

const nodeFs = require('fs');
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 900,
      useContentSize: true,
      darkTheme: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        webviewTag: true
      }
    })
  
    win.loadFile(path.join(__dirname, 'index.html'))

    win.webContents.openDevTools()

    const configRootPath = process.env.CONF_LOCATION;
    if (configRootPath.trim().length > 0) {
      appConfig = JSON.parse(nodeFs.readFileSync(configRootPath, 'utf-8'));
    } else {
      appConfig = {
        "platforms": [
          {
            "id": "gchat",
            "name":"Google Chat",
            "url":"https://mail.google.com/chat/u/0/",
            "useragent":""
          }
        ]
      }
    }
    win.webContents.send('appconfig', appConfig)
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})