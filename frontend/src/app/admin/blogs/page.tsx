"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
  Clock,
  Eye,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/api";

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  slug: string;
  categoryId: number;
  image: string;
  published: boolean;
  authorId: number;
  author: {
    id: number;
    name: string;
    email: string;
  };
  category: {
    id: number;
    name: string;
  };
}

interface Alert {
  type: "success" | "error" | "info";
  message: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<number | "all">("all");
  const [alert, setAlert] = useState<Alert | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    blogId: number | null;
  }>({
    show: false,
    blogId: null,
  });

  useEffect(() => {
    console.log("[Blogs] Component mounted, fetching data...");
    fetchBlogs();
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("[Blogs] Current blogs state:", blogs);
  }, [blogs]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (type: Alert["type"], message: string) => {
    setAlert({ type, message });
  };

  const fetchBlogs = async () => {
    console.log("[Blogs] Fetching blogs from server...");
    try {
      console.log("[Blogs] Making API request to /api/blog");
      const response = await apiClient.get("/api/blog");
      console.log("[Blogs] Server response:", {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });

      if (response.statusText.toLowerCase() != "ok") {
        throw new Error("Failed to fetch blogs");
      }
      
      const posts = response.data.posts || [];
      console.log("[Blogs] Successfully fetched", posts.length, "posts");
      setBlogs(posts);
    } catch (error: any) {
      console.error("[Blogs] Error fetching blogs:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      showAlert("error", "Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    console.log("[Blogs] Fetching categories...");
    try {
      const response = await apiClient.get("/api/blog/categories");
      console.log("[Blogs] Categories response:", response.data);
      setCategories(response.data.categories || []);
    } catch (error: any) {
      console.error("[Blogs] Error fetching categories:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };

  const initiateDelete = (id: number) => {
    console.log("[Blogs] Initiating delete for blog ID:", id);
    setDeleteConfirm({ show: true, blogId: id });
  };

  const handleDelete = async () => {
    if (!deleteConfirm.blogId) return;

    console.log("[Blogs] Deleting blog ID:", deleteConfirm.blogId);
    try {
      const response = await apiClient.delete(
        `/api/blog/post/${deleteConfirm.blogId}`
      );
      console.log("[Blogs] Delete response:", response.data);

      if (response.statusText.toLowerCase() == "ok") {
        setBlogs(blogs.filter((blog) => blog.id !== deleteConfirm.blogId));
        showAlert("success", "Blog post deleted successfully");
      } else {
        throw new Error("Failed to delete blog post");
      }
    } catch (error: any) {
      console.error("[Blogs] Error deleting blog:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      showAlert("error", "Failed to delete blog post");
    } finally {
      setDeleteConfirm({ show: false, blogId: null });
    }
  };

  const filteredBlogs = blogs
    .filter((blog) => {
      if (filter === "published") return blog.published;
      if (filter === "draft") return !blog.published;
      return true;
    })
    .filter((blog) => {
      if (categoryFilter === "all") return true;
      return blog.category.id === categoryFilter;
    })
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1f4b] rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                <h3 className="text-xl font-semibold text-white">
                  Delete Blog Post?
                </h3>
              </div>
              <p className="text-gray-300 mb-6">
                This action cannot be undone. The blog post will be permanently
                removed from the system.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setDeleteConfirm({ show: false, blogId: null })
                  }
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete Post
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Alert Component */}
        <AnimatePresence mode="wait">
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50 ${
                alert.type === "success"
                  ? "bg-green-500"
                  : alert.type === "error"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
            >
              {alert.type === "success" && (
                <CheckCircle className="w-5 h-5 text-white" />
              )}
              {alert.type === "error" && (
                <XCircle className="w-5 h-5 text-white" />
              )}
              {alert.type === "info" && (
                <AlertCircle className="w-5 h-5 text-white" />
              )}
              <p className="text-white font-medium">{alert.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Blog Management
            </h1>
            <p className="text-gray-400">Manage and organize your blog posts</p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Create New Post
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-[#1a1f4b] rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                className="px-4 py-2 bg-[#2e3267] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-[#2e3267] text-gray-400 hover:bg-[#363b7e]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("published")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "published"
                    ? "bg-blue-600 text-white"
                    : "bg-[#2e3267] text-gray-400 hover:bg-[#363b7e]"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setFilter("draft")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "draft"
                    ? "bg-blue-600 text-white"
                    : "bg-[#2e3267] text-gray-400 hover:bg-[#363b7e]"
                }`}
              >
                Drafts
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-[#1a1f4b] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {blog.image && (
                    <div className="relative h-48 bg-gray-800">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-white mb-1">
                          {blog.title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-400">
                            By {blog.author.name}
                          </span>
                          <span className="text-gray-600">•</span>
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            <span>{blog.category.name}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                          blog.published
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>

                    <div className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {blog.content}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>{blog.category.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => initiateDelete(blog.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">No blog posts found</div>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              <Plus className="w-4 h-4" />
              Create your first post
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
