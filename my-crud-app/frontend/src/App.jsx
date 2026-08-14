import { useEffect, useState } from "react";
import api from "./api/api";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  async function getProducts() {
    const res = await api.get("/products");
    setProducts(res.data);
  }

  async function addProduct(product) {
    await api.post("/products", product);
    getProducts();
  }

  async function updateProduct(product) {
    await api.put(`/products/${product.id}`, product);
    setEditingProduct(null);
    getProducts();
  }

  async function deleteProduct(id) {
    await api.delete(`/products/${id}`);
    getProducts();
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">

      <h1>CRUD Application</h1>

      <ProductForm
        addProduct={addProduct}
        updateProduct={updateProduct}
        editingProduct={editingProduct}
      />

      <ProductList
        products={products}
        deleteProduct={deleteProduct}
        setEditingProduct={setEditingProduct}
      />

      <button
        className="refresh-btn"
        onClick={getProducts}
      >
        Refresh Products
      </button>

    </div>
  );
}

export default App;