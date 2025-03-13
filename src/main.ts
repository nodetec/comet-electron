import path from "path";

import { initDb, logDbInfo } from "&/db";
import { setupHandlers } from "&/handlers";
import { setupNoteCardContextMenu } from "&/menus";
import { app, BrowserWindow } from "electron";
import contextMenu from "electron-context-menu";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line @typescript-eslint/no-require-imports
if (require("electron-squirrel-startup")) {
  app.quit();
}

contextMenu();

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 0,
    trafficLightPosition: { x: 18, y: 18 },
    titleBarStyle: "hidden",
    backgroundColor: "#1D1E20",
    ...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),

    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // additionalArguments: [
      //   // Windows: C:\Users\<username>\AppData\Roaming\<YourAppName>
      //   // macOS: ~/Library/Application Support/<YourAppName>
      //   // Linux: ~/.config/<YourAppName>
      //   // path.join(app.getPath("appData"), "comet", "comet-alpha"),
      // ],
    },
  });

  // and load the index.html of the app.
  void mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Electron window hack
  mainWindow.once("ready-to-show", () => {
    // center the main window
    mainWindow.center();
    mainWindow.setSize(1200, 600);
    mainWindow.setMinimumSize(980, 350);
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on("ready", () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   createWindow();
// });

void app
  .whenReady()
  .then(async () => {
    await initDb(path.join(app.getPath("appData"), "comet", "comet-alpha"));
    setupHandlers();
    setupNoteCardContextMenu();
    createWindow();

    void logDbInfo();
  })
  .catch(console.error);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
