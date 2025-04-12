'use client';

import { Clock } from 'lucide-react';
import { useState } from 'react';

const mockActivities = [
  {
    id: 1,
    action: 'New order placed',
    orderNumber: 'Order #12345',
    user: 'John Doe',
    time: '2024-03-15'
  },
  {
    id: 2,
    action: 'Blog post published',
    title: 'How to improve workplace productivity',
    user: 'Jane Smith',
    time: '2024-03-14'
  },
  {
    id: 3,
    action: 'New user registered',
    user: 'Mike Johnson',
    time: '2024-03-13'
  }
];

export default function RecentActivity() {
  const [activities] = useState(mockActivities);

  return (
    <div className="bg-[#0f1035] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <Clock className="text-gray-400 w-5 h-5" />
      </div>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="border-b border-[#2a2d52] last:border-0 pb-6 last:pb-0"
          >
            <h3 className="text-white font-medium">{activity.action}</h3>
            {activity.orderNumber && (
              <p className="text-gray-400 text-sm mt-1">{activity.orderNumber}</p>
            )}
            {activity.title && (
              <p className="text-gray-400 text-sm mt-1">{activity.title}</p>
            )}
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
              <span>{activity.user}</span>
              <span>•</span>
              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}