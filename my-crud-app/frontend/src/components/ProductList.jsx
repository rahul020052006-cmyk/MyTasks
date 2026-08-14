function ProductList({
    products,
    deleteProduct,
    setEditingProduct
}) {

    return (

        <div>
            {products.map((product) => (
                <div className="product-card" key={product.id}>

                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>₹ {product.price}</p>
                    </div>

                    <div className="actions">

                        <button
                            className="edit-btn"
                            onClick={() => setEditingProduct(product)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => deleteProduct(product.id)}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))}
        </div>
    );

}

export default ProductList;