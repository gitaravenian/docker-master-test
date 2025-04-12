'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import { CalendarDays, Layout, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/auth/check', {
                    credentials: 'include'
                });

                const data = await response.json();
                console.log('Auth check response:', data);

                if (data.status === 'success' && data.user) {
                    setUser(data.user);
                } else {
                    router.push('/admin/login');
                }
            } catch (error) {
                console.error('Auth check error:', error);
                router.push('/admin/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1035] to-[#2e3267]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="bg-gradient-to-br from-[#0f1035] to-[#2e3267]">
            <div className="max-w-7xl mx-auto p-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {user.name}</h1>
                        <p className="text-gray-400">Here's what's happening with your website today.</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-4">
                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Layout className="w-5 h-5 text-blue-400" />
                            <h2 className="text-lg font-semibold text-white">Overview</h2>
                        </div>
                        <DashboardStats />
                    </motion.div>

                    {/* Recent Activity Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-blue-400" />
                                <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                            </div>
                        </div>
                        <RecentActivity />
                    </motion.div>
                </div>

                {/* Current Date */}
                <div className="mt-4 text-center">
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-400">
                        <CalendarDays className="h-4 w-4" />
                        <span>{new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-500">
                  You don&apos;t have any notifications yet. We&apos;ll let you know when something arrives.
                </p>
            </div>
        </div>
    );
}
