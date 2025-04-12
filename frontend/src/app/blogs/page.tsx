"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
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

export default function EnhancedBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get("/api/blog");

      if (response.statusText.toLowerCase() !== "ok") {
        throw new Error("Failed to fetch blogs");
      }
      if (response.data.status === "success") {
        setBlogs(
          response.data.posts.filter((post: BlogPost) => post.published)
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const getExcerpt = (content: string) => {
    const plainText = content.replace(/[#*`_\[\]]/g, "");
    return plainText.substring(0, 150).trim() + "...";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getGradient = (index: number) => {
    const gradients = [
      "from-[#3785CC] to-[#4A9BE4]",
      "from-[#4A9BE4] to-[#8590EA]",
      "from-[#8590EA] to-[#B5C6F4]",
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative overflow-hidden bg-[#111240]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC]"></div>
          </div>

          <div className="relative w-full lg:w-[1280px] mx-auto px-4 py-32">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-white/10 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-white/10 rounded w-1/2 mx-auto" />
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
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC]"></div>
        </div>
        
        <div className="relative w-full lg:w-[1280px] mx-auto px-4 py-32">
          <div className="text-center">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm mb-6 inline-block">
              Our Blog
            </span>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Latest Insights
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Explore our insights on technology, business, and industry trends
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="py-24">
        <div className="w-full lg:w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Link 
                key={blog.id} 
                href={`/blogs/${blog.slug}`}
                className="group"
              >
                <article className="relative rounded-2xl bg-white overflow-hidden shadow-lg hover:shadow-xl border border-#F7F7F7 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={
                        blog.image ||
                        `https://source.unsplash.com/random/800x600?${index}`
                      }
                      alt={blog.title}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-#111240 mb-3 line-clamp-2 group-hover:text-#3785CC transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-#111240/80 text-lg leading-relaxed mb-4 line-clamp-2">
                      {getExcerpt(blog.content)}
                    </p>
                    <div className="flex items-center text-#3785CC font-medium hover:text-#2674bb transition-colors duration-300">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
