const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

app.listen(5000, () => {
    console.log("Server Running at http://localhost:5000");
});