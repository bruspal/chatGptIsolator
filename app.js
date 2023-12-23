const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow() {
    const browserOptions = {
        width: 1600,
        height: 900,
        icon: __dirname + 'assets/logo/GPTIsolator_16x16.ico',
        webPreferences: {
            /*
             * security : disabling unsafe-eval #WIP
             */
            // Disable node in the browser context
            nodeIntegration: false,
            // set contextIsolation to false for a quick test.
            // TODO: implement preloading in order to disable contextIsolation
            contextIsolation: false,
            // Disable sandboxing
            sandbox: false,
            // prevent ujnsafe JS evaluation on unsecure context
            worldSafeExecuteJavaScript: true,
            // Disable remote module
            enableRemoteModule: false,
        },
    }
    console.log(browserOptions)
    mainWindow = new BrowserWindow(browserOptions)

    // Charger le site OpenAI Chat
    mainWindow.loadURL('https://chat.openai.com')

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})
