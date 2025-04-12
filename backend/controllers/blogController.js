import { BlogDTO } from '../DTOs/blogDTO.js';
import { blogRepository } from '../repositories/blog-repo.js';

export const createPostController = async (req, res) => {
    try {
        // Get the uploaded file path if exists
        const imagePath = req.file ? `/api/blog/uploads/${req.file.filename}` : 'placeholder.jpg';
        
        // Create DTO with form data and file path
        const blogData = {
            ...req.body,
            image: imagePath
        };
        
        const blogDTO = new BlogDTO(blogData);
        console.log('Creating new post with data:', blogDTO);
        const post = await blogRepository.createPost(blogDTO);
        console.log('Post created:', post.title);
        res.status(201).json({ status: 'success', post });
    } catch (error) {
        console.error('Error in createPostController:', error);
        res.status(500).json({ status: 'fail', message: error.message || 'Internal server error' });
    }
};

export const updatePostController = async (req, res) => {
    try {
        // Get the uploaded file path if exists
        const imagePath = req.file ? `/api/blog/uploads/${req.file.filename}` : undefined;
        
        // Create DTO with form data and file path
        const blogData = {
            ...req.body,
            ...(imagePath && { image: imagePath })
        };
        
        const blogDTO = new BlogDTO(blogData);
        console.log('Updating post with data:', blogDTO);
        const post = await blogRepository.updatePost(req.params.id, blogDTO);
        console.log('Post updated:', post.title);
        res.status(200).json({ status: 'success', post });
    } catch (error) {
        console.error('Error in updatePostController:', error);
        res.status(500).json({ status: 'fail', message: error.message || 'Internal server error' });
    }
};

export const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting post with id:', id);
        const post = await blogRepository.deletePost(parseInt(id));
        console.log('Post deleted:', post.title);
        res.status(200).json({ status: 'success', post });
    } catch (error) {
        console.error('Error in deletePostController:', error);
        res.status(500).json({ status: 'fail', message: error.message || 'Internal server error' });
    }
};

export const getPostController = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log('Getting post with slug:', slug);
        
        const post = await blogRepository.getPost(slug);
        console.log('Post found:', post ? 'Yes' : 'No');
        
        if (!post) {
            console.log('Post not found for slug:', slug);
            return res.status(404).json({ 
                status: 'fail', 
                message: `Post not found with slug: ${slug}` 
            });
        }
        
        console.log('Successfully retrieved post:', post.title);
        res.status(200).json({ status: 'success', post });
    } catch (error) {
        console.error('Error in getPostController:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
};

export const getPostByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Getting post with id:', id);
        
        const post = await blogRepository.getPostById(id);
        console.log('Post found:', post ? 'Yes' : 'No');
        
        if (!post) {
            console.log('Post not found for id:', id);
            return res.status(404).json({ 
                status: 'fail', 
                message: `Post not found with id: ${id}` 
            });
        }
        
        console.log('Successfully retrieved post:', post.title);
        res.status(200).json({ status: 'success', post });
    } catch (error) {
        console.error('Error in getPostByIdController:', error);
        res.status(500).json({ 
            status: 'fail', 
            message: error.message || 'Internal server error' 
        });
    }
};

export const getAllPostsController = async (req, res) => {
    try {
        console.log('Getting all posts');
        const posts = await blogRepository.getAllPosts();
        console.log('Posts found:', posts.length);
        res.status(200).json({ status: 'success', posts });
    } catch (error) {
        console.error('Error in getAllPostsController:', error);
        res.status(500).json({ status: 'fail', message: error.message || 'Internal server error' });
    }
};