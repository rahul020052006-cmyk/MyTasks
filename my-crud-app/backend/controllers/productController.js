const products = require("../data/products");

// GET
exports.getProducts = (req, res) => {
    res.json(products);
};

// POST
exports.createProduct = (req, res) => {
    const { name, price } = req.body;

    // Validate name and price input
    if (
        !name ||
        typeof name !== "string" ||
        name.trim() === "" ||
        price === undefined ||
        price === null ||
        isNaN(Number(price)) ||
        Number(price) <= 0
    ) {
        return res.status(400).json({
            message: "Validation Error: Product name must be a non-empty string and price must be a positive number."
        });
    }

    const product = {
        id: Date.now(),
        name: name.trim(),
        price: Number(price)
    };

    products.push(product);

    res.status(201).json(product);
};

// PUT
exports.updateProduct = (req, res) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;

    // Validate name and price input
    if (
        !name ||
        typeof name !== "string" ||
        name.trim() === "" ||
        price === undefined ||
        price === null ||
        isNaN(Number(price)) ||
        Number(price) <= 0
    ) {
        return res.status(400).json({
            message: "Validation Error: Product name must be a non-empty string and price must be a positive number."
        });
    }

    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    product.name = name.trim();
    product.price = Number(price);

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
