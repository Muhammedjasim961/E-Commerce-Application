import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-gray-600">Rating: {product.rating.rate} ⭐</p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Specifications:</h2>
            <ul className="list-disc pl-5">
              <li>Material: Premium faux leather</li>
              <li>Size: Medium (30cm x 20cm)</li>
              <li>Weight: 500g</li>
              <li>Warranty: 1 year</li>
            </ul>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate(-1)} 
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
