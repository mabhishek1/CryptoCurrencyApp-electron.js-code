const path = require("path");
const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require("axios");
const ipcRenderer = require("electron").ipcRenderer


const notifyMe = document.getElementById("id2btn2")
const price = document.getElementById("spanprice")
let targetpriceval

const notification={
    title:"BTC ALERT",
    body:'BTC JUST BEAT TARGET PRICE',
}


function getBtc(){
    console.log("Fetching API")
    const val=axios.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD")
    .then(res=>{
        console.log(res.data)
        const cryptos = res.data.USD
        price.innerHTML = "$"+cryptos.toLocaleString('en')
        if(price.innerHTML != "" && targetpriceval<cryptos){
            console.log("tgt"+targetpriceval)
           const myNotifications = new Notification(notification.title,notification)
           
        }
    })
}

getBtc()
setInterval(getBtc,3000)

notifyMe.addEventListener("click",(event)=>{
    let win = new BrowserWindow({width:300,height:150,frame:false,alwaysOnTop:true})
    let modalPath = path.join(__dirname,"add.html")
    win.loadFile(modalPath);
    win.on('closed', () => {
        win = null
      })
})

const targetPrice = document.getElementById("targetprice")
ipcRenderer.on("target-price",(event,arg)=>{
    targetpriceval = arg
    targetPrice.innerHTML = arg;
})

