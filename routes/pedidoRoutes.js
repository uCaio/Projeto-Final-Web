const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');



router.get('/obterPedido', pedidoController.exibirPedido);
router.post('/obterpedido', pedidoController.obterPedido)

module.exports = router;