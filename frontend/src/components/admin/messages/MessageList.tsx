"use client";

import { useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import MessageListHeader from "./MessageListHeader";
import MessageListItem from "./MessageListItem";

export default function MessageList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { messages, isLoading, error } = useMessages();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading messages</div>;
  }

  const filteredMessages = messages?.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg">
      <MessageListHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="divide-y divide-gray-200">
        {filteredMessages?.map((message) => (
          <MessageListItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}