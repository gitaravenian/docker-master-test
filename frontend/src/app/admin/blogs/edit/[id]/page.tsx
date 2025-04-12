"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { apiClient } from "@/lib/api";

interface Category {
  id: number;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  image: string;
  published: boolean;
  authorId: number;
  slug: string;
}

export default function EditBlogPost() {
  const params = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<BlogPost>({
    id: 0,
    title: "",
    content: "",
    categoryId: 1,
    image: "placeholder.jpg",
    published: false,
    authorId: 1,
    slug: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log("[EditBlog] Component mounted, initializing...");
    console.log("[EditBlog] Blog ID from params:", params.id);
    fetchCategories();
    fetchBlogPost();
  }, []);

  const fetchCategories = async () => {
    console.log("[EditBlog] Fetching categories...");
    try {
      const response = await apiClient.get("/api/blog/categories");
      console.log("[EditBlog] Categories response:", response.data);

      setCategories(response.data.categories || []);
    } catch (error: any) {
      console.error("[EditBlog] Error fetching categories:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };

  const fetchBlogPost = useCallback(async () => {
    console.log("[EditBlog] Fetching blog post...");
    try {
      const token = localStorage.getItem("token");
      console.log("[EditBlog] Using token:", token ? "Present" : "Missing");

      const response = await apiClient.get(`/api/blog/post/${params.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("[EditBlog] Blog post response:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });

      if (response.statusText.toLowerCase() !== "ok") {
        throw new Error("Failed to fetch blog post");
      }

      const postData = {
        ...response.data.post,
      };
      console.log("[EditBlog] Setting form data:", postData);
      setFormData(postData);

      if (response.data.post.image) {
        console.log("[EditBlog] Setting image preview");
        setImagePreview(response.data.post.image);
      }
    } catch (error: any) {
      console.error("[EditBlog] Error fetching blog post:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      router.push("/admin/blogs");
    }
  }, [params.id]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  useEffect(() => {
    console.log("[EditBlog] Form data updated:", formData);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log("[EditBlog] Form field changed:", { field: name, value });
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("[EditBlog] Processing image:", { name: file.name, size: file.size });
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log("[EditBlog] Image converted to base64");
        setImagePreview(base64String);
        setFormData((prev) => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishToggle = () => {
    console.log("[EditBlog] Toggling publish status");
    setFormData((prev) => ({
      ...prev,
      published: !prev.published,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[EditBlog] Starting blog post update...");
    setIsSaving(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.content || !formData.categoryId) {
        console.error("[EditBlog] Validation failed - missing required fields");
        alert(
          "Please fill in all required fields (title, content, and category)"
        );
        return;
      }

      // Ensure categoryId is a number
      const requestData = {
        title: formData.title,
        content: formData.content,
        categoryId: formData.categoryId,
        image: formData.image,
        published: formData.published,
        authorId: formData.authorId,
        slug: formData.slug,
      };

      console.log("[EditBlog] Submitting updated blog post:", {
        ...requestData,
        content: requestData.content.substring(0, 100) + "..." // Truncate content for logging
      });

      const token = localStorage.getItem("token");
      console.log("[EditBlog] Using token for update:", token ? "Present" : "Missing");

      const response = await apiClient.put(
        `/api/blog/post/${params.id}`,
        requestData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("[EditBlog] Update response:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });

      if (response.statusText.toLowerCase() !== "ok") {
        throw new Error("Failed to update blog post");
      }

      console.log("[EditBlog] Blog post updated successfully");
      router.push("/admin/blogs");
    } catch (error: any) {
      console.error("[EditBlog] Error updating blog post:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert(
        `Error updating blog post: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
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
                Edit Blog Post
              </h1>
              <p className="text-gray-400">
                Update your story with our enhanced markdown editor
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
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
              <button
                onClick={handleSubmit}
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
                    Update Post
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    onClick={() => insertText("**", "**")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    onClick={() => insertText("*", "*")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    onClick={() => insertText("### ")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Heading"
                  >
                    H
                  </button>
                  <button
                    onClick={() => insertText("- ")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="List"
                  >
                    •
                  </button>
                  <button
                    onClick={() => insertText("![Alt text](", ")")}
                    className="p-2 text-gray-400 hover:bg-[#2e3267] rounded"
                    title="Image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-2.5 rounded-lg bg-[#24294d] text-white border border-gray-700 hover:border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 text-sm font-medium cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}
