'use client';

import { useEffect, useState } from 'react';
import { FileText, MessageSquare, TrendingUp } from 'lucide-react';
import axios from 'axios';

interface Stats {
    stats: {
        blogs: {
            total: number;
            published: number;
        };
        messages: {
            total: number;
            lastMonth: number;
        };
    };
}

export default function DashboardStats() {
    const [stats, setStats] = useState<Stats>({
        stats: {
            blogs: { total: 0, published: 0 },
            messages: { total: 0, lastMonth: 0 }
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/blog/stats', {
                    credentials: 'include' // Important for sending the auth cookie
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                
                const data = await response.json();
                if (data.status === 'success') {
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Rest of your component code remains the same...
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blogs Stats */}
            <div className="bg-[#0f1035] rounded-lg p-6 hover:bg-[#161849] transition-colors duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 mb-1 flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Total Blogs
                        </p>
                        <h2 className="text-4xl font-bold text-white">
                            {stats.stats.blogs.total}
                        </h2>
                    </div>
                    <div className="bg-blue-500/10 p-3 rounded-full">
                        <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span className={stats.stats.blogs.published >= 0 ? "text-green-500" : "text-red-500"}>
                        {stats.stats.blogs.published}%
                    </span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                </div>
            </div>

            {/* Messages Stats */}
            <div className="bg-[#0f1035] rounded-lg p-6 hover:bg-[#161849] transition-colors duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 mb-1 flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Total Messages
                        </p>
                        <h2 className="text-4xl font-bold text-white">
                            {stats.stats.messages.total}
                        </h2>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-full">
                        <MessageSquare className="h-8 w-8 text-purple-500" />
                    </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span className={stats.stats.messages.lastMonth >= 0 ? "text-green-500" : "text-red-500"}>
                        {stats.stats.messages.lastMonth}
                    </span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                </div>
            </div>
        </div>
    );
}