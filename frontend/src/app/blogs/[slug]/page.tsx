"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

interface Author {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  published: boolean;
  slug: string;
  author: Author;
  category: Category;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      const decodedSlug = decodeURIComponent(slug as string);
      console.log("Fetching post with slug:", decodedSlug);

      const response = await apiClient.get(`/api/blog/slug/${decodedSlug}`);
      console.log("Response status:", response.status);

      if (response.statusText.toLowerCase() !== "ok") {
        throw new Error(response.data.message || "Failed to fetch blog post");
      }

      console.log("Response data:", response.data);

      if (response.data.status === "success" && response.data.post) {
        setPost(response.data.post);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative overflow-hidden bg-[#111240]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
          </div>

          <div className="relative container mx-auto px-4 py-32">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-4 bg-white/10 w-24 rounded mb-6" />
              <div className="h-12 bg-white/10 w-3/4 rounded mb-6" />
              <div className="flex gap-4">
                <div className="h-8 bg-white/10 w-32 rounded" />
                <div className="h-8 bg-white/10 w-32 rounded" />
                <div className="h-8 bg-white/10 w-32 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative overflow-hidden bg-[#111240]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
          </div>

          <div className="relative container mx-auto px-4 py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-6">
                Post Not Found
              </h1>
              {error && <p className="text-white/80 mb-6">{error}</p>}
              <Link
                href="/blogs"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#111240]">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
        </div>

        <div className="relative container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 
                transition-colors group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Blogs
            </Link>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-white/80 bg-clip-text text-transparent mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Tag className="w-4 h-4 mr-2" />
                {post.category.name}
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                By {post.author.name}
              </div>
              <button
                className="flex items-center hover:text-white transition-colors bg-white/5 hover:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
                onClick={() =>
                  navigator.share({
                    title: post.title,
                    text: post.title,
                    url: window.location.href,
                  })
                }
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Image Section */}
      <div className="container mx-auto px-4 -mt-20">
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative bg-white rounded-xl shadow-xl p-8 overflow-hidden mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Decorative gradient orb */}
            <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>

            <div className="prose prose-lg max-w-none relative">
              {/* Introduction with gradient border */}
              <div className="border-l-4 border-gradient-to-b from-[#3785CC] to-[#4A9BE4] pl-6 mb-12">
                <p className="text-[#111240]/80 leading-relaxed text-xl font-medium tracking-wide">
                  {post.content.split("\n")[0]}
                </p>
              </div>

              {/* Main content */}
              {post.content
                .split("\n")
                .slice(1)
                .map((paragraph, index) => {
                  if (
                    paragraph.trim().startsWith("**") &&
                    paragraph.trim().endsWith("**")
                  ) {
                    const title = paragraph
                      .trim()
                      .replace(/^\*\*|\*\*$/g, "")
                      .trim();
                    const number = title.match(/^\d+/)?.[0];
                    return (
                      <div key={index} className="mb-12">
                        <h2 className="text-2xl font-bold text-[#111240] flex items-center gap-4 mb-6">
                          {number && (
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] flex items-center justify-center">
                              <span className="text-white text-xl">
                                {number}
                              </span>
                            </div>
                          )}
                          <span>{title.replace(/^\d+\.\s*/, "")}</span>
                        </h2>
                      </div>
                    );
                  }
                  if (paragraph.startsWith("-")) {
                    return (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-[#111240]/80 mb-4 hover:translate-x-1 transition-transform duration-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] mt-2.5"></div>
                        <span className="text-lg">
                          {paragraph.replace("- ", "")}
                        </span>
                      </li>
                    );
                  }
                  if (
                    paragraph.trim() &&
                    !paragraph.startsWith("Key benefits include:")
                  ) {
                    // Process inline bold text
                    const parts = paragraph.split(/(\*\*.*?\*\*|__.*?__)/g);
                    return (
                      <p
                        key={index}
                        className="text-[#111240]/80 text-lg leading-relaxed mb-8 hover:text-[#111240] transition-colors duration-300"
                      >
                        {parts.map((part, i) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return (
                              <span key={i} className="font-semibold">
                                {part.slice(2, -2)}
                              </span>
                            );
                          }
                          if (part.startsWith("__") && part.endsWith("__")) {
                            return (
                              <span key={i} className="font-semibold">
                                {part.slice(2, -2)}
                              </span>
                            );
                          }
                          return part;
                        })}
                      </p>
                    );
                  }
                  return null;
                })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
