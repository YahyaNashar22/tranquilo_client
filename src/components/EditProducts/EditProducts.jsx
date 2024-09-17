import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EditProducts.module.css";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [operation, setOperation] = useState(""); // Track current operation
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedProduct && operation === "edit") {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        categoryId: selectedProduct.categoryId || "",
      });
    }
  }, [selectedProduct, operation]);

  const fetchProducts = async () => {
    try {
      const response = await axios.post(`${backendUrl}/products/get`);
      setProducts(response.data.payload);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/categories/get`); // Adjust the endpoint based on your API
      setCategories(response.data.payload);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (operation === "edit") {
        await axios.put(
          `${backendUrl}/products/edit/${selectedProduct._id}`,
          formData
        );
      } else if (operation === "create") {
        await axios.post(`${backendUrl}/products/create`, formData);
      }
      fetchProducts(); // Refetch products after creating/editing
      setFormData({ name: "", description: "", price: "", categoryId: "" });
      setSelectedProduct(null);
    } catch (error) {
      console.log("Error submitting product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${backendUrl}/products/delete/${id}`);
        fetchProducts(); // Refetch products after deletion
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    } else {
      console.log("Deletion canceled");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Manage Products</h1>

      {/* Operation Buttons */}
      <div className={styles.operationButtons}>
        <button onClick={() => setOperation("create")} className={styles.btn}>
          Create Product
        </button>
        <button onClick={() => setOperation("edit")} className={styles.btn}>
          Edit Product
        </button>
        <button onClick={() => setOperation("delete")} className={styles.btn}>
          Delete Product
        </button>
        <button
          onClick={() => {
            setOperation("");
            fetchProducts();
          }}
          className={styles.btn}
        >
          Get All Products
        </button>
      </div>

      {/* Forms based on selected operation */}
      {operation === "create" && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.operationHeader}>Create Product</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Product Name"
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            placeholder="Product Description"
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Product Price"
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className={styles.input}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      )}

      {operation === "edit" && (
        <div>
          <h2 className={styles.operationHeader}>Select a Product to Edit</h2>

          {selectedProduct && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.operationHeader}>Edit Product</h2>
              <input
                type="text"
                name="name"
                value={formData.name || selectedProduct.name}
                placeholder="Product Name"
                onChange={handleInputChange}
                className={styles.input}
                required
              />
              <textarea
                name="description"
                value={formData.description || selectedProduct.description}
                placeholder="Product Description"
                onChange={handleInputChange}
                className={styles.input}
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price || selectedProduct.price}
                placeholder="Product Price"
                onChange={handleInputChange}
                className={styles.input}
                required
              />
              <select
                name="categoryId"
                value={formData.categoryId || selectedProduct.categoryId}
                onChange={handleInputChange}
                className={styles.input}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          )}
          <ul className={styles.productList}>
            {products.map((product) => (
              <li
                key={product._id}
                onClick={() => setSelectedProduct(product)}
                className={styles.productItem}
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {operation === "delete" && (
        <div>
          <h2 className={styles.operationHeader}>Select a Product to Delete</h2>
          <ul className={styles.productList}>
            {products.map((product) => (
              <li
                key={product._id}
                onClick={() => handleDelete(product._id)}
                className={styles.productItem}
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Displaying products (for Get All Products) */}
      {operation === "" && (
        <div>
          <h2 className={styles.operationHeader}>All Products</h2>
          <ul className={styles.productList}>
            {products.map((product) => (
              <li key={product._id} className={styles.productItem}>
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EditProducts;
