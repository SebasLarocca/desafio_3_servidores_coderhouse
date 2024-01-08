const productManager = require('./productManager')
const express = require('express');

const app = express();

app.get('/products', async (req, res) => {
    if (req.query.limit) {
        let prods = await productManager.getProducts();
        let lista = JSON.parse(prods)

        console.log('hay query params')
        res.send(lista.slice(0,req.query.limit))
    } else {
        let prods = await productManager.getProducts();
        res.send(prods)
    }
})

app.get('/products/:pid', async (req, res)=>{
    let prod = await productManager.getProductsById(req.params.pid);
    res.send(prod)
})

app.listen(3000, () => {
    console.log('Aplicacion funcionando en puerto 3000')
})