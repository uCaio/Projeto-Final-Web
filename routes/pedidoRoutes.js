const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { Pedido } = require('../models/db').models;

router.get('/obterPedido', pedidoController.exibirPedido);
router.post('/obterPedido', pedidoController.obterPedido);

router.get('/listaPedido', pedidoController.listarPedidos);

router.get('/obterPedido/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).send('<h2>ID inválido</h2>');
        }
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).send('<h2>Pedido não encontrado</h2>');
        }
        res.render('editarPedido', { pedido });
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).send('<h2>Erro no servidor ao tentar buscar o pedido.</h2>');
    }
});

router.patch('/obterPedido/editar/:id', pedidoController.editarPedido);

router.delete('/deletar/:id', pedidoController.deletarPedido);

module.exports = router;