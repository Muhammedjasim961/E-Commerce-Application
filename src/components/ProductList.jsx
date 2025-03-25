import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(["all", ...data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "all" || product.category === selectedCategory
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return <p className="mt-10 text-3xl text-center">Loading products...</p>;

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Product List</h1>

      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg p-2 border rounded-md outline-none dark:bg-gray-800 dark:text-white"
        />

        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-amber-400"
                  : "bg-gray-300 text-black hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 transition duration-300 bg-white border rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-xl"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full h-56 mb-4 rounded-lg"
                />
                <h2 className="mb-2 text-xl font-bold">{product.title}</h2>
              </Link>

              <p className="text-gray-700 dark:text-gray-400">
                ${product.price}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="px-4 py-2 text-red-400 bg-red-500 rounded border-amber-500 hover:bg-red-600"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="text-blue-500 hover:underline dark:text-amber-400"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 col-span-full dark:text-red-400">
            No products found matching your search.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded-lg transition ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
              : "bg-blue-500 text-amber-500 hover:bg-blue-700 dark:bg-amber-500 dark:hover:bg-amber-600"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 rounded-lg transition ${
              currentPage === i + 1
                ? "bg-blue-600 text-sky-500 dark:bg-amber-600 dark:text-gray-900"
                : "bg-gray-300 text-black hover:bg-gray-400 dark:bg-gray-700 dark:text-white hover:dark:bg-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-lg transition ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
              : "bg-blue-500 text-amber-500 hover:bg-blue-700 dark:bg-amber-500 dark:hover:bg-amber-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
