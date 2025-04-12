import express from 'express';
import { 
    createPostController, 
    updatePostController, 
    deletePostController, 
    getPostController, 
    getAllPostsController,
    getPostByIdController 
} from '../controllers/blogController.js';
import { authenticateToken } from '../middleware/auth.js';
import { blogRepository } from '../repositories/blog-repo.js';
import prisma from '../prisma/client.js';
import { upload } from '../middleware/upload.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
    console.log(`Blog Route - ${req.method} ${req.originalUrl}`);
    next();
});

// Serve uploaded files
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Public routes - order matters! More specific routes first
router.get('/categories', async (req, res) => {
    try {
        const categories = await blogRepository.getCategories();
        res.status(200).json({ status: 'success', categories });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
});

// Blog post routes
router.get('/post/:id', getPostByIdController);
router.get('/slug/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        console.log('Direct route - Getting post with slug:', slug);
        
        const post = await blogRepository.getPost(slug);
        console.log('Direct route - Post found:', post ? 'Yes' : 'No');
        
        if (!post) {
            console.log('Direct route - Post not found for slug:', slug);
            return res.status(404).json({ 
                status: 'fail', 
                message: `Post not found with slug: ${slug}` 
            });
        }
        
        console.log('Direct route - Successfully retrieved post:', post.title);
        res.status(200).json({ status: 'success', post });
    } catch (error) {
        console.error('Direct route - Error getting post:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
});
router.get('/', getAllPostsController);

// Protected routes
router.post('/', authenticateToken, upload.single('image'), createPostController);
router.put('/post/:id', authenticateToken, upload.single('image'), updatePostController);
router.delete('/post/:id', authenticateToken, deletePostController);

router.get('/stats', authenticateToken, async (req, res) => {
    try {
        // Get current date and date from one month ago (for messages only)
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        
        // Get total blogs (no date filtering)
        const totalBlogs = await prisma.post.count();
        const publishedBlogs = await prisma.post.count({
            where: {
                published: true
            }
        });

        // Get total messages (with date filtering)
        const totalMessages = await prisma.message.count();
        const lastMonthMessages = await prisma.message.count({
            where: {
                created_at: {
                    gte: oneMonthAgo,
                    lte: now
                }
            }
        });

        res.json({
            status: 'success',
            stats: {
                blogs: {
                    total: totalBlogs,
                    published: publishedBlogs
                },
                messages: {
                    total: totalMessages,
                    lastMonth: lastMonthMessages
                }
            }
        });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

export default router;