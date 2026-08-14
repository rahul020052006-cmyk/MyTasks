const products = require("../data/products");

// GET
exports.getProducts = (req, res) => {
    res.json(products);
};

// POST
exports.createProduct = (req, res) => {

    const { name, price } = req.body;

    const product = {
        id: Date.now(),
        name,
        price
    };

    products.push(product);

    res.status(201).json(product);
};

// PUT
exports.updateProduct = (req, res) => {

    const id = Number(req.params.id);

    const { name, price } = req.body;

    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    product.name = name;
    product.price = price;

    res.json(product);
};

// DELETE
exports.deleteProduct = (req, res) => {

    const id = Number(req.params.id);

    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(index, 1);

    res.json({
        message: "Deleted Successfully"
    });
};