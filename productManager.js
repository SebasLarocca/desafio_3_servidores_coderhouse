const fs = require('fs')

class ProductManager {
    constructor() {
        this.path = './data.json'
        this.products = []
    }
    static id = 0;
    addProduct = async (title, descripcion, precio, thumbnail, code, stock) => {
        let newProduct = {
            title,
            descripcion,
            precio,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }
        this.products.push(newProduct)
        ProductManager.id++
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }

    getProducts = async () => {
        try {
            let data1 = await fs.promises.readFile(this.path, 'utf-8')
            return data1
        }
        catch (err) {
            console.log(this.products)
        }
    }

    getProductsById = async (id) => {
        let data2 = await fs.promises.readFile(this.path, 'utf-8')
        let filterConsultar = await JSON.parse(data2).find(producto => producto.id == id);
        filterConsultar ? console.log(filterConsultar) : console.error('El ID no existe')
        return filterConsultar
    }

    deleteProductById = async (id) => {
        let data3 = await fs.promises.readFile(this.path, 'utf-8')
        let filterDelete = await JSON.parse(data3).filter(producto => producto.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(filterDelete))
    }

    updateProduct = async ({ id, ...producto }) => {
        await this.deleteProductById(id)
        let data4 = await fs.promises.readFile(this.path, 'utf-8')
        let parsedProducts = await JSON.parse(data4)
        let updatedProducts = [{ ...producto, id }, ...parsedProducts]
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts))
    }
}

const productManager = new ProductManager

productManager.addProduct('Silla', 'Hermosa silla', 200, 'Sin imagen', 'abc123', 25)
productManager.addProduct('Mesa', 'Una mesa', 200, 'Sin imagen', 'abc123', 25)
productManager.addProduct('Estantes', 'Con mucho espacio', 200, 'Sin imagen', 'abc123', 25)
productManager.addProduct('Lamapra', 'Muy luminosa', 200, 'Sin imagen', 'abc123', 25)

module.exports = productManager
