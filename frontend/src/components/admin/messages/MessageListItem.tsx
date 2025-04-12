"use client";

import { Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Submission } from "@prisma/client";

interface MessageListItemProps {
  message: Submission;
}

export default function MessageListItem({ message }: MessageListItemProps) {
  return (
    <div className="p-6 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <h2 className="text-lg font-medium text-gray-900">
              {message.name}
            </h2>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-600">{message.email}</p>
            <p className="mt-2 text-sm text-gray-500">{message.message}</p>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {formatDate(message.created_at.toString())}
          </div>
        </div>
        <div>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}