"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogListHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function BlogListHeader({ searchQuery, onSearchChange }: BlogListHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}