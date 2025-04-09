"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    console.log("🧪 Submitting product with name:", name);
  
    try {
      const response = await axios.post(`/api/products/add`, { name });
  
      console.log("🌐 Response received:");
      console.log("➡️ Status:", response.status);
      console.log("📦 Data:", response.data);
  
      if (response.status === 201) {
        console.log("✅ Product added successfully! Redirecting...");
        router.push("/products");
        router.refresh();
      } else {
        console.warn("⚠️ Unexpected status code:", response.status);
      }
    } catch (err: any) {
      console.error("❌ Error during product submission:");
      if (err.response) {
        console.error("🔻 Response error:", err.response.data);
        console.error("📉 Status:", err.response.status);
      } else if (err.request) {
        console.error("📡 No response received. Request was:", err.request);
      } else {
        console.error("💥 Request setup error:", err.message);
      }
      setError("Failed to add product");
    } finally {
      setLoading(false);
      console.log("⏹️ Done handling product submission.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/products"
          className="inline-block mb-8 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          ← Back to Products
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="Enter product name"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } transition-colors`}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
