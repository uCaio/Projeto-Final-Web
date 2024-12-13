const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Rota para exibir a página inicial
router.get('/', homeController.exibirHome);

module.exports = router;
