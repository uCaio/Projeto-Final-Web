const { Pedido } = require('../models/db').models;

const exibirPedido = async (req, res) => {
    res.render('pedidoCliente');
}

const obterPedido = async (req, res) => {
    try {
        const { clienteID, livroID, quantidade, dataPedido } = req.body;

        // Validações adicionais (opcional)
        if (!quantidade || quantidade <= 0) {
            return res.status(400).send('<h2>Quantidade inválida.</h2>');
        }
        const livroExistente = await Pedido.findOne({ where: { livroID } });
        if (!livroExistente) {
            return res.send('<h2>Livro não existe.</h2>')
        }
        
        await Pedido.create({ clienteID, livroID, quantidade, dataPedido });
        res.redirect('/livro/listaLivros');
    } catch (error) {
        console.error( error);
        res.status(400).send('Erro ao criar o pedido.!')
    }
}

const editarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { clienteID, livroID, quantidade, dataPedido } = req.body;
    
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).send('<h2>Pedido não encontrado</h2>');
        }
        await Pedido.update(
            { clienteID, livroID, quantidade, dataPedido },
            {where: {pedidoID: id}}
        );
        res.redirect('/pedidos/listaPedido')
    } catch (error) {
        res.status(500).send('<h2>Erro ao atualizar o pedido.</h2>')
    }
}

const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.render('listaPedidos', { pedidos });
    } catch (error) {
        console.log(error);
        res.status(500).sebd("<h2>Erro ao carregar lista de pedidos</h2>")
    }
}

const deletarPedido = async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);
      if (!pedido) {
        return res.status(404).send('<h2>Pedido não encontrado.</h2>');
      }
      await Pedido.destroy({ where: { livroID: id } });
      res.redirect('/pedidos/listaPedido');
  
    } catch (error) {
      console.log(error);
      res.status(500).send('<h2>Erro ao deletar pedido.</h2>')
    }
  }

module.exports = { exibirPedido, obterPedido, editarPedido ,listarPedidos, deletarPedido};