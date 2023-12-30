const { app, BrowserWindow } = require('electron')

// Create global reference to mainWindow
let mainWindow

/*
 * Create the main window
 */
function createWindow() {
    const iconPath = __dirname + '/assets/logo/GPTIsolator_32x32.png';
    const BrowserWindowOptions = {
        width: 1600,
        height: 900,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: false,             // Disable node in the browser context (false by default)
            contextIsolation: true,             // set contextIsolation to protect against prototype pollution
            sandbox: true,                      // set sandboxing to true, useless in this context since app.enableSandbox() is called later. This is just for educational purpose.
            worldSafeExecuteJavaScript: true,   // prevent unsafe JS evaluation on unsecure context
            enableRemoteModule: false,          // Disable remote module
        },
    }
    mainWindow = new BrowserWindow(BrowserWindowOptions)

    // Charger le site OpenAI Chat
    mainWindow.loadURL('https://chat.openai.com')

    // mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

// Enable sandboxing application wise
app.enableSandbox()

// Create the main window when electron is ready
app.whenReady().then(() => {
    createWindow()
    // If application is running but no window is open create a new instance of the main window.
    app.on('activate', function () {
        if (mainWindow === null) createWindow()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

