"use client";

import { Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

interface BlogListItemProps {
  blog: BlogPost;
}

export default function BlogListItem({ blog }: BlogListItemProps) {
  return (
    <div className="p-6 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-medium text-gray-900 truncate">
            {blog.title}
          </h2>
          <div className="mt-1 flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {blog.category}
            </span>
            <span className="text-sm text-gray-500">
              By {blog.author}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/blogs/${blog.slug}`} target="_blank">
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={`/admin/blogs/edit/${blog.id}`}>
            <Button variant="ghost" size="sm">
              <Edit2 className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}