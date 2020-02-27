const {app, BrowserWindow,dialog} = require('electron')
const path = require('path')
const url = require('url')
const {autoUpdater} = require('electron')
const log = require('electron-log')
const fs  = require('fs');
const server = 'https://piick.co.kr'
//const feed = `${server}/app_update/update/${process.platform}/${app.getVersion()}`
const feed = `https://github.com/SinYooDong/onshow/releases/tag/1.0.1/1.0.2.exe`
require('update-electron-app')()
log.info(fs.existsSync('https://github.com/SinYooDong/onshow/releases/tag/1.0.1/1.0.2'));
autoUpdater.setFeedURL(feed)

// setInterval(() => {
// 	console.log(feed);
//   autoUpdater.checkForUpdates()
// 	console.log(autoUpdater.checkForUpdates());
// }, 60000)
app.on('ready', function() {
    //운영환경일때만 업데이트 하도록 해도 무방
    //if (process.env.NODE_ENV !== 'production')

    autoUpdater.checkForUpdates();

});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: '새로운 버전이 다운로드 되었습니다. 업데이트를 적용하기 위해 앱을 재시작하세요.'
  }

	dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', message => {
  log.error('애플리케이션을 업데이트하는 도중 오류가 발생하였습니다.')
  log.error(message)
})

// require('electron-reload')(__dirname,{
// 	electron: require(`${__dirname}/node_modules/electron`)
// });
let win
let child
function createWindow () {

  win = new BrowserWindow({width: 800, height: 600,resizable: false, autoHideMenuBar:true,fullscreenable:true})
  child = new BrowserWindow({parent: win,width: 50, height: 54, resizable: false,alwaysOnTop:true,x:5,y:5,frame:false,show:false})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  child.loadURL(url.format({
    pathname: path.join(__dirname, 'popup.html'),
    protocol: 'file:',
    slashes: true
  }))

win.webContents.openDevTools()


  win.on('closed', () => {

    win = null
  })


win.on('blur', () => {
    child.showInactive()

		child.setAlwaysOnTop(true)
  })
win.on('restore', () => {
    child.hide()
	win.show()
		child.setAlwaysOnTop(true)
  })
win.on('focus', () => {
    child.hide()
		child.setAlwaysOnTop(true)
  })
 child.on('focus', () => {
			child.hide()
		  win.show()
				child.setAlwaysOnTop(true)



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
