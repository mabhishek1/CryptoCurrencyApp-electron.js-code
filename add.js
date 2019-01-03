const electron = require("electron")
let path = require("path")
const remote = electron.remote
const ipcRenderer = require("electron").ipcRenderer



document.getElementById("closeWindow").addEventListener("click",()=>{
    const currentWindow = remote.getCurrentWindow();
    currentWindow.close()
})

document.getElementById("addok").addEventListener("click",(event)=>{
    const targtp = document.getElementById("div2input").value;
    ipcRenderer.send("notify-val",targtp)
    const crw = remote.getCurrentWindow()
    crw.close()
    
})
