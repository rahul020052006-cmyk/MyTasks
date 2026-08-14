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

        const product = {
            name,
            price: Number(price)
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
            />

            <input
                type="number"
                value={price}
                placeholder="Price"
                onChange={(e)=>setPrice(e.target.value)}
            />

            <button>
                {editingProduct ? "Update Product" : "Add Product"}
            </button>

        </form>

    );

}

export default ProductForm;