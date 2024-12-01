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
        res.send('<h2>Pedido concluído com sucesso!</h2>')
    } catch (error) {
        console.error( error);
        res.status(400).send('Erro no servidor!')
    }
    
   
}


module.exports = { exibirPedido, obterPedido};