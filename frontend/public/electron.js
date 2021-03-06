const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width:1280,
        height:768,
        show: false
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => mainWindow = null);
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

function startPython() {
    if (isDev) {
        var { PythonShell } = require('python-shell');

        let options = {
        mode: 'text'
        };

        process.chdir('../backend/');
        PythonShell.run('server.py', options, function (err, result) {
        if (err) throw err;
            // results is an array consisting of messages collected during execution
            console.log('response: ', result);
        });
    } else {
        const opsys = process.platform;
        let exePath;
        if (opsys === "darwin") {
            exePath = path.join(__dirname, '../server')
        } else if (opsys === "win32" || opsys === "win64") {
            exePath = path.join(__dirname, '../server.exe')
        } else if (opsys === "linux") {
            exePath = path.join(__dirname, '../server')
        }
        require('child_process').execFile(exePath);
    }

}

startPython();