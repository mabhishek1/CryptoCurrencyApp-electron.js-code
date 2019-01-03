const {app, BrowserWindow} = require('electron')
const ipcMain = require("electron").ipcMain
  
  let win
  
  function createWindow () {
    win = new BrowserWindow({width: 800, height: 600})
    win.loadFile('index.html')
    // win.webContents.openDevTools()
    win.on('closed', () => {
      win = null
    })
  }
  app.on('ready', createWindow)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
  
  
  ipcMain.on("notify-val",(event,arg)=>{
    win.webContents.send("target-price",arg)
  })