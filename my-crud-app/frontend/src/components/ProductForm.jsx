import { useState, useEffect } from "react";

function ProductForm({
    addProduct,
    updateProduct,
    editingProduct
}) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {

        if(editingProduct){
            setName(editingProduct.name);
            setPrice(editingProduct.price);
        }
        else{
            setName("");
            setPrice("");
        }

    }, [editingProduct]);

    function submitHandler(e){

        e.preventDefault();

        // Validate product name
        if (!name || name.trim() === "") {
            alert("Please enter a valid product name.");
            return;
        }

        // Validate product price
        const numPrice = Number(price);
        if (price === "" || isNaN(numPrice) || numPrice <= 0) {
            alert("Please enter a valid positive price.");
            return;
        }

        const product = {
            name: name.trim(),
            price: numPrice
        };

        if(editingProduct){
            updateProduct({
                ...product,
                id: editingProduct.id
            });
        }
        else{
            addProduct(product);
        }

        setName("");
        setPrice("");
    }

    return(

        <form onSubmit={submitHandler}>

            <input
                type="text"
                value={name}
                placeholder="Product Name"
                onChange={(e)=>setName(e.target.value)}
                required
            />

            <input
                type="number"
                value={price}
                placeholder="Price"
                min="0.01"
                step="any"
                onChange={(e)=>setPrice(e.target.value)}
                required
            />

            <button type="submit">
                {editingProduct ? "Update Product" : "Add Product"}
            </button>

        </form>

    );

}

export default ProductForm;
