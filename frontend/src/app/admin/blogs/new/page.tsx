"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  X,
  Image as ImageIcon,
  Plus,
  Eye,
  Calendar,
  Layout,
  Tag,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { apiClient } from "@/lib/api";

interface Category {
  id: number;
  name: string;
}

interface BlogPost {
  title: string;
  content: string;
  categoryId: number;
  image: string;
  published: boolean;
  authorId: number;
}

export default function NewBlogPost() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    content: "",
    categoryId: 1,
    image: "placeholder.jpg",
    published: false,
    authorId: 1,
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log("[NewBlog] Component mounted, initializing...");
    fetchCategories();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    console.log("[NewBlog] Form data updated:", formData);
  }, [formData]);

  const fetchCategories = async () => {
    console.log("[NewBlog] Fetching categories...");
    try {
      const response = await apiClient.get("/api/blog/categories");
      console.log("[NewBlog] Categories response:", response.data);

      setCategories(response.data.categories || []);
      if (response.data.categories?.length > 0) {
        console.log("[NewBlog] Setting default category:", response.data.categories[0]);
        setFormData((prev) => ({
          ...prev,
          categoryId: response.data.categories[0].id,
        }));
      }
    } catch (error: any) {
      console.error("[NewBlog] Error fetching categories:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };

  const fetchCurrentUser = async () => {
    console.log("[NewBlog] Fetching current user...");
    try {
      const token = localStorage.getItem("token");
      console.log("[NewBlog] Using token:", token ? "Present" : "Missing");

      const response = await apiClient.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("[NewBlog] User response:", response.data);

      if (response.data.user?.id) {
        console.log("[NewBlog] Setting author ID:", response.data.user.id);
        setFormData((prev) => ({ ...prev, authorId: response.data.user.id }));
      } else {
        console.error("[NewBlog] No user found - please log in");
      }
    } catch (error: any) {
      console.error("[NewBlog] Error fetching user:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log("[NewBlog] Form field changed:", { field: name, value });
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("[NewBlog] Processing image:", { name: file.name, size: file.size });
      // Create URL for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, image: file.name }));
    }
  };

  const handlePublishToggle = () => {
    console.log("[NewBlog] Toggling publish status");
    setFormData((prev) => ({
      ...prev,
      published: !prev.published,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("[NewBlog] Starting blog post submission...");
    setIsSaving(true);

    try {
        if (!formData.title || !formData.content || !formData.categoryId) {
            alert("Please fill in all required fields (title, content, and category)");
            return;
        }

        const generatedSlug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") // Replace special characters with hyphens
            .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('slug', generatedSlug);  // Ensure slug is sent
        formDataToSend.append('content', formData.content);
        formDataToSend.append('categoryId', String(formData.categoryId));
        formDataToSend.append('published', String(formData.published));
        formDataToSend.append('authorId', String(formData.authorId));

        const fileInput = fileInputRef.current;
        if (fileInput?.files?.[0]) {
            formDataToSend.append('image', fileInput.files[0]);
        }

        console.log("[NewBlog] Submitting blog post with FormData");

        const response = await apiClient.post("/api/blog", formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 201) {
            console.log("[NewBlog] Blog post created successfully");
            window.location.href = "/admin/blogs";
        } else {
            alert(`Failed to create blog post: ${response.data.message}`);
        }
    } catch (error: unknown) {
        console.error("[NewBlog] Error creating blog post:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        alert(`Error creating blog post: ${errorMessage}`);
    } finally {
        setIsSaving(false);
    }
};


  const insertText = (before: string, after: string = "") => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    const newText = `${beforeText}${before}${selectedText}${after}${afterText}`;
    setFormData((prev) => ({ ...prev, content: newText }));

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Create New Blog Post
              </h1>
              <p className="text-gray-400">
                Craft your story with our enhanced markdown editor
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center px-4 py-2 bg-[#2e3267] text-gray-300 rounded-lg hover:bg-[#363b7e] transition-colors"
              >
                <Eye className="w-5 h-5 mr-2" />
                {showPreview ? "Edit" : "Preview"}
              </button>
              <Link
                href="/admin/blogs"
                className="inline-flex items-center px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-[#2e3267] transition-colors"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Link>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your title here..."
                />
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                  imagePreview
                    ? "border-blue-500 hover:border-blue-400"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                {imagePreview ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative aspect-video"
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview("");
                        setFormData((prev) => ({ ...prev, image: "" }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">
                        Drop your featured image here
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#1a1f4b] rounded-xl shadow-lg">
              {!showPreview && (
                <div className="flex items-center gap-2 p-2 border-b border-gray-700">
                  <button
                    type="button"
                    onClick={() => insertText("**", "**")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertText("*", "*")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertText("### ")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Heading"
                  >
                    H
                  </button>
                  <button
                    type="button"
                    onClick={() => insertText("- ")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="List"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    onClick={() => insertText("![Alt text](", ")")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertText("[", "](url)")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Link"
                  >
                    🔗
                  </button>
                </div>
              )}
              <div className="p-6">
                {showPreview ? (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{formData.content}</ReactMarkdown>
                  </div>
                ) : (
                  <textarea
                    ref={contentRef}
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={15}
                    className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="Write your blog post content here... (Markdown supported)"
                  />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Post Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#2e3267] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-200">
                        Category
                      </h3>
                      <p className="text-xs text-gray-400">
                        Select post category
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="appearance-none w-[180px] px-4 py-2.5 rounded-lg bg-[#24294d] text-white border border-gray-700 hover:border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 text-sm font-medium cursor-pointer"
                    >
                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="bg-[#24294d] text-white py-2 hover:bg-[#2e3267]"
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#2e3267] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Layout className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Publication Status
                      </p>
                      <p className="text-xs text-gray-400">
                        Control post visibility
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={handlePublishToggle}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Writing Tips
              </h2>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Use clear headings to structure your content
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Include relevant images to enhance engagement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Keep paragraphs short and focused
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Use markdown for better formatting
                </li>
              </ul>
            </div>
          </motion.div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg transition-all transform hover:scale-105 ${
                isSaving
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isSaving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Saving...
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
