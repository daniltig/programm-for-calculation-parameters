const path = require('path');
const url = require('url');
const {app, BrowserWindow, screen, Menu} = require('electron');
const {ipcMain, dialog} = require("electron");
ipcMain.handle("showSaveDialog",  async () => {
   let pathToFile;
    await dialog.showSaveDialog(
      win,
      {
         defaultPath : "C:\\Users\\perminov-d-d\\Desktop",
         filters :[
            {name: 'Documents', extensions: ['docx']}
         ]
      }
   ).then((result) => {
      pathToFile = result
   });

   return pathToFile
});
ipcMain.on('event-send-data', async (e, dataQ) => {
   let fs1 = require('fs');
   fs1.existsSync(process.env.HOMEDRIVE + process.env.HOMEPATH + "\\."+app.name) || fs1.mkdirSync(process.env.HOMEDRIVE + process.env.HOMEPATH + "\\."+app.name); // проверяет наличие папки. Если её нет, то создаёт эту папку

   await dialog.showSaveDialog(
      win,
      {
         defaultPath : process.env.HOMEDRIVE + process.env.HOMEPATH + "\\."+app.name,
         filters :[
            {name: '', extensions: ['json']}
         ]
      }
   ).then((pathToFile) => {
      fs1.writeFile(
         pathToFile.filePath, // путь к файлу
         JSON.stringify(dataQ), // то, что записать в файл
         function(err, result) {
            // функция может быть пустой
         }
      );
   });
});

async function my() {

      //console.log(process);
   //console.log(">HOMEDRIVE+HOMEPATH>"+process.env.HOMEDRIVE + process.env.HOMEPATH);
   //console.log(">HOME>"+process.env.HOME);
   //"C:\\Users\\perminov-d-d\\Desktop"
   let fs1 = require('fs');
   fs1.existsSync(process.env.HOMEDRIVE + process.env.HOMEPATH + "\\."+app.name) || fs1.mkdirSync(process.env.HOMEDRIVE + process.env.HOMEPATH + "\\."+app.name); // проверяет наличие папки. Если её нет, то создаёт эту папку

   await dialog.showOpenDialog(
      win,
      {
         defaultPath : process.env.HOMEDRIVE + process.env.HOMEPATH + "\\."+app.name,
         filters :[
            {name: '', extensions: ['json']}
         ]
      }
   ).then((pathToFile) => {
      fs1.readFile(
         pathToFile.filePaths[0], // путь к файлу
         'utf8',
         function(err, _data){
            let words = JSON.parse(_data); // получение данных из json файла
            win.webContents.send('event-send-jsonData', words); // передача данных в Renderer Process
         }
      );
   });
}

let templateMenu = [
   {
      label: 'Файл',
      submenu: [
         {
            label: 'Сохранить',
            click: function () { win.webContents.send('win-event-send-data'); }
         },
         {
            label: 'Загрузить',
            click: function () { my(); }
         },
      ]
   },
   /*{ label: 'Параметры' },*/
   {
      label: 'Панель разработчика',
      click: function () {

         let child = new BrowserWindow({ parent: win, modal: true, show: false, autoHideMenuBar: true, frame: true, width: 306, height:76, icon: __dirname + "/img/bearing.png", resizable: false,
            minimizable: false,
            maximizable: false,
            closable: false,
            webPreferences: {
               nodeIntegration: true,
               contextIsolation: false
            }
         })
         child.loadURL(
            `
            data:text/html;charset=utf-8,
            <head>
               <title>Введите пароль</title>
               <style type="text/css">

               </style>
            </head>
            <body style="width: fit-content; overflow: hidden;">
               <input onfocus="input_password.style.border='revert';" id="input_password" type="password"/>
               <button  onclick="const ipcRendererChildWindow = require('electron').ipcRenderer; console.log('close window'); if (input_password.value == 'password') ipcRendererChildWindow.send('close-child-window-ok', input_password.value); else input_password.style.borderColor='red';">Ок</button>
               <button onclick="const ipcRendererChildWindow = require('electron').ipcRenderer; console.log('close window'); ipcRendererChildWindow.send('close-child-window-cancel');">Отмена</button>
            </body>
            `
         )
         child.once('ready-to-show', () => {
            child.show()
         }),
         //child.webContents.openDevTools();
         //win.webContents.openDevTools();
         ipcMain.on('close-child-window-ok', (event, _password) => {
            child.destroy();
            //if (_password == "password")
               win.webContents.openDevTools();
         });
         ipcMain.on('close-child-window-cancel', () => {
            child.destroy();
         });
         child.setMenuBarVisibility(false);
         //child.setAutoResize({ width: true, height: true });
      }
   }
];
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

let win;

function createWindow(){

  let heightWin = screen.getPrimaryDisplay().workArea.height;
  let widthWin = screen.getPrimaryDisplay().workArea.width;

  win = new BrowserWindow({
    //minimizable: false,
    //maximizable: false,
    show: false,

    height: heightWin,
    width: widthWin/2,
    //maxHeight: heightWin,
    //maxWidth: widthWin,//widthWin/2,
    minHeight: heightWin,
    minWidth: widthWin/2,
    center: false,
    x:0,
    y:0,

    icon: __dirname + "/img/bearing.png",
    //autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //enableRemoteModule: true
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol:'file:',
    slashes: true
  }));

  //win.webContents.openDevTools();

  win.once('ready-to-show', () => {
     win.show()
  });

  win.on('closed', ()=>{
    win = null;
  });
}

app.on('ready',createWindow);

app.on('window-all-closed', ()=>{
  app.quit();
});
