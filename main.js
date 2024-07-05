const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const express = require("express");

// Configuração do Express
const expressApp = express();

// Serve o index.html na rota /
expressApp.use("/", express.static(path.join(__dirname, "public")));

// Rota API que retorna "Hello World"
expressApp.get("/api", (req, res) => {
  res.send("Hello World");
});

// Inicia o servidor Express na porta 3000 (ou qualquer porta de sua escolha)
expressApp.listen(3000, () => {
  console.log("Servidor Express rodando na porta 3000");
});

// Referência global para o ícone da bandeja
let tray;

// Função para criar a janela do Electron
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Ocultar o menu padrão
  mainWindow.setMenu(null);

  // Carrega o index.html do servidor Express
  mainWindow.loadURL("http://localhost:3000");

  // Criar ícone da bandeja
  tray = new Tray(path.join(__dirname, "public",  "trayicon.png"));

  // Criar um menu de contexto para o ícone da bandeja
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item 1", type: "normal" },
    { label: "Item 2", type: "normal" },
    { type: "separator" },
    { label: "Quit", role: "quit" },
  ]);

  // Definir o menu de contexto para o ícone da bandeja
  tray.setContextMenu(contextMenu);

  // Exibir a janela principal quando o ícone da bandeja for clicado
  tray.on("click", () => {
    mainWindow.show();
  });
}

// Eventos do Electron
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
