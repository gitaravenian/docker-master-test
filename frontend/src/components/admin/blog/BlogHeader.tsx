import { Plus } from "lucide-react";
import Link from "next/link";

export default function BlogHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your blog posts, create new content, and edit existing articles.
        </p>
      </div>
      <Link 
        href="/admin/blogs/new"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Post
      </Link>
    </div>
  );
}