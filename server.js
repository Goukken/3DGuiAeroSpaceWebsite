const express = require('express');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const appExpress = express();
const PORT = process.env.PORT || 3000; // Escolha a porta que deseja usar

// Define a pasta de arquivos estáticos para servir
appExpress.use(express.static(path.join(__dirname, 'dist')));

// Rota para servir o arquivo HTML principal
appExpress.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'GUI.html'));
});

// Inicia o servidor
appExpress.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/home`);
});
