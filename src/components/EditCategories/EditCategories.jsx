import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EditCategories.module.css";

const EditCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [operation, setOperation] = useState(""); // Track current operation
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch all categories when the component loads
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/categories/get`);
      setCategories(response.data.payload);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    if (formData.image) form.append("image", formData.image);

    try {
      setLoading(true);
      if (operation === "edit") {
        // Edit category
        await axios.put(
          `${backendUrl}/categories/edit/${selectedCategory._id}`,
          form
        );
      } else if (operation === "create") {
        // Create new category
        await axios.post(`${backendUrl}/categories/create`, form);
      }
      fetchCategories(); // Refetch categories after creating/editing
      setFormData({ name: "", image: null });
      setSelectedCategory(null);
    } catch (error) {
      console.log("Error submitting category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category? This action cannot be undone."
    );

    if (isConfirmed) {
      try {
        await axios.delete(`${backendUrl}/categories/delete/${id}`);
        fetchCategories(); // Refetch categories after deletion
      } catch (error) {
        console.log("Error deleting category:", error);
      }
    } else {
      console.log("Deletion canceled");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Manage Categories</h1>

      {/* Operation Buttons */}
      <div className={styles.operationButtons}>
        <button onClick={() => setOperation("create")} className={styles.btn}>
          Create Category
        </button>
        <button onClick={() => setOperation("edit")} className={styles.btn}>
          Edit Category
        </button>
        <button onClick={() => setOperation("delete")} className={styles.btn}>
          Delete Category
        </button>
        <button
          onClick={() => {
            setOperation("");
            fetchCategories();
          }}
          className={styles.btn}
        >
          Get All Categories
        </button>
      </div>

      {/* Forms based on selected operation */}
      {operation === "create" && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.operationHeader}>Create Category</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Category Name"
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className={styles.input}
          />
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      )}

      {operation === "edit" && (
        <div>
          <h2 className={styles.operationHeader}>Select a Category to Edit</h2>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li
                key={category._id}
                onClick={() => setSelectedCategory(category)}
              >
                <div
                  className={styles.categoryCard}
                  style={{
                    backgroundImage: `url(${backendUrl}/${category.image})`,
                  }}
                >
                  <span className={styles.categoryTitle}>{category.name}</span>
                </div>
              </li>
            ))}
          </ul>
          {selectedCategory && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.operationHeader}>Edit Category</h2>
              <input
                type="text"
                name="name"
                value={formData.name || selectedCategory.name}
                placeholder="Category Name"
                onChange={handleInputChange}
                className={styles.input}
                required
              />
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className={styles.input}
              />
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          )}
        </div>
      )}

      {operation === "delete" && (
        <div>
          <h2 className={styles.operationHeader}>
            Select a Category to Delete
          </h2>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li key={category._id} onClick={() => handleDelete(category._id)}>
                <div
                  className={styles.categoryCard}
                  style={{
                    backgroundImage: `url(${backendUrl}/${category.image})`,
                  }}
                >
                  <span className={styles.categoryTitle}>{category.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Displaying categories (for Get All Categories) */}
      {operation === "" && (
        <div>
          <h2 className={styles.operationHeader}>All Categories</h2>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li key={category._id}>
                <div
                  className={styles.categoryCard}
                  style={{
                    backgroundImage: `url(${backendUrl}/${category.image})`,
                  }}
                >
                  <span className={styles.categoryTitle}>{category.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EditCategories;
